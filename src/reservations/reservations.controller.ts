import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailerService } from '@nestjs-modules/mailer';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtGuard } from 'src/auth/guard';
import { ConfigService } from '@nestjs/config';

@Controller('reservations')
@ApiTags('Reservations')
export class ReservationsController {
  constructor(
    private readonly reservationsService: ReservationsService, 
    private readonly mailerService: MailerService, 
    private config: ConfigService
  ) { }

  sentemail(data: CreateReservationDto) {
    if (data) {
      this.mailerService
        .sendMail({
          to: this.config.get('smtp.defaultReceiver'),
          subject: `New reservation from ${data.fullname}, ${data.phone}`,
          html: `
            You have new reservation requeseted from livingbudd.com <br /><br />
            FirstName: ${data.fullname} <br />
            Phone: ${data.phone} <br />
          `,
        })
        .then(() => {
          console.log('sent success!!')
        })
        .catch((e) => {
          console.log('sent failed!!', e)
        });
    }
  }

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    const result = this.reservationsService.create(createReservationDto);

    result.then((value) => {
      this.sentemail(value.data)
    })

    return result
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}
