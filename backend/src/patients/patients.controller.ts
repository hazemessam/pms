import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AddPatientReqDto } from './dtos/add-patient.dto';
import { PatientsService } from './patients.service';
import { FilterPatientsReqDto } from './dtos/filter-patients.dto';
import { ReadPatientResDto } from './dtos/read-patient.dto';
import {
  PaginatedDataResDto,
  PaginationReqDto,
} from 'src/common/dtos/pagination.dto';

@Controller('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Post()
  async addPatient(@Body() addPatientReqDto: AddPatientReqDto): Promise<void> {
    return this.patientsService.addPatient(addPatientReqDto);
  }

  @Get()
  async getPatients(
    @Query() filterPatientsReqDto: FilterPatientsReqDto,
    @Query() paginationReqDto: PaginationReqDto,
  ): Promise<PaginatedDataResDto<ReadPatientResDto>> {
    return this.patientsService.getPatients(
      filterPatientsReqDto,
      paginationReqDto,
    );
  }
}
