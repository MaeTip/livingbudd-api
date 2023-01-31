import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoomOwnerDto } from './dto/create-room-owner.dto';
import { RoomOwnersService } from './room-owners.service';

@Controller('room-owners')
@ApiTags('RoomOwners')
export class RoomOwnersController {
  constructor(
    private readonly roomOwnersService: RoomOwnersService, 
  ) { }

  @Post('register')
  register(@Body() createRoomOwnerDto: CreateRoomOwnerDto) {
    return this.roomOwnersService.create(createRoomOwnerDto)
  }
}
