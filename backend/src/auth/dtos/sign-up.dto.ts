import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpReqDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8)
  password: string;
}

export class SignUpResDto {
  accessToken: string;
}
