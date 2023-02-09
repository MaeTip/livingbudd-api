import { Body, Param, Get, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorator';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { CreateRoomDto } from './dto';
import { RoomEntity } from './entity/room.entity';
import { RoomService } from './room.service';

@Controller('rooms')
@ApiTags('rooms')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
  ) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<RoomEntity> {
    return this.roomService.create(createRoomDto)
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<RoomEntity> {
    return this.roomService.findOne(+id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll(): Promise<RoomEntity[]> {
    return this.roomService.findAll()
  }
}
