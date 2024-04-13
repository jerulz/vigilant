import { AppService } from './app.service';
import { Controller, Get, Param } from '@nestjs/common';
import { Movie } from './movie';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('movies/:path')
  async getFiles(@Param('path') path: string): Promise<Movie[]> {
    return await this.appService.getMovies(path);
  }
}
