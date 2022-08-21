import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Render,
  UseGuards,
  UseFilters,
  Res,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GalleriesService } from './galleries.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { SignInFilter } from 'src/common/filters/signin-exceptions.filter';
import { CategoriesService } from './../categories/categories.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@UseFilters(SignInFilter)
@Controller('gallery')
export class GalleriesController {
  constructor(
    private readonly galleriesService: GalleriesService,
    private readonly categoryService: CategoriesService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('/new')
  @Render('upload')
  @UseGuards(AuthenticatedGuard)
  async uploadPage() {
    const categories = await this.categoryService.findAll();
    return { categories };
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AuthenticatedGuard)
  async create(
    @Body() createGalleryDto: CreateGalleryDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
    @Req() req,
  ) {
    try {

      const upload = await this.galleriesService.create(
        createGalleryDto,
        req.user,
        file,
      );

      if (upload) {
        req.flash('success', 'Photo uploaded successfully');
        res.redirect('/');
      }
    } catch (error) {
      req.flash('error', error.message);
      res.redirect('/gallery/new');
    }
  }

  @Get()
  async findAll() {
    return await this.galleriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.galleriesService.findOne(+id);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res, @Req() req) {
    await this.galleriesService.remove(id);
    req.flash('success', 'Photo Deleted successfully');
    res.redirect('/dashboard');
  }
}
