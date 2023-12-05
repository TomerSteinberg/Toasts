import { IsNotEmpty, IsUUID, IsBoolean } from 'class-validator';

export class AddCriminal {
  @IsBoolean()
  @IsNotEmpty()
  criminalType: boolean;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
