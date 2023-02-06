import { handler } from 'pactum';
import { UserSignUpDto } from 'src/auth/dto';
import { v4 as uuidv4 } from 'uuid';

handler.addSpecHandler('createUser', (ctx) => {
  const { spec, data } = ctx;
  const user: UserSignUpDto = {
    email: `${uuidv4()}@nest.com`,
    password: '123',
    firstName: `Name ${uuidv4()}`,
    lastName: `Lastname ${uuidv4()}`,
  };

  spec
    .post('/auth/signup')
    .withBody(user)
    .stores(`accessToken-${data}`, 'access_token')
    .stores(`userId-${data}`, 'user_id');
});

handler.addSpecHandler('loginAdminUser', (ctx) => {
  const { spec, data } = ctx;
  spec
    .post('/auth/signin')
    .withBody({
      email: data.email,
      password: data.password,
    })
    .stores(`adminAccessToken`, 'access_token');
});
