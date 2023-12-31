import { IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateUser {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MinLength(1)
  username?: string;

  @IsNotEmpty()
  @IsOptional()
  @MinLength(7)
  password?: string;
}
