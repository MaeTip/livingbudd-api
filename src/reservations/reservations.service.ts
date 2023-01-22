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

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
