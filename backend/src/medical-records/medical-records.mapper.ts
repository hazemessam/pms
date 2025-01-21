import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { AddMedicalRecordReqDto } from './dtos/add-medical-record.dto';
import { MedicalRecord } from './medical-record.entity';

@Injectable()
export class MedicalRecordsMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, AddMedicalRecordReqDto, MedicalRecord);
    };
  }
}
