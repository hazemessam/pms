import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInReqDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignInResDto {
  accessToken: string;
}
