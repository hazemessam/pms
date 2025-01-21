import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { ILike, Repository } from 'typeorm';
import { AddPatientReqDto } from './dtos/add-patient.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { FilterPatientsReqDto } from './dtos/filter-patients.dto';
import { ReadPatientResDto } from './dtos/read-patient.dto';
import {
  PaginatedDataResDto,
  PaginationReqDto,
} from 'src/common/dtos/pagination.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectMapper() private mapper: Mapper,
    @InjectRepository(Patient) private patientsRepo: Repository<Patient>,
  ) {}

  async addPatient(addPatientReqDto: AddPatientReqDto): Promise<void> {
    const isPhoneNumberExists = await this.patientsRepo.exists({
      where: { phoneNumber: addPatientReqDto.phoneNumber },
    });

    if (isPhoneNumberExists) {
      throw new UnprocessableEntityException(
        'There is already patient with the provided phone number!',
      );
    }

    const patient = this.mapper.map(
      addPatientReqDto,
      AddPatientReqDto,
      Patient,
    );

    await this.patientsRepo.save(patient);
  }

  async getPatients(
    filterPatientsReqDto: FilterPatientsReqDto,
    paginationReqDto: PaginationReqDto,
  ): Promise<PaginatedDataResDto<ReadPatientResDto>> {
    const [patients, patientsCount] = await this.patientsRepo.findAndCount({
      where: {
        name:
          filterPatientsReqDto.name && ILike(`%${filterPatientsReqDto.name}%`),
        dateOfBirth: filterPatientsReqDto.dateOfBirth,
      },
      skip: paginationReqDto.skip,
      take: paginationReqDto.size,
    });

    const res: PaginatedDataResDto<ReadPatientResDto> = {
      data: this.mapper.mapArray(patients, Patient, ReadPatientResDto),
      total: patientsCount,
    };

    return res;
  }
}
