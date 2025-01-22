import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { UpdateMedicalRecordReqDto } from './dtos/update-medical-record.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { Auditable } from 'src/auditing/decorators/auditing.decorator';

@Auditable()
@Roles(UserRole.ADMIN)
@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private medicalRecordsService: MedicalRecordsService) {}

  @Roles(UserRole.PROVIDER)
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

  @Delete(':medicalRecordId')
  async deleteMedicalRecord(
    @Param('medicalRecordId') medicalRecordId: string,
  ): Promise<void> {
    return this.medicalRecordsService.deleteMedicalRecord(medicalRecordId);
  }
}
