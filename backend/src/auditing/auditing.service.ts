import { Injectable } from '@nestjs/common';
import { AddAuditLogDto } from './dtos/add-audit-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditLog } from './auditing.entity';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class AuditingService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogsRepository: Repository<AuditLog>,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async addAuditLog(addAuditLog: AddAuditLogDto): Promise<void> {
    const auditLog = this.mapper.map(addAuditLog, AddAuditLogDto, AuditLog);
    await this.auditLogsRepository.save(auditLog);
  }
}
