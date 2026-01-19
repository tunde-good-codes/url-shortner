import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import { ValidationPipe } from "@nestjs/common";
import { LoggerService } from "./core/logger/logger-service";
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // weed away or does'nt allow ppt  not in payloadF
    }),
  );
  app.useLogger(app.get(LoggerService));
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
