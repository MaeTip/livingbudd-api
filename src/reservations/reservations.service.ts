import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(createReservationDto: CreateReservationDto) {
    try {
       const result = await this.prisma.reservation.create({
        data: {
          ...createReservationDto,
        }
      });
      return {
        data: result
      }
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const result =  await this.prisma.reservation.findMany();

      return {
        data: result
      }
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return this.prisma.reservation.findFirst({
        where: {
          id
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    try {
      const result = await this.prisma.reservation.update({
        where: {
          id,
        },
       data: {
         ...updateReservationDto,
       }
     });
     return {
       data: result
     }
   } catch (error) {
     throw error;
   }
  }

  async remove(id: number) {
    await this.prisma.reservation.delete({
      where: {
        id: id,
      },
    });

    return {
      data: {
        id
      }
    }
  }
}
