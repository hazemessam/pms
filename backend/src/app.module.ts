import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmModuleConfig } from './config/typeorm.config';
import { PatientsModule } from './patients/patients.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuditingModule } from './auditing/auditing.module';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmModuleConfig),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    ClsModule.forRoot({ global: true, middleware: { mount: true } }),
    PatientsModule,
    MedicalRecordsModule,
    UsersModule,
    AuthModule,
    AuditingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
