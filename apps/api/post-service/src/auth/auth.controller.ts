import { Controller, Post, Body, Res, HttpCode, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Public } from './public.decorator';
import { formatResponse } from '@/utils/response-format.util';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const authResult = await this.authService.login(email, password);

    if (!authResult || !authResult.IdToken) {
      throw new UnauthorizedException('Failed to login');
    }
    
    res.cookie('jwt', authResult.IdToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600 * 1000, // 1 hour
    });

    return formatResponse(null, HttpStatus.OK, 'Login successful');
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const registrationResult = await this.authService.register(email, password);

    return formatResponse(registrationResult, HttpStatus.CREATED, 'Registration successful');
  }
}
