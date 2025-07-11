import { Type } from 'class-transformer';
import { IsOptional, IsString, IsDate, IsNumber } from 'class-validator';

export class FilterCtiDto {
  @Type(() => Number)
  @IsNumber()
  fromQuality: number;
}
