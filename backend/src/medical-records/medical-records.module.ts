import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecord } from './medical-record.entity';
import { MedicalRecordsService } from './medical-records.service';
import { MedicalRecordsMapper } from './medical-records.mapper';
import { PatientsModule } from 'src/patients/patients.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalRecord]),
    forwardRef(() => PatientsModule),
  ],
  providers: [MedicalRecordsService, MedicalRecordsMapper],
  exports: [MedicalRecordsService],
})
export class MedicalRecordsModule {}
