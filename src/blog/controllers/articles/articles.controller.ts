import { Controller } from '@nestjs/common';
import { ArticlesService } from '../../services/articles/articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}
}
