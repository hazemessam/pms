import { Body, Controller, Param, Patch } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { UpdateMedicalRecordReqDto } from './dtos/update-medical-record.dto';

@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private medicalRecordsService: MedicalRecordsService) {}

  @Patch(':medicalRecordId')
  async updateMedicalRecord(
    @Param('medicalRecordId') medicalRecordId: string,
    @Body() updateMedicalRecordReqDto: UpdateMedicalRecordReqDto,
  ): Promise<void> {
    return this.medicalRecordsService.updateMedicalRecord(
      medicalRecordId,
      updateMedicalRecordReqDto,
    );
  }
}
