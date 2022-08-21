import {
  Controller,
  Get,
  Param,
  Render,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { GalleriesService } from './galleries/galleries.service';
import { UsersService } from 'src/users/users.service';
import { SignInFilter } from './common/filters/signin-exceptions.filter';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { CategoriesService } from './categories/categories.service';

@UseFilters(SignInFilter)
@Controller()
export class AppController {
  constructor(
    private readonly galleryService: GalleriesService,
    private readonly categporyService: CategoriesService,
    private readonly userService: UsersService,
  ) {}

  @Get('/category/:name')
  @Render('home')
  async categoryHomePage(@Req() req, @Param('name') name: string) {
    const categories = await this.categporyService.findAll();

    const categoryPhotos = await this.categporyService.findOne(name);

    const photos = categoryPhotos.photos;
    return { photos, categories: categories };
  }

  @Get('/')
  @Render('home')
  async homePage(@Req() req) {
    const size = 3;
    const allGalleries = await this.galleryService.findAll();
    const categories = await this.categporyService.findAll();

    return {
      galleries: allGalleries,
      categories: categories,
      moreCat: categories.slice(size),
    };
  }

  @Get('/dashboard')
  @Render('dashboard')
  @UseGuards(AuthenticatedGuard)
  async dashboardPage(@Req() req, @Res() res) {
    const allGalleries = await this.userService.getUserGalleries(req.user.id);
    return { galleries: allGalleries };
  }
}
