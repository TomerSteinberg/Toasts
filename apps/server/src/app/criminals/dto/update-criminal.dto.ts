import { IsBoolean } from 'class-validator';

export class UpdateCriminal {
  @IsBoolean()
  criminalType?: boolean;
}
