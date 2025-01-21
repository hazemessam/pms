import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';
import { AddPatientReqDto } from './dtos/add-patient.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class PatientsService {
  constructor(
    @InjectMapper() private mapper: Mapper,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
  ) {}

  async addPatient(addPatientReqDto: AddPatientReqDto): Promise<void> {
    const isPhoneNumberExists = await this.patientRepo.exists({
      where: { phoneNumber: addPatientReqDto.phoneNumber },
    });

    if (isPhoneNumberExists) {
      throw new UnprocessableEntityException(
        'There is already patient with the chosen phone number!',
      );
    }

    const patient = this.mapper.map(
      addPatientReqDto,
      AddPatientReqDto,
      Patient,
    );

    await this.patientRepo.save(patient);
  }
}
