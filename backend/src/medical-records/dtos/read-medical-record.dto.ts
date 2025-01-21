import { AutoMap } from '@automapper/classes';

export class ReadMedicalRecordResDto {
  @AutoMap()
  id: string;

  @AutoMap()
  note: string;

  @AutoMap()
  createdAt: Date;
}
