
import * as pactum from 'pactum';
import { UserSignUpDto } from 'src/auth/dto';

const dto: UserSignUpDto = {
  email: 'test@gmail.com',
  password: '1112',
  firstName: 'John',
  lastName: 'Doe',
};

describe('Auth', () => {
  describe('Sign up', () => {
    it('should signup', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody(dto)
        .expectStatus(201);
    });

    it('should throw exception if email empty', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          password: dto.password,
        })
        .expectStatus(400);
    });

    it('should throw exception if password empty', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          email: dto.email,
        })
        .expectStatus(400);
    });

    it('should throw exception if no body provided', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody({})
        .expectStatus(400);
    });
  });

  describe('Sign in', () => {
    it('should in', () => {
      return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: dto.email,
          password: dto.password,
        })
        .expectStatus(200)
        .stores('accessTokenAdmin', 'access_token');
    });

    it('should throw exception if email empty', () => {
      return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          password: dto.password,
        })
        .expectStatus(400);
    });

    it('should throw exception if password empty', () => {
      return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: dto.email,
        })
        .expectStatus(400);
    });

    it('should throw exception if no body provided', () => {
      return pactum.spec().post('/auth/signin').withBody({}).expectStatus(400);
    });
  });
});