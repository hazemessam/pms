import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { MedicalRecord } from './medical-record.entity';
import { AddMedicalRecordReqDto } from './dtos/add-medical-record.dto';
import { PatientsService } from 'src/patients/patients.service';
import { ReadMedicalRecordResDto } from './dtos/read-medical-record.dto';
import { UpdateMedicalRecordReqDto } from './dtos/update-medical-record.dto';

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

  async getPatientMedicalRecords(
    patientId: string,
  ): Promise<ReadMedicalRecordResDto[]> {
    const patient = await this.patientsService.findPatientById(patientId);
    if (!patient) {
      throw new NotFoundException(
        `There is no patient with the following id ${patientId}`,
      );
    }

    const medicalRecords = await this.medicalRecordsRepo.find({
      where: { patient },
      order: {
        createdAt: 'DESC',
      },
    });

    return this.mapper.mapArray(
      medicalRecords,
      MedicalRecord,
      ReadMedicalRecordResDto,
    );
  }

  async updateMedicalRecord(
    medicalRecordId: string,
    updateMedicalRecordReqDto: UpdateMedicalRecordReqDto,
  ): Promise<void> {
    const medicalRecord = await this.medicalRecordsRepo.findOne({
      where: { id: medicalRecordId },
    });
    if (!medicalRecord) {
      throw new NotFoundException(
        `There is no medical record with the following id ${medicalRecordId}`,
      );
    }

    const updateMedicalRecord = this.medicalRecordsRepo.merge(
      medicalRecord,
      updateMedicalRecordReqDto,
    );

    await this.medicalRecordsRepo.save(updateMedicalRecord);
  }

  async deleteMedicalRecord(medicalRecordId: string): Promise<void> {
    const isMedicalRecordExist = await this.medicalRecordsRepo.exists({
      where: { id: medicalRecordId },
    });
    if (!isMedicalRecordExist) {
      throw new NotFoundException(
        `There is no medical record with the following id ${medicalRecordId}`,
      );
    }

    await this.medicalRecordsRepo.delete({ id: medicalRecordId });
  }
}
