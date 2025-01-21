import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { AddPatientReqDto } from './dtos/add-patient.dto';
import { Patient } from './patient.entity';

@Injectable()
export class PatientsMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, AddPatientReqDto, Patient);
    };
  }
}
