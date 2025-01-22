import { AutoMap } from '@automapper/classes';

export class AddAuditLogDto {
  @AutoMap()
  userId: string;

  @AutoMap()
  action: string;

  @AutoMap()
  payload: object;
}
