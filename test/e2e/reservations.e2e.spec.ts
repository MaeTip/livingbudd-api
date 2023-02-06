
import { Gender, Vehicle } from '@prisma/client';
import * as pactum from 'pactum';
import { CreateReservationDto } from 'src/reservations/dto/create-reservation.dto';

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

describe('Reservation', () => {
  describe('Create Reservation', () => {
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

    it('should get new reservation', () => {
      return pactum
        .spec()
        .get('/reservations/{id}')
        .withPathParams('id', '$S{reservationId}')
        .expectStatus(200)
        .withHeaders({
          Authorization: 'Bearer $S{adminAccessToken}'
        })
    });

    it('should throw error getting the new reservation rooms as non admin', () => {
      return pactum
        .spec()
        .get('/reservations/{id}')
        .withPathParams('id', '$S{reservationId}')
        .expectStatus(200)
        .withHeaders({
          Authorization: 'Bearer $S{accessToken-user1}'
        })
    });
  });

});