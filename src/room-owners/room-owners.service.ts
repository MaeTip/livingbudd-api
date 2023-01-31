import { Injectable } from '@nestjs/common';
import { CreateRoomOwnerDto } from './dto/create-room-owner.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomOwnersService {
  constructor (private prisma: PrismaService) {}

  async create(createRoomOwnerDto: CreateRoomOwnerDto) {
    try {
       const result = await this.prisma.roomOwner.create({
        data: {
          ...createRoomOwnerDto,
        }
      });
      return {
        data: result
      }
    } catch (error) {
      throw error;
    }
  }
}
