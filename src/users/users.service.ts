import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async addUser(user: DeepPartial<User>): Promise<User> {
    const isEmailExist = await this.usersRepo.exists({
      where: { email: user.email },
    });
    if (isEmailExist) {
      throw new UnprocessableEntityException('Please use another email');
    }

    return this.usersRepo.save(user);
  }
}
