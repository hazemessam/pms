import { Module } from '@nestjs/common';
import { AuditingInterceptor } from './interceptors/auditing.interceptor';
import { AuditingService } from './auditing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from './auditing.entity';
import { AuditingMapper } from './auditing.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog])],
  providers: [AuditingService, AuditingInterceptor, AuditingMapper],
})
export class AuditingModule {}
