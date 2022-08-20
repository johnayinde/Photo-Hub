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

  @Post('/signin')
  @UseFilters(SignInFilter)
  @UseGuards(LocalAuthGuard)
  async login(@Req() req, @Res() res) {
    res.redirect('/');
  }

  @Post('/signup')
  @UseFilters(SignUpFilter)
  @UsePipes(ValidationPipe)
  async signUp(@Body() body: CreateUserDto, @Req() req, @Res() res) {
    const user = await this.authService.signUp(body);
    req.flash('success', 'User successfully registered');
    res.redirect('/auth/login');
  }

  @Get('logout')
  @UseFilters(SignInFilter)
  @UseGuards(AuthenticatedGuard)
  async logout(@Req() req, @Res() res) {
    req.session.destroy();
    res.redirect('/');
  }

  @Get('/me')
  @UseGuards(AuthenticatedGuard)
  async getme(@Req() req) {
    return req.user;
  }
}
