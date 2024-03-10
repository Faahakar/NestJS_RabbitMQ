import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Category from './category.entity';
import { Repository } from 'typeorm';
import CategoryEntity from './category.entity';
import { CategoryNotFoundException } from './exception/CategoryNotFoundException.exception';

@Injectable()
export default class NotesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<CategoryEntity>,
  ) {}

  getAllCategories() {
    return this.categoriesRepository.find();
  }
   
  async getCategoryById(id: string): Promise<CategoryEntity> {
    const category = await this.categoriesRepository.findOne({where: { id },  relations: ['notes'] });
    if (category) {
      return category;
    }
    throw new CategoryNotFoundException(id);
  }
   
  async updateCategory(id: string, category: UpdateCategoryDto): Promise<CategoryEntity> {
    await this.categoriesRepository.save(category);
    const updatedCategory = await this.categoriesRepository.findOne({where: { id },  relations: ['notes'] });
    if (updatedCategory) {
      return updatedCategory;
    }
    throw new CategoryNotFoundException(id);
  }

  async createCategory(category: CreateCategoryDto) {
    const newCategory = await this.categoriesRepository.create(category);
    await this.categoriesRepository.save(newCategory);
    return newCategory;
  }

  async deleteCategory(id: string) {
    const deleteResponse = await this.categoriesRepository.delete(id);
    if (!deleteResponse.affected) {
        throw new CategoryNotFoundException(id);
    }
  }
}
