
import * as pactum from 'pactum';
import { string, int } from 'pactum-matchers';
import { HttpStatus } from '@nestjs/common';
import { CreateRoomOwnerDto } from 'src/room-owners/dto';

const createRoomOwnerDto: CreateRoomOwnerDto = {
  fullname: "John Doe",
  phone: "086333333",
  email: "roomowner@gmail.com",
  contact: "@johndoe",
  room_price: 3000,
  room_location: "Nontaburi",
  room_detail: "No room detail",
  room_condition: "Only for Man"
};

describe('RoomOwner', () => {
  describe('Room Owner Registration', () => {
    it('should be able to register room owner successfully', () => {
      return pactum
        .spec()
        .post('/room-owners/register')
        .withBody(createRoomOwnerDto)
        .expectStatus(HttpStatus.CREATED)
        .expectJsonMatch('data', createRoomOwnerDto)
        .stores('roomOwnerId', 'data.id')
    });

    it('should get new room owner registration as admin', () => {
      return pactum
        .spec()
        .get('/room-owners/{id}')
        .withPathParams('id', '$S{roomOwnerId}')
        .withHeaders({
          Authorization: 'Bearer $S{adminAccessToken}'
        })
        .expectJsonMatch(createRoomOwnerDto)
        .expectStatus(HttpStatus.OK)
    });

    it('should throw error getting the new reservation as non admin', () => {
      return pactum
        .spec()
        .get('/room-owners/{id}')
        .withPathParams('id', '$S{roomOwnerId}')
        .withHeaders({
          Authorization: 'Bearer $S{accessToken-user1}'
        })
        .expectStatus(HttpStatus.FORBIDDEN)
    });
  });

  describe('Get All Room Owners', () => {
    it('should get all room owners as admin', () => {
      return pactum
        .spec()
        .get('/room-owners')
        .withHeaders({
          Authorization: 'Bearer $S{adminAccessToken}'
        })
        .expectJsonMatch({
          data: [
            {
              id: '$S{roomOwnerId}',
              fullname: string(),
              phone: string(),
              room_price: int(),
              ...createRoomOwnerDto
            },
          ]
        })
        .expectJsonLength('data', 1)
        .expectStatus(HttpStatus.OK)
    });

    it('should throw error getting all room owners as non admin', () => {
      return pactum
        .spec()
        .get('/room-owners')
        .withHeaders({
          Authorization: 'Bearer $S{accessToken-user1}'
        })
        .expectStatus(403)
    });
  });
});