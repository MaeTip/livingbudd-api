import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto';
import { RoomEntity } from './entity/room.entity';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) { }

  async create(createRoomDto: CreateRoomDto): Promise<RoomEntity> {
    try {
      const result = await this.prisma.room.create({
        data: {
          ...createRoomDto
        }
      });

      return result;      
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number): Promise<RoomEntity> {
    try {
      return this.prisma.room.findFirst({
        where: {
          id
        }
      })
    } catch (error) {
      throw error
    }
  }


  async findAll(): Promise<RoomEntity[]> {
    try {
      return this.prisma.room.findMany()
    } catch (error) {
      throw error
    }
  }

}
