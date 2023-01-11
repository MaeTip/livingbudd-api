import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { AdminUserModule } from './admin-user/admin-user.module';

@Module({
  imports: [AuthModule, UserModule, RoomModule, AdminUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
