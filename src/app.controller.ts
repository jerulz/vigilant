import { AppService } from './app.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
