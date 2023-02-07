import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { CreateRoomOwnerDto } from './dto/create-room-owner.dto';
import { RoomOwnersService } from './room-owners.service';
import { RoomOwnerEntity } from './entities/room-owner.entity'
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator';
import { Role } from '@prisma/client';

@Controller('room-owners')
@ApiTags('RoomOwners')
export class RoomOwnersController {
  constructor(
    private readonly roomOwnersService: RoomOwnersService, 
  ) { }

  @Post('register')
  @ApiCreatedResponse({ type: RoomOwnerEntity })
  register(@Body() createRoomOwnerDto: CreateRoomOwnerDto) : Promise<{data: RoomOwnerEntity} > {
    return this.roomOwnersService.create(createRoomOwnerDto)
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() : Promise<{data: RoomOwnerEntity[]}> {
    return this.roomOwnersService.findAll()
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomOwnersService.findOne(+id);
  }
}
