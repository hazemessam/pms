import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AddPatientReqDto } from './dtos/add-patient.dto';
import { PatientsService } from './patients.service';
import { FilterPatientsReqDto } from './dtos/filter-patients.dto';
import { ReadPatientResDto } from './dtos/read-patient.dto';
import {
  PaginatedDataResDto,
  PaginationReqDto,
} from 'src/common/dtos/pagination.dto';
import { UpdatePatientReqDto } from './dtos/update-patient.dto';
import { AddMedicalRecordReqDto } from 'src/medical-records/dtos/add-medical-record.dto';
import { MedicalRecordsService } from 'src/medical-records/medical-records.service';
import { ReadMedicalRecordResDto } from 'src/medical-records/dtos/read-medical-record.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/user.entity';

@Roles(UserRole.ADMIN)
@Controller('patients')
export class PatientsController {
  constructor(
    private patientsService: PatientsService,
    private medicalRecordsService: MedicalRecordsService,
  ) {}

  @Roles(UserRole.PROVIDER)
  @Post()
  async addPatient(@Body() addPatientReqDto: AddPatientReqDto): Promise<void> {
    return this.patientsService.addPatient(addPatientReqDto);
  }

  @Roles(UserRole.PROVIDER)
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

  @Roles(UserRole.PROVIDER)
  @Patch(':patientId')
  async updatePatient(
    @Param('patientId') patientId: string,
    @Body() updatePatientReqDto: UpdatePatientReqDto,
  ): Promise<void> {
    return this.patientsService.updatePatient(patientId, updatePatientReqDto);
  }

  @Delete(':patientId')
  async deletePatient(@Param('patientId') patientId: string): Promise<void> {
    return this.patientsService.deletePatient(patientId);
  }

  @Roles(UserRole.PROVIDER)
  @Post(':patientId/medical-records')
  async addMedicalRecord(
    @Param('patientId') patientId: string,
    @Body() addMedicalRecordReqDto: AddMedicalRecordReqDto,
  ): Promise<void> {
    return this.medicalRecordsService.addMedicalRecord(
      patientId,
      addMedicalRecordReqDto,
    );
  }

  @Roles(UserRole.PROVIDER)
  @Get(':patientId/medical-records')
  async getPatientMedicalRecords(
    @Param('patientId') patientId: string,
  ): Promise<ReadMedicalRecordResDto[]> {
    return this.medicalRecordsService.getPatientMedicalRecords(patientId);
  }
}
