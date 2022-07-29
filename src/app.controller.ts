import {
  Controller,
  Get,
  Render,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';
import { GalleriesService } from './galleries/galleries.service';
import { UsersService } from 'src/users/users.service';
import { SignInFilter } from './common/filters/signin-exceptions.filter';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  constructor(
    private readonly galleryService: GalleriesService,
    private readonly userService: UsersService,
  ) {}

  @Get('/')
  @Render('home')
  async homePage(@Req() req) {
    const allGalleries = await this.galleryService.findAll();
    return { galleries: allGalleries };
  }

  @UseFilters(SignInFilter)
  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  @Render('profile')
  async profilePage(@Req() req, @Res() res) {
    const allGalleries = await this.userService.getUserGalleries(req.user.id);
    console.log(allGalleries);

    return { galleries: allGalleries };
  }
}
