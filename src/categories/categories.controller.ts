import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import categoriessService from './categories.service';
  import { CreateCategoryDto } from './dtos/createCategory.dto';
  import { UpdateCategoryDto } from './dtos/updateCategory.dto';
  import JwtAuthenticationGuard from 'src/authentication/jwtAuthentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
  
  @Controller('categories')
  export default class categoriessController {
    constructor(private readonly categoriesService: categoriessService) {}
  
    @Get()
    @UseGuards(JwtAuthenticationGuard)
    getAllCategories() {
      return this.categoriesService.getAllCategories();
    }
  
    @Get(':id')
    getCategoriesById(@Param('id') id: string) {
      return this.categoriesService.getCategoryById(Number(id));
    }
  
    @Post()
    @UseGuards(JwtAuthenticationGuard)
    async createCategories(@Body() note: CreateCategoryDto, @Req() req: RequestWithUser) {
      return this.categoriesService.createCategory(note,req.user);
    }
  
    @Put(':id')
    async replaceCategories(@Body() note: UpdateCategoryDto, @Param('id') id: string) {
      return this.categoriesService.updateCategory(Number(id), note);
    }
  
    @Delete(':id')
    async deleteCategories(@Param('id') id: string) {
      this.categoriesService.deleteCategory(Number(id));
    }
  }
  