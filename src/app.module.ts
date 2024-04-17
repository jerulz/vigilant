import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { NetworkModule } from './network/network.module';

@Module({
  imports: [MoviesModule, NetworkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
