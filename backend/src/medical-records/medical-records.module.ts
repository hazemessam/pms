import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecord } from './medical-record.entity';
import { MedicalRecordsService } from './medical-records.service';
import { MedicalRecordsMapper } from './medical-records.mapper';
import { PatientsModule } from 'src/patients/patients.module';
import { MedicalRecordsController } from './medical-records.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalRecord]),
    forwardRef(() => PatientsModule),
  ],
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService, MedicalRecordsMapper],
  exports: [MedicalRecordsService],
})
export class MedicalRecordsModule {}
