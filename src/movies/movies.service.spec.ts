import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import * as fs from 'fs/promises';
import { Dirent } from 'fs';
import { Stats } from 'fs';

import * as path from 'path';

jest.mock('fs/promises');
jest.mock('path');

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should return movies', async () => {
    const mockFiles: Dirent[] = [
      { name: 'movie1.mp4', isFile: () => true } as Dirent,
      { name: 'movie2.mp4', isFile: () => true } as Dirent
    ];
    jest.spyOn(fs, 'readdir').mockResolvedValue(mockFiles);
    jest.spyOn(path, 'join').mockImplementation((...args) => args.join('/'));
    jest.spyOn(fs, 'stat').mockResolvedValue({ isFile: () => true } as Stats);

    const movies = await service.getMovies();
    expect(movies.length).toBe(2);
  });
});