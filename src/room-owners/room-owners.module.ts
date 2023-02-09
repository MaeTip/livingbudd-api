import { Module } from '@nestjs/common';
import { RoomOwnersController } from './room-owners.controller';
import { RoomOwnersService } from './room-owners.service';

@Module({
  providers: [RoomOwnersService],
  controllers: [RoomOwnersController],
})
export class RoomOwnersModule {}
