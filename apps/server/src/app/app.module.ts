import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ToastsModule } from './toasts/toasts.module';
import { UserModule } from './users/users.module';
import { CriminalModule } from './criminals/criminals.module';

@Module({
  imports: [
    ToastsModule,
    UserModule,
    CriminalModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'C0L0Rpunch',
      database: 'postgres',
      models: [],
      autoLoadModels: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
