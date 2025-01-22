import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { UserRole } from 'src/users/user.entity';
import { ROLES } from '../decorators/roles.decorator';
import { AuthPayloadDto } from '../dtos/auth-payload.dto';
import { ClsService } from 'nestjs-cls';
import { CustomClsStore } from 'src/config/cls.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private clsService: ClsService<CustomClsStore>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.isPublic(context)) {
      return true;
    }

    const token = this.extractToken(context);
    if (!token) {
      throw new UnauthorizedException();
    }

    let payload: AuthPayloadDto;
    try {
      payload = await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException();
    }

    if (!this.isAuthorized(context, payload.role)) {
      throw new ForbiddenException();
    }

    this.clsService.set('authPayload', payload);

    return true;
  }

  private isPublic(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private extractToken(context: ExecutionContext): string {
    const req = context.switchToHttp().getRequest();
    return req.headers.authorization?.split(' ')[1];
  }

  private isAuthorized(context: ExecutionContext, role: UserRole): boolean {
    const allowedRoles = this.reflector.getAllAndMerge<UserRole[]>(ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);

    return allowedRoles.includes(role);
  }
}
