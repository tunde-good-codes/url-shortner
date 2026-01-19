import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LoggerService } from "./core/logger/logger-service";

import { CacheService } from "./core/cache/cache.service";
@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
    private readonly cacheService: CacheService,
  ) {}
  async getHello() {
    this.logger.log("app-service");
    const appName = this.configService.get<string>("APP_NAME");
    console.log(appName);
    await this.cacheService.set(`red`, `black`, 900);
    const val = await this.cacheService.get(`red`);
    console.log(val, `checks`);

    // return {
    //   data: "Hello to a new nestjs now World!",
    //   success: true,
    //   meta: {
    //     pages: 10,
    //   },
    // };

    return val;
  }
}
