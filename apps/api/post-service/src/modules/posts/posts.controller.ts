import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { formatResponse } from '@/utils/response-format.util';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() data: CreatePostDto) {
    const newPost = await this.postsService.createPost(data);
    return formatResponse(newPost, HttpStatus.CREATED);
  }

  @Get()
  async getAllPosts() {
    const posts = await this.postsService.getAllPosts();
    return formatResponse(posts, HttpStatus.OK);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    const post = await this.postsService.getPostById(id);
    return formatResponse(post, HttpStatus.OK);
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() data: UpdatePostDto) {
    const updatedPost = await this.postsService.updatePost(id, data);
    return formatResponse(updatedPost, HttpStatus.OK);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Param('id') id: string) {
    await this.postsService.deletePost(id);
    return formatResponse(null, HttpStatus.NO_CONTENT, 'Post deleted successfully');
  }
}
