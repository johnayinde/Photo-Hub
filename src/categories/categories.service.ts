import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryyRepo: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const createCategory = this.categoryyRepo.create(createCategoryDto);

    return this.categoryyRepo.save(createCategory);
  }

  async findAll() {
    return await this.categoryyRepo.find({ relations: ['photos'] });
  }

  async findOne(name: string) {
    return await this.categoryyRepo.findOne({
      where: { name },
      relations: ['photos'],
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    return await this.categoryyRepo.delete(id);
  }
}
