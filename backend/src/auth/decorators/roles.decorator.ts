import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/user.entity';

export const ROLES = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES, roles);
