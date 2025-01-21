import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { MedicalRecord } from './medical-record.entity';
import { AddMedicalRecordReqDto } from './dtos/add-medical-record.dto';
import { PatientsService } from 'src/patients/patients.service';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectMapper() private mapper: Mapper,
    @InjectRepository(MedicalRecord)
    private medicalRecordsRepo: Repository<MedicalRecord>,
    private patientsService: PatientsService,
  ) {}

  async addMedicalRecord(
    patientId: string,
    addMedicalRecordReqDto: AddMedicalRecordReqDto,
  ): Promise<void> {
    const patient = await this.patientsService.findPatientById(patientId);
    if (!patient) {
      throw new NotFoundException(
        `There is no patient with the following id ${patientId}`,
      );
    }

    const medicalRecord = this.mapper.map(
      addMedicalRecordReqDto,
      AddMedicalRecordReqDto,
      MedicalRecord,
    );
    medicalRecord.patient = patient;

    await this.medicalRecordsRepo.save(medicalRecord);
  }
}
