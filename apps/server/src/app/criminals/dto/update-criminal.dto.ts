import { IsBoolean } from 'class-validator';

export class UpdateCriminalDTO {
  @IsBoolean()
  criminalType?: boolean;
}
