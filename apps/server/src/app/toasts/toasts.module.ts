import { Module } from '@nestjs/common';
import { ToastsController } from './toasts.controller';
import { ToastsService } from './toasts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Toasts } from './entities/toasts.entity';
import { UserModule } from '../users/users.module';
import { CriminalModule } from '../criminals/criminals.module';

@Module({
  imports: [SequelizeModule.forFeature([Toasts]), UserModule, CriminalModule],
  controllers: [ToastsController],
  providers: [ToastsService],
  exports: [ToastsService],
})
export class ToastsModule {}
