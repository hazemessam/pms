import { AutoMap } from '@automapper/classes';
import { IsDateString, IsPhoneNumber, IsString } from 'class-validator';

export class AddPatientReqDto {
  @IsString()
  @AutoMap()
  name: string;

  @IsDateString()
  @AutoMap()
  dateOfBirth: Date;

  @IsPhoneNumber()
  @AutoMap()
  phoneNumber: string;
}
