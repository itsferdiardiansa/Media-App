import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { formatResponse } from '@/utils/response-format.util';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number;
    let message: string;
    let errors: string[] = [];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      if (exception instanceof BadRequestException && typeof errorResponse === 'object') {
        message = 'Validation error';

        if (errorResponse['message'] && Array.isArray(errorResponse['message'])) {
          errors = errorResponse['message'].map((err) => {
            if (typeof err === 'object' && err.constraints) {
              return Object.values(err.constraints).join(', ');
            }
            return String(err);
          });
        } else {
          errors = [String(errorResponse['message'] || 'Validation failed')];
        }
      } else {
        message = typeof errorResponse === 'string' ? errorResponse : 'An error occurred';
        errors = [String(errorResponse['message'] || message)];
      }
    } 
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Database error';

      const prismaErrorMessage = this.extractOnlyArgumentMissingMessage(exception.message);
      errors = [prismaErrorMessage];
    } 
    else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      errors = [exception instanceof Error ? this.extractOnlyArgumentMissingMessage(exception.message) : 'Unexpected error'];
    }

    const formattedResponse = formatResponse(errors, status, message);
    response.status(status).json(formattedResponse);
  }

  private extractOnlyArgumentMissingMessage(errorMessage: string): string {
    const match = errorMessage.match(/Argument [`'"](\w+)[`'"] is missing/);

    return match ? `Argument ${match[1]} is missing.` : 'An unexpected database error occurred.';
  }
}
