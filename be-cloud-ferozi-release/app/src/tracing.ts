import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core'
import { PrismaInstrumentation } from '@prisma/instrumentation'

// Configure the SDK to export telemetry data to the console
// Enable all auto-instrumentations from the meta package
const exporterOptions = {
  url: process.env.TRACING_URL ?? "http://signoz-release-otel-collector.surveillance.svc.cluster.local:4318/v1/traces",
};
console.log("Tracing to",process.env.TRACING_URL)

const traceExporter = new OTLPTraceExporter(exporterOptions);
const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations(),new NestInstrumentation(),new PrismaInstrumentation()],
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'Ferozi',
  }),
});

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});

export default sdk;