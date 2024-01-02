import { IsNotEmpty, IsUUID, IsBoolean } from 'class-validator';

export class AddCriminalDTO {
  @IsBoolean()
  @IsNotEmpty()
  criminalType: boolean;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
