import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsDateString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateToastDTO {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MinLength(1)
  reason?: string;

  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  date?: Date;

  @IsBoolean()
  @IsOptional()
  isConvicting?: boolean;
}
