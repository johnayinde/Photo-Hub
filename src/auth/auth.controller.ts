import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { AuthService } from './auth.service';

import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { SignUpFilter } from '../common/filters/signup-exceptions.filter';
import { SignInFilter } from './../common/filters/signin-exceptions.filter';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/register')
  @Render('register')
  async signUpPage(@Req() req) {
    return {};
  }

  @Get('/login')
  @Render('login')
  async loginPage() {
    return {};
  }

  @UseFilters(SignInFilter)
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async login(@Req() req, @Res() res) {
    console.log(req.user);
    res.redirect('/');
  }

  @UseFilters(SignUpFilter)
  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signUp(@Body() body: CreateUserDto, @Req() req, @Res() res) {
    const user = await this.authService.signUp(body);
    console.log(user);
    req.flash('success', 'User successfully registered');
    res.redirect('/auth/login');
  }

  @UseFilters(SignInFilter)
  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  async logout(@Req() req, @Res() res) {
    req.session.destroy();
    console.log(req.user);
    res.redirect('/');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/me')
  async getme(@Req() req) {
    return req.user;
  }

  // @UseGuards(AuthenticatedGuard)
  @Get('/mee')
  async getmee(@Req() req) {
    return req.user;
  }
}
