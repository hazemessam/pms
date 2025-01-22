import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpReqDto, SignUpResDto } from './dtos/sign-up.dto';
import { SignInReqDto, SignInResDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  async signUp(@Body() signUpReqDto: SignUpReqDto): Promise<SignUpResDto> {
    return this.authService.signUp(signUpReqDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInReqDto: SignInReqDto): Promise<SignInResDto> {
    return this.authService.signIn(signInReqDto);
  }
}
