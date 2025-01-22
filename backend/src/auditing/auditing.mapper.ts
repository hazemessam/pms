import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { AddAuditLogDto } from './dtos/add-audit-log.dto';
import { AuditLog } from './auditing.entity';

@Injectable()
export class AuditingMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        AddAuditLogDto,
        AuditLog,
        forMember(
          (dest) => dest.payload,
          mapFrom((src) => src.payload),
        ),
      );
    };
  }
}
