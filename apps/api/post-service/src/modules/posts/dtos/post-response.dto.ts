export class PostResponseDto {
  id: string;
  title: string;
  content?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}
