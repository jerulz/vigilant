import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Movie } from './movies.entity';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);

  public async getMovies(folderPath: string): Promise<Movie[]> {
    var files: string[] = [];

    var filesInFolder = await fs.readdir(folderPath);

    filesInFolder.sort();

    for (var file of filesInFolder) {
      var filePath = path.join(folderPath, file);
      var stats = await fs.stat(filePath);

      if (stats.isFile()) {
        files.push(filePath);
      }
    }

    return this.toMovieObject(files);
  }

  private async toMovieObject(files: string[]): Promise<Movie[]> {
    var movieObjects: Movie[] = [];

    for (var file of files) {
      movieObjects.push(await this.formatMovie(file));
    }

    this.logger.log(`Found ${movieObjects.length} movies`)
    return movieObjects;
  }

  private async formatMovie(file: string): Promise<Movie> {
    var fileParts = file.split('\\');
    var title = fileParts[6].trim();
    var type = fileParts[5];
    var yearMatch = file.match(/\d{4}/);

    let year = yearMatch ? parseInt(yearMatch[0]) : null;
    year = this.isBetween1950And2050(year) ? year : null;

    var index = file.lastIndexOf('.');
    var format = file.substring(index + 1);

    this.logger.debug(`Formatting movie: ${title}`);

    return new Movie(title, year, format, type);
  }

  private isBetween1950And2050(year: number): boolean {
    return year >= 1950 && year <= 2050;
  }
}