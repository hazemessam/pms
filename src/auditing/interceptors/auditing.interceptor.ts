import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClsService } from 'nestjs-cls';
import { CustomClsStore } from 'src/config/cls.config';
import { IS_AUDITABLE } from '../decorators/auditing.decorator';
import { AuditingService } from '../auditing.service';
import { AddAuditLogDto } from '../dtos/add-audit-log.dto';

@Injectable()
export class AuditingInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private clsService: ClsService<CustomClsStore>,
    private auditingService: AuditingService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const authPayload = this.clsService.get('authPayload');
    if (this.isAuditAble(context) && authPayload) {
      const { method, url, params, query, body } = context
        .switchToHttp()
        .getRequest();

      const auditLog: AddAuditLogDto = {
        userId: authPayload.sub,
        action: context.getHandler().name,
        payload: {
          req: { method, url, params, query, body },
        },
      };

      await this.auditingService.addAuditLog(auditLog);
    }

    return next.handle();
  }

  private isAuditAble(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride(IS_AUDITABLE, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}
