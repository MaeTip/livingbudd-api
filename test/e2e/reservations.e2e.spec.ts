
import * as pactum from 'pactum';
import { string } from 'pactum-matchers';
import { Gender, Vehicle } from '@prisma/client';
import { HttpStatus } from '@nestjs/common';
import { CreateReservationDto } from 'src/reservations/dto/create-reservation.dto';
import { UpdateReservationDto } from 'src/reservations/dto/update-reservation.dto';

const dto: CreateReservationDto = {
  email: "test@gmail.com",
  fullname: "Reservation Fullname",
  gender: Gender.FEMALE,
  age: 31,
  phone: "086333333",
  contact: "",
  number_of_tenant: 2,
  has_pet: true,
  air_conditioner_request: true,
  vehicle: Vehicle.CAR,
  working_address: "Nontaburi",
  additional_request: "No additional request"
};

const updateDto: UpdateReservationDto = {
  email: "update@gmail.com",
  fullname: "Update Fullname",
  gender: Gender.MALE,
  age: 40,
  phone: "086-444-4444",
  contact: "update contact",
  number_of_tenant: 3,
  has_pet: false,
  air_conditioner_request: false,
  vehicle: Vehicle.MOTORCYCLE,
  working_address: "Update Nontaburi",
  additional_request: "Update No additional request"
};

describe('Reservation', () => {
  describe('Create and Show New Reservation', () => {
    it('should create reservation', () => {
      return pactum
        .spec()
        .post('/reservations')
        .withBody(dto)
        .expectStatus(201)
        .expectBodyContains(dto.email)
        .expectBodyContains(dto.fullname)
        .expectBodyContains(dto.phone)
        .stores('reservationId', 'data.id')
    });

    it('should get new reservation as admin', () => {
      return pactum
        .spec()
        .get('/reservations/{id}')
        .withPathParams('id', '$S{reservationId}')
        .withHeaders({
          Authorization: 'Bearer $S{adminAccessToken}'
        })
        .expectJsonMatch(dto)
        .expectStatus(HttpStatus.OK)
    });

    it('should throw error getting the new reservation as non admin', () => {
      return pactum
        .spec()
        .get('/reservations/{id}')
        .withPathParams('id', '$S{reservationId}')
        .withHeaders({
          Authorization: 'Bearer $S{accessToken-user1}'
        })
        .expectStatus(HttpStatus.FORBIDDEN)
    });
  });

  describe('Get All Reservation', () => {
    it('should get all reservations as admin', () => {
      return pactum
        .spec()
        .get('/reservations')
        .withHeaders({
          Authorization: 'Bearer $S{adminAccessToken}'
        })
        .expectJsonMatch({
          data: [
            {
              id: '$S{reservationId}',
              fullname: string(),
              phone: string(),
              ...dto
            },
          ]
        })
        .expectJsonLength('data', 1)
        .expectStatus(HttpStatus.OK)
    });

    it('should throw error getting all reservations as non admin', () => {
      return pactum
        .spec()
        .get('/reservations')
        .withHeaders({
          Authorization: 'Bearer $S{accessToken-user1}'
        })
        .expectStatus(403)
    });
  });


  describe('Update Reservation', () => {
    it('should update the reservation as admin', () => {
      return pactum
        .spec()
        .patch('/reservations/{id}')
        .withPathParams('id', '$S{reservationId}')
        .withHeaders({
          Authorization: 'Bearer $S{adminAccessToken}'
        })
        .withBody(updateDto)
        .expectStatus(HttpStatus.OK)
        .expectJsonMatch({
          data: {
            id: '$S{reservationId}',
            ...updateDto
          }
        })
    });

    it('should throw error update reservation as non admin', () => {
      return pactum
        .spec()
        .patch('/reservations/{id}')
        .withPathParams('id', '$S{reservationId}')
        .withHeaders({
          Authorization: 'Bearer $S{accessToken-user1}'
        })
        .expectStatus(403)
    });
  });

  describe('Delete Reservation', () => {
    it('should throw error when delete reservation as non admin', () => {
      return pactum
        .spec()
        .delete('/reservations/{id}')
        .withPathParams('id', '$S{reservationId}')
        .withHeaders({
          Authorization: 'Bearer $S{accessToken-user1}'
        })
        .expectStatus(403)
    });

    it('should delete the reservation as admin', () => {
      return pactum
        .spec()
        .delete('/reservations/{id}')
        .withPathParams('id', '$S{reservationId}')
        .withHeaders({
          Authorization: 'Bearer $S{adminAccessToken}'
        })
        .expectJsonMatch({
          data: {
            id: '$S{reservationId}'
          },
        })
        .expectStatus(HttpStatus.OK).inspect()
    });
  });

});