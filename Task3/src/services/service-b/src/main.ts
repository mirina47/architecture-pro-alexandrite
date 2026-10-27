import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

async function bootstrap() {
  const sdk = new NodeSDK({
    resource: resourceFromAttributes({
      [SemanticResourceAttributes.SERVICE_NAME]: 'service_b',
    }),
    traceExporter: new OTLPTraceExporter({
      url: 'http://simplest-collector:4318/v1/traces',
    }),
    instrumentations: [getNodeAutoInstrumentations()],
  });

  await sdk.start();

  const app = await NestFactory.create(AppModule);
  await app.listen(8080, '0.0.0.0');
  console.log('Service A started on 8080');
}
bootstrap();
