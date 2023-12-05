import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { DataType } from 'sequelize-typescript';
import { Toasts } from '../../toasts/entities/toasts.entity';
import { Criminals } from '../../criminals/entities/criminals.entity';

@Table
export class Users extends Model<Partial<Users>> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: UUID;

  @Column({ type: DataType.STRING, unique: true })
  username: string;

  @Column(DataType.STRING)
  password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isAdmin: boolean;
  @HasMany(() => Toasts)
  toasts: Toasts[];
  @HasMany(() => Criminals)
  criminals: Criminals[];
}
