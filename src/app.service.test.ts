import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { Movie } from './movie';
import fs from 'fs';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('getMovies', () => {
    it('should return an array of movies', async () => {
      const folderPath = '/path/to/movies';
      const expectedMovies = [
        new Movie('Movie 1', 2021, 'mp4', 'Action'),
        new Movie('Movie 2', 1998, 'avi', 'Drama'),
      ];

      //jest.spyOn(fs, 'readdir').mockResolvedValue(['movie1.mp4', 'movie2.avi']);
      //jest.spyOn(fs, 'stat').mockResolvedValue({ isFile: () => true });

      const movies = await appService.getMovies(folderPath);

      expect(movies).toEqual(expectedMovies);
    });
  });
});