import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class DatabaseService {
  constructor(private prisma: PrismaService) {}

  // Add your database methods here
  async getUser(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  // ... other methods
}
