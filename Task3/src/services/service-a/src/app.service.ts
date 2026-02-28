import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { trace } from '@opentelemetry/api';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getOrders(): Promise<any> {
    const tracer = trace.getTracer('service-a');
    return tracer.startActiveSpan('get_orders', async (span) => {
      const orders = ['order1', 'order2', 'order3'];

      // вызов Service B
      const price = await firstValueFrom(
        this.httpService.get('http://service-b:8080/price'),
      );

      span.end();
      return orders.map((order) => ({ order, price: price.data }));
    });
  }
}
