import { Injectable } from '@nestjs/common';
import { trace } from '@opentelemetry/api';

@Injectable()
export class AppService {
  async getPrice(): Promise<{ price: number }> {
    const tracer = trace.getTracer('pricing-service');
    return tracer.startActiveSpan('get_price', (span) => {
      const price = Math.floor(Math.random() * 1000);
      span.end();
      return { price };
    });
  }
}
