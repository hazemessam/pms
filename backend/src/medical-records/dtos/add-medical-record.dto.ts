import { AutoMap } from '@automapper/classes';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class AddMedicalRecordReqDto {
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  note: string;

  @IsDateString()
  @AutoMap()
  createdAt: Date;
}
