import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthHelperService } from '../common/helper/auth-helper.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/users/entities/User.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private readonly userService: UsersService,
    private authHelper: AuthHelperService, 
  ) {}

  async signUp(data: CreateUserDto) {
    const userData = Object.assign(new User(), data);

    const userExist = await this.userService.getUserByEmail(data.email);
    console.log({ userExist });

    if (userExist)
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);

    const user = await this.usersRepo.save(userData);
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new HttpException('user Not found', HttpStatus.BAD_REQUEST);
    }
    const verifyPassword = await this.authHelper.comparePassword(
      password,
      user.password,
    );
    console.log({ verifyPassword });

    if (!verifyPassword) {
      throw new UnauthorizedException('Invalid Password');
    }

    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    console.log({ user });

    if (!user)
      throw new HttpException('Invalid Email Address', HttpStatus.BAD_REQUEST);

    const verifyPassword = await this.authHelper.comparePassword(
      password,
      user.password,
    );
    if (user && verifyPassword) {
      const { password, ...result } = user;
      return result;
    }

    throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
  }
}
