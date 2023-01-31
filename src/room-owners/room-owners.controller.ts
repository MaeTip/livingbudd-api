import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
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

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.roomOwnersService.findAll()
  }
}
