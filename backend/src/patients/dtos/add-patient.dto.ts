import { AutoMap } from '@automapper/classes';
import {
  IsDateString,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class AddPatientReqDto {
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  name: string;

  @IsDateString()
  @AutoMap()
  dateOfBirth: Date;

  @IsPhoneNumber()
  @AutoMap()
  phoneNumber: string;
}
