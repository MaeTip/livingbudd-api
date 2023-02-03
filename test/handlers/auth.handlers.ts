import { handler } from 'pactum';

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
