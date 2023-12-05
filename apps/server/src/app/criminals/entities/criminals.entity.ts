import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Toasts } from '../../toasts/entities/toasts.entity';
import { Users } from '../../users/entities/users.entity';

@Table
export class Criminals extends Model<Partial<Criminals>> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column(DataType.UUID)
  @ForeignKey(() => Users)
  userId: string;

  @Column(DataType.BOOLEAN)
  criminalType: boolean;

  @BelongsTo(() => Users) toast: Toasts;
}
