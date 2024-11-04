import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostResponseDto } from './dtos/post-response.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(createPostDto: CreatePostDto): Promise<PostResponseDto> {
    const { title, content, tags } = createPostDto;
    const newPost = await this.prisma.post.create({
      data: {
        title,
        content,
        tags: tags
          ? {
              create: tags.map(tag => ({
                tag: { connectOrCreate: { where: { name: tag }, create: { name: tag } } },
              })),
            }
          : undefined,
      },
      include: { tags: { include: { tag: true } } },
    });
    return this.formatPostResponse(newPost);
  }

  async getAllPosts(): Promise<PostResponseDto[]> {
    const posts = await this.prisma.post.findMany({
      include: { tags: { include: { tag: true } } },
    });
    return posts.map(post => this.formatPostResponse(post));
  }

  async getPostById(id: string): Promise<PostResponseDto> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { tags: { include: { tag: true } } },
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return this.formatPostResponse(post);
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<PostResponseDto> {
    const { title, content, tags } = updatePostDto;
    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        tags: tags
          ? {
              deleteMany: {},
              create: tags.map(tag => ({
                tag: { connectOrCreate: { where: { name: tag }, create: { name: tag } } },
              })),
            }
          : undefined,
      },
      include: { tags: { include: { tag: true } } },
    });
    return this.formatPostResponse(updatedPost);
  }

  async deletePost(id: string): Promise<void> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    await this.prisma.post.delete({
      where: { id },
    });
  }

  private formatPostResponse(post): PostResponseDto {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      tags: post.tags ? post.tags.map(tag => tag.tag.name) : [],
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
}
