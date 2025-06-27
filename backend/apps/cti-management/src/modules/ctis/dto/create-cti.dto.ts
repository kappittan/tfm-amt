import { Type } from 'class-transformer';
import { IsJSON, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateCTIDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsObject()
  @Type(() => Object)
  content: any;
}
