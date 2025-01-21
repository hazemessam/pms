import { AutoMap } from '@automapper/classes';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdatePatientReqDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @AutoMap()
  name?: string;

  @IsDateString()
  @IsOptional()
  @AutoMap()
  dateOfBirth?: Date;

  @IsPhoneNumber()
  @IsOptional()
  @AutoMap()
  phoneNumber?: string;
}
