import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsDateString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateToast {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  reason: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
