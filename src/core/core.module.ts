import { Global, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import config from "../config";
import { TransformResponseInterceptor } from "./interceptors/transform-response/transform-response.interceptor";
import { LoggerService } from "./logger/logger-service";
import { LoggerMiddleware } from "./middleware/logger/logger.middleware";
import { DatabaseService } from "../database/database.service";
import { CacheService } from "./cache/cache.service";
import { RedisModule } from "./redis/redis.module";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    RedisModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    LoggerService,
    DatabaseService,
    CacheService,
  ],
  exports: [LoggerService, DatabaseService, CacheService],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
