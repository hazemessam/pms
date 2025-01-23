import { AutoMap } from '@automapper/classes';

export class ReadPatientResDto {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  dateOfBirth: Date;

  @AutoMap()
  phoneNumber: string;
}
