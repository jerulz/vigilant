import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    var app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getFiles', () => {
    it('should return an array of movies', async () => {
      const folderPath = '/path/to/movies';
      const expectedMovies = [
        { name: 'Movie 1', year: 2021, format: 'mp4', genre: 'Action' },
        { name: 'Movie 2', year: 1998, format: 'avi', genre: 'Drama' },
      ];

      //jest.spyOn(appService, 'getMovies').mockResolvedValue(expectedMovies);

      const movies = await appController.getFiles(folderPath);

      expect(movies).toEqual(expectedMovies);
    });
  });
});
