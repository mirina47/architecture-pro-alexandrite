import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('price')
  async getPrice(): Promise<{ price: number }> {
    return this.appService.getPrice();
  }
}
