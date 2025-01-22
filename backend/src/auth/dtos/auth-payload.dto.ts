import { UserRole } from 'src/users/user.entity';

export class AuthPayloadDto {
  sub: string;
  role: UserRole;
}
