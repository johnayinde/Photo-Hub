import { Module } from '@nestjs/common';
import { GalleriesService } from './galleries.service';
import { GalleriesController } from './galleries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { Category } from './../categories/entities/category.entity';
import { CategoriesService } from './../categories/categories.service';
import { CloudinaryModule } from './../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule, TypeOrmModule.forFeature([Gallery, Category])],
  controllers: [GalleriesController],
  providers: [GalleriesService, CategoriesService],
  exports: [GalleriesService],
})
export class GalleriesModule {}
