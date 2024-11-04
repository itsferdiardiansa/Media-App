import { IsString, IsOptional } from 'class-validator';

export class UpdateTagDto {
  @IsString()
  @IsOptional()
  name?: string;
}
