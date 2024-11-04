import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { formatResponse } from '@/utils/response-format.util';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createComment(@Body() data: CreateCommentDto) {
    const newComment = await this.commentsService.createComment(data);
    return formatResponse(newComment, HttpStatus.CREATED);
  }

  @Get()
  async getAllComments() {
    const comments = await this.commentsService.getAllComments();
    return formatResponse(comments, HttpStatus.OK);
  }

  @Get(':id')
  async getCommentById(@Param('id') id: string) {
    const comment = await this.commentsService.getCommentById(id);
    return formatResponse(comment, HttpStatus.OK);
  }

  @Put(':id')
  async updateComment(@Param('id') id: string, @Body() data: UpdateCommentDto) {
    const updatedComment = await this.commentsService.updateComment(id, data);
    return formatResponse(updatedComment, HttpStatus.OK);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(@Param('id') id: string) {
    await this.commentsService.deleteComment(id);
    return formatResponse(null, HttpStatus.NO_CONTENT, 'Comment deleted successfully');
  }
}
