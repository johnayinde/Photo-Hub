import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async getme(@Req() req) {
    console.log(req.user);

    return this.userService.getUserById(req.user.userId);
  }
}
