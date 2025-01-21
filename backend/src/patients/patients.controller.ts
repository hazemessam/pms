import { Body, Controller, Post } from '@nestjs/common';
import { AddPatientReqDto } from './dtos/add-patient.dto';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Post()
  async addPatient(@Body() addPatientReqDto: AddPatientReqDto): Promise<void> {
    return this.patientsService.addPatient(addPatientReqDto);
  }
}
