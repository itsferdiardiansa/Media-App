import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { UpdateTagDto } from './dtos/update-tag.dto';
import { formatResponse } from '@/utils/response-format.util';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTag(@Body() data: CreateTagDto) {
    const newTag = await this.tagsService.createTag(data);
    return formatResponse(newTag, HttpStatus.CREATED);
  }

  @Get()
  async getAllTags() {
    const tags = await this.tagsService.getAllTags();
    return formatResponse(tags, HttpStatus.OK);
  }

  @Get(':id')
  async getTagById(@Param('id') id: string) {
    const tag = await this.tagsService.getTagById(id);
    return formatResponse(tag, HttpStatus.OK);
  }

  @Put(':id')
  async updateTag(@Param('id') id: string, @Body() data: UpdateTagDto) {
    const updatedTag = await this.tagsService.updateTag(id, data);
    return formatResponse(updatedTag, HttpStatus.OK);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTag(@Param('id') id: string) {
    await this.tagsService.deleteTag(id);
    return formatResponse(null, HttpStatus.NO_CONTENT, 'Tag deleted successfully');
  }
}
