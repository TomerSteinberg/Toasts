import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CriminalsController } from './criminals.controller';
import { Criminals } from './entities/criminals.entity';
import { CriminalsService } from './criminals.service';
import { UserModule } from '../users/users.module';
import { ToastsModule } from '../toasts/toasts.module';

@Module({
  imports: [SequelizeModule.forFeature([Criminals]), UserModule, ToastsModule],
  controllers: [CriminalsController],
  providers: [CriminalsService],
  exports: [CriminalsService],
})
export class CriminalModule {}
