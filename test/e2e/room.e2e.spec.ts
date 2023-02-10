import * as pactum from 'pactum';
import { HttpStatus } from '@nestjs/common';
import { CreateRoomDto } from 'src/module/room/dto';
import { faker } from '@faker-js/faker';
import { AmenityList, FacilityList } from 'src/module/room/entity/room.entity';

const generateRoomData = (): CreateRoomDto => {
  return {
    name: faker.name.fullName(),
    address: faker.address.streetAddress(),
    google_map: faker.address.streetAddress(),
    building: faker.address.buildingNumber(),
    floor: faker.datatype.number({ min: 1, max: 20 }).toString(),
    size: faker.datatype.number({ min: 24, max: 100 }),
    number_of_bedroom: faker.datatype.number(2),
    number_of_bathroom: faker.datatype.number(2),
    maintenance_fee: faker.datatype.number({ min: 1000, max: 10000 }),
    amenities: faker.helpers.arrayElements(AmenityList, 3).toString(),
    facilities: faker.helpers.arrayElements(FacilityList, 3).toString(),
    nearby_area: faker.lorem.sentence(),
    detail: faker.lorem.sentence(),
    is_created_by_owner: false,
    rental_price: faker.datatype.number({ min: 1000, max: 10000 }),
    rental_deposit: faker.datatype.number(2),
    rental_advance_payment: faker.datatype.number(2),
  };
};

const createRoomDto: CreateRoomDto = generateRoomData();

describe('Room E2E', () => {
  describe('Create Room', () => {
    describe('As Admin Role', () => {
      it('should create room succesfully ', () => {
        return pactum
          .spec()
          .post('/rooms')
          .withHeaders({
            Authorization: 'Bearer $S{adminAccessToken}',
          })
          .withBody(createRoomDto)
          .expectStatus(HttpStatus.CREATED)
          .expectJsonMatch({
            ...createRoomDto,
          })
          .stores('roomId', 'id');
      });

      it('should get new room successfully', () => {
        return pactum
          .spec()
          .get('/rooms/{id}')
          .withPathParams('id', '$S{roomId}')
          .withHeaders({
            Authorization: 'Bearer $S{adminAccessToken}',
          })
          .expectJsonMatch(createRoomDto)
          .expectStatus(HttpStatus.OK);
      });
    });

    describe('As Non Admin Role', () => {
      it('should throw error getting the new room as non admin', () => {
        return pactum
          .spec()
          .get('/rooms/{id}')
          .withPathParams('id', '$S{roomId}')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken-user1}',
          })
          .expectStatus(HttpStatus.FORBIDDEN);
      });
    });
  });

  describe('Get All Room', () => {
    describe('As Admin Role', () => {
      it('should get all rooms successfully', () => {
        return pactum
          .spec()
          .get('/rooms')
          .withHeaders({
            Authorization: 'Bearer $S{adminAccessToken}',
          })
          .expectJsonMatch([createRoomDto])
          .expectJsonLength(1)
          .expectStatus(HttpStatus.OK)
          .inspect();
      });
    });

    describe('As Non Admin Role', () => {
      it('should throw error getting all room as non admin', () => {
        return pactum
          .spec()
          .get('/rooms')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken-user1}',
          })
          .expectStatus(HttpStatus.FORBIDDEN);
      });
    });
  });
});
