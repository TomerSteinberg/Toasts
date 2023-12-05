import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Users } from '../../users/entities/users.entity';

@Table
export class Toasts extends Model<Partial<Toasts>> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column(DataType.STRING)
  reason: string;

  @Column(DataType.DATE)
  date: Date;

  @Column(DataType.UUID)
  @ForeignKey(() => Users)
  userId: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isConvicting: boolean;

  @BelongsTo(() => Users) user: Users;
}
