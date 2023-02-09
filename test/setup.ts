import * as pactum from 'pactum';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppModule } from 'src/app.module';
import { ReservationsController } from 'src/reservations/reservations.controller';
import { AuthService } from 'src/auth/auth.service';

import './handlers';
import { AdminSignUpDto } from 'src/auth/dto';
import { Role } from '@prisma/client';

const port = process.env.PORT || 8081;
let app: INestApplication;
let prisma: PrismaService;
let moduleRef: TestingModule;
let reservationsController: ReservationsController;

export async function initApp(): Promise<INestApplication> {
  moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  reservationsController = moduleRef.get<ReservationsController>(
    ReservationsController,
  );
  jest
    .spyOn(reservationsController, 'sentemail')
    .mockImplementation(() => 'sent email!');

  await app.init();
  await app.listen(port);
  return app;
}

export async function initPrisma() {
  prisma = app.get(PrismaService);
  await prisma.cleanDb();
  return prisma;
}

export function getApp() {
  return app;
}

export function getPrisma() {
  return prisma;
}

export function getModuleRef() {
  return moduleRef;
}

async function createAdminUser() {
  const authService = moduleRef.get<AuthService>(AuthService);
  const adminUser: AdminSignUpDto = {
    email: `admin@livingbudd.com`,
    firstName: `Admin`,
    lastName: `Livingbudd`,
    password: '1234',
    role: Role.ADMIN,
  };
  await authService.adminSignup(adminUser);

  return adminUser;
}

global.beforeAll(async () => {
  app = await initApp();
  prisma = await initPrisma();
  await pactum.request.setBaseUrl(`http://localhost:${port}/api`);

  const adminUser = await createAdminUser();

  await pactum.spec('loginAdminUser', adminUser);
  await pactum.spec('createUser', 'user1');
});

global.afterAll(async () => {
  await app.close();
});
