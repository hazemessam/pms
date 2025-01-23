import { ClsStore } from 'nestjs-cls';
import { AuthPayloadDto } from 'src/auth/dtos/auth-payload.dto';

export interface CustomClsStore extends ClsStore {
  authPayload: AuthPayloadDto;
}
