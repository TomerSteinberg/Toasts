import {
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  IsOptional,
} from 'class-validator';

export class UpdateUser {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MinLength(1)
  username?: string;

  @IsNotEmpty()
  @IsOptional()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  password?: string;
}
