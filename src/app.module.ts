import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReservationsModule } from './reservations/reservations.module';
import { HealthModule } from './health/health.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { RoomOwnersModule } from './room-owners/room-owners.module';
import appConfig from './config/app.config';
import smtpConfig from './config/smtp.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [appConfig, smtpConfig],
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: process.env.SMTP_DEFAULT_SENDER,
      },
    }),
    PrismaModule,
    HealthModule,
    AuthModule,
    UserModule,
    RoomModule,
    ReservationsModule,
    RoomOwnersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
