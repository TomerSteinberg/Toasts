import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsDateString,
  IsUUID,
} from 'class-validator';

export class CreateToast {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  reason: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
