import { Test, TestingModule } from '@nestjs/testing';
import { RoomOwnerController } from './room-owners.controller';

describe('RoomOwnerController', () => {
  let controller: RoomOwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomOwnerController],
    }).compile();

    controller = module.get<RoomOwnerController>(RoomOwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
