import { Module } from '@nestjs/common';
import { ArticlesService } from './services/articles/articles.service';
import { CategoriesService } from './services/categories/categories.service';
import { ArticlesController } from './controllers/articles/articles.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Category])],
  controllers: [ArticlesController, CategoriesController],
  providers: [ArticlesService, CategoriesService],
})
export class BlogModule {}
