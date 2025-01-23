import { forwardRef, Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { PatientsMapper } from './patients.mapper';
import { MedicalRecordsModule } from 'src/medical-records/medical-records.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    forwardRef(() => MedicalRecordsModule),
  ],
  controllers: [PatientsController],
  providers: [PatientsService, PatientsMapper],
  exports: [PatientsService],
})
export class PatientsModule {}
