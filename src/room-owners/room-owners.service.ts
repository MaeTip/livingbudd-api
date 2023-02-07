import { Injectable } from '@nestjs/common';
import { CreateRoomOwnerDto } from './dto/create-room-owner.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomOwnerEntity } from './entities/room-owner.entity';
import { UpdateRoomOwnerDto } from './dto';

@Injectable()
export class RoomOwnersService {
  constructor(private prisma: PrismaService) { }

  async create(createRoomOwnerDto: CreateRoomOwnerDto): Promise<{ data: RoomOwnerEntity }> {
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

  async findAll(): Promise<{ data: RoomOwnerEntity[] }> {
    try {
      const result = await this.prisma.roomOwner.findMany();

      return {
        data: result
      }
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<RoomOwnerEntity> {
    try {
      return this.prisma.roomOwner.findFirst({
        where: {
          id
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, dto: UpdateRoomOwnerDto) : Promise<RoomOwnerEntity> {
    try {
      const result = await this.prisma.roomOwner.update({
        where: {
          id,
        },
       data: {
         ...dto,
       }
     });
     return result
   } catch (error) {
     throw error;
   }
  }

}
