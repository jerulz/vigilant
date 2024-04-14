import { MoviesService } from './movies.service';
import { Controller, Get, Param, Query } from "@nestjs/common";
import { Movie } from './movies.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('getAll')
  async getAll(): Promise<Movie[]> {
    return await this.moviesService.getMovies();
  }

  @Get('getByName')
  async getByName(@Query('name') name: string = ''): Promise<Movie[]> {
    return await this.moviesService.getMovies(name);
  }
}