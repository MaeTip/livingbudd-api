import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('app.databaseUrl'),
        },
      },
    });
  }

  cleanDb() {
    return this.$transaction([
      this.user.deleteMany(),
      this.reservation.deleteMany()
    ]);
  }
}