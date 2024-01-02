import { IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDTO {
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
