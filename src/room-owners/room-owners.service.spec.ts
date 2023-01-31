import { Test, TestingModule } from '@nestjs/testing';
import { RoomOwnerService } from './room-owners.service';

describe('RoomOwnerService', () => {
  let service: RoomOwnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomOwnerService],
    }).compile();

    service = module.get<RoomOwnerService>(RoomOwnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
