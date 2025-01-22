import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpReqDto, SignUpResDto } from './dtos/sign-up.dto';
import { User, UserRole } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(
    signUpReqDto: SignUpReqDto,
    userRole: UserRole = UserRole.PROVIDER,
  ): Promise<SignUpResDto> {
    const hashedPassword = await bcrypt.hash(signUpReqDto.password, 10);

    const user = await this.usersService.addUser({
      email: signUpReqDto.email,
      password: hashedPassword,
      role: userRole,
    });

    const accessToken = await this.generateAccessToken(user);

    return { accessToken };
  }

  private async generateAccessToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      role: user.role,
    };

    return this.jwtService.signAsync(payload);
  }
}
