import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
import { UpdatePatientReqDto } from './dtos/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectMapper() private mapper: Mapper,
    @InjectRepository(Patient) private patientsRepo: Repository<Patient>,
  ) {}

  async addPatient(addPatientReqDto: AddPatientReqDto): Promise<void> {
    await this.validatePhoneNumberAvailability(addPatientReqDto.phoneNumber);

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

  async updatePatient(
    patientId: string,
    updatePatientReqDto: UpdatePatientReqDto,
  ): Promise<void> {
    const patient = await this.patientsRepo.findOne({
      where: { id: patientId },
    });
    if (!patient) {
      throw new NotFoundException('There is no patient with the provided id!');
    }

    if (
      updatePatientReqDto.phoneNumber &&
      updatePatientReqDto.phoneNumber != patient.phoneNumber
    ) {
      await this.validatePhoneNumberAvailability(
        updatePatientReqDto.phoneNumber,
      );
    }

    const updatedPatient = this.patientsRepo.merge(
      patient,
      updatePatientReqDto,
    );

    await this.patientsRepo.save(updatedPatient);
  }

  async deletePatient(patientId: string): Promise<void> {
    const isPatientExist = await this.patientsRepo.exists({
      where: { id: patientId },
    });
    if (!isPatientExist) {
      throw new NotFoundException('There is no patient with the provided id!');
    }

    await this.patientsRepo.delete({ id: patientId });
  }

  private async validatePhoneNumberAvailability(phoneNumber: string) {
    const isPhoneNumberExist = await this.patientsRepo.exists({
      where: { phoneNumber },
    });
    if (isPhoneNumberExist) {
      throw new UnprocessableEntityException(
        'There is already patient with the provided phone number!',
      );
    }
  }
}
