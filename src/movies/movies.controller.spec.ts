import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    service = { getMovies: jest.fn().mockResolvedValue([]) } as any;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [{ provide: MoviesService, useValue: service }],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should return movies', async () => {
    const movies = await controller.getByName('test');
    expect(movies).toEqual([]);
    expect(service.getMovies).toHaveBeenCalledWith('test');
  });
});