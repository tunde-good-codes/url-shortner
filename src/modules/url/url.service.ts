import { Injectable } from "@nestjs/common";
import { CreateUrlDto } from "./dto/create-url.dto";
import { UpdateUrlDto } from "./dto/update-url.dto";
import { UidService } from "src/services/uid/uid.service";
import { PrismaService } from "src/database/prisma.service";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class UrlService {
  private host: string;
  constructor(
    private readonly uidService: UidService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}
  OnModuleInit() {
    this.host = this.configService.getOrThrow<string>(`host`);
  }
  create(createUrlDto: CreateUrlDto) {
    const randomId = this.uidService.generate(6);
    const url = this.prismaService.url.create({
      data: {
        ...createUrlDto,
        url: `${this.host}/${randomId}`,
      },
    });

    return url;
  }

  findAll() {
    return `This action returns all url`;
  }

  findOne(id: number) {
    return `This action returns a #${id} url`;
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
