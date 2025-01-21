import { IsDateString, IsOptional, IsString } from 'class-validator';

export class FilterPatientsReqDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;
}
