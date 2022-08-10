import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { Gallery } from './entities/gallery.entity';
import { User } from './../users/entities/User.entity';
import { Category } from './../categories/entities/category.entity';
import { relative } from 'path';

@Injectable()
export class GalleriesService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepo: Repository<Gallery>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(createGalleryDto: CreateGalleryDto, user: User) {
    try {
      const category = await this.categoryRepo.findOne({
        where: { id: createGalleryDto.categoryId },
      });

      console.log({ category });

      if (!category)
        throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);

      const photo = this.galleryRepo.create({
        title: createGalleryDto.title,
        image: createGalleryDto.image,
        user,
        category,
      });
      const newPhoto = await this.galleryRepo.save(photo);

      if (!newPhoto)
        throw new HttpException('Photo not uploaded', HttpStatus.BAD_REQUEST);

      return newPhoto;
    } catch (error) {
      // console.log('serv', error.message);

      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    const allGalleries = await this.galleryRepo.find({});
    console.log(allGalleries.length);

    // if () {
    //   throw new HttpException('No Galleries available!', HttpStatus.NOT_FOUND);
    // }

    return allGalleries;
  }

  async findOne(id: number) {
    const photo = await this.galleryRepo.findOne({
      where: { id },
    });

    if (!photo) {
      throw new HttpException('No Photo with given Id!', HttpStatus.NOT_FOUND);
    }
    return photo;
  }

  async remove(id: number) {
    const photo = await this.findOne(id);

    if (!photo) {
      return new HttpException('No photo with given Id!', HttpStatus.NOT_FOUND);
    }

    return await this.galleryRepo.delete(id);
  }
}
