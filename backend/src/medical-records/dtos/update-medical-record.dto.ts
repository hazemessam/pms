import { AutoMap } from '@automapper/classes';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateMedicalRecordReqDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @AutoMap()
  note?: string;

  @IsDateString()
  @IsOptional()
  @AutoMap()
  createdAt?: Date;
}
