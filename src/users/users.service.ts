import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async getUserById(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    return user;
  }

  async getUserGalleries(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['galleries'],
    });

    return user.galleries;
  }
}
