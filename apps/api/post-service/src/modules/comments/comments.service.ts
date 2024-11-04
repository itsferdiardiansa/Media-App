import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { CommentResponseDto } from './dtos/comment-response.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<CommentResponseDto> {
    const { content, postId } = createCommentDto;
    const newComment = await this.prisma.comment.create({
      data: { content, postId },
    });
    return this.formatCommentResponse(newComment);
  }

  async getAllComments(): Promise<CommentResponseDto[]> {
    const comments = await this.prisma.comment.findMany();
    return comments.map(comment => this.formatCommentResponse(comment));
  }

  async getCommentById(id: string): Promise<CommentResponseDto> {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return this.formatCommentResponse(comment);
  }

  async updateComment(id: string, updateCommentDto: UpdateCommentDto): Promise<CommentResponseDto> {
    const updatedComment = await this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });
    return this.formatCommentResponse(updatedComment);
  }

  async deleteComment(id: string): Promise<void> {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    await this.prisma.comment.delete({ where: { id } });
  }

  private formatCommentResponse(comment): CommentResponseDto {
    return {
      id: comment.id,
      content: comment.content,
      postId: comment.postId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  }
}
