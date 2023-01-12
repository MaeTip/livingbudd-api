import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// import { ConfigService } from '@nestjs/config';


@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: "mysql://root:1234567890@localhost:3307/living-budd-development",
                },
            },
        });
    }
}
