import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { UpdateTagDto } from './dtos/update-tag.dto';
import { TagResponseDto } from './dtos/tag-response.dto';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async createTag(createTagDto: CreateTagDto): Promise<TagResponseDto> {
    const { name } = createTagDto;
    const newTag = await this.prisma.tag.create({
      data: { name },
    });
    return this.formatTagResponse(newTag);
  }

  async getAllTags(): Promise<TagResponseDto[]> {
    const tags = await this.prisma.tag.findMany();
    return tags.map(tag => this.formatTagResponse(tag));
  }

  async getTagById(id: string): Promise<TagResponseDto> {
    const tag = await this.prisma.tag.findUnique({ where: { id } });
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    return this.formatTagResponse(tag);
  }

  async updateTag(id: string, updateTagDto: UpdateTagDto): Promise<TagResponseDto> {
    const updatedTag = await this.prisma.tag.update({
      where: { id },
      data: updateTagDto,
    });
    return this.formatTagResponse(updatedTag);
  }

  async deleteTag(id: string): Promise<void> {
    const tag = await this.prisma.tag.findUnique({ where: { id } });
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    await this.prisma.tag.delete({ where: { id } });
  }

  private formatTagResponse(tag): TagResponseDto {
    return {
      id: tag.id,
      name: tag.name,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
    };
  }
}
