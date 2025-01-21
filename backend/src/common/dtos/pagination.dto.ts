import { Transform } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginatedDataResDto<T> {
  data: T[];
  total: number;
}

export class PaginationReqDto {
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page: number = 1;

  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  size: number = 50;

  get skip() {
    return (this.page - 1) * this.size;
  }
}
