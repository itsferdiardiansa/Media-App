import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  content?: string;

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];
}
