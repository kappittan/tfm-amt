import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

export class CreateCTIDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsJSON()
  @IsNotEmpty()
  content: string;
}
