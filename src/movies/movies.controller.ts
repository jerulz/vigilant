import { MoviesService } from './movies.service';
import { Controller, Get, Param } from '@nestjs/common';
import { Movie } from './movies.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: MoviesService) {}

  @Get('movies/:path')
  async getFiles(@Param('path') path: string): Promise<Movie[]> {
    return await this.appService.getMovies(path);
  }
}