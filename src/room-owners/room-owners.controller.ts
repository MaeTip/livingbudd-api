import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { CreateRoomOwnerDto, UpdateRoomOwnerDto } from './dto';
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
  register(@Body() createRoomOwnerDto: CreateRoomOwnerDto): Promise<{ data: RoomOwnerEntity }> {
    return this.roomOwnersService.create(createRoomOwnerDto)
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOkResponse({ type: RoomOwnerEntity })
  @Get()
  findAll(): Promise<{ data: RoomOwnerEntity[] }> {
    return this.roomOwnersService.findAll()
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOkResponse({ type: RoomOwnerEntity })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<RoomOwnerEntity> {
    return this.roomOwnersService.findOne(+id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOkResponse({ type: RoomOwnerEntity })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomOwnerDto: UpdateRoomOwnerDto) {
    return this.roomOwnersService.update(+id, updateRoomOwnerDto)
  }
}
