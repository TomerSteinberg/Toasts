import { Module } from '@nestjs/common';
import { ToastsController } from './toasts.controller';
import { ToastsService } from './toasts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Toasts } from './entities/toasts.entity';
import { UserModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Toasts]), UserModule],
  controllers: [ToastsController],
  providers: [ToastsService],
})
export class ToastsModule {}
