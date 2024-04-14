import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import * as fs from 'fs/promises';
import * as path from 'path';
import { Movie } from './movies.entity';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);


  public async getMovies(name?: string): Promise<Movie[]> {
    let files: string[] = [];

    const folderPath = process.env.MOVIES_PATH;
    if(!folderPath){
      throw new NotFoundException(`No folder path found.`);
    }
    this.logger.log(`Searching for movies in ${folderPath}`);

    let filesInFolder: string[];

    if (name) {
      filesInFolder = (await fs.readdir(folderPath))
        .filter(file => file.toLowerCase()
        .includes(name.toLowerCase()));
    }
    else{
      filesInFolder = await fs.readdir(folderPath);
    }

    filesInFolder.sort();

    for (let file of filesInFolder) {
      let filePath = path.join(folderPath, file);
      let stats = await fs.stat(filePath);

      if (stats.isFile()) {
        files.push(filePath);
      }
    }

    return this.toMovieObject(files);
  }

  private async toMovieObject(files: string[]): Promise<Movie[]> {
    let movieObjects: Movie[] = [];

    for (let file of files) {
      movieObjects.push(await this.formatMovie(file));
    }

    this.logger.log(`Found ${movieObjects.length} movies`)
    return movieObjects;
  }

  private async formatMovie(file: string): Promise<Movie> {
    let fileParts = file.split('\\');
    let title = fileParts[6].trim();
    let type = fileParts[5];
      let yearMatch = file.match(/\d{4}/);

    let year = yearMatch ? parseInt(yearMatch[0]) : null;
    year = this.isBetween1950And2050(year) ? year : null;

    let index = file.lastIndexOf('.');
    let format = file.substring(index + 1);

    this.logger.debug(`Formatting movie: ${title}`);

    return new Movie(title, year, format, type);
  }

  private isBetween1950And2050(year: number): boolean {
    return year >= 1950 && year <= 2050;
  }
}