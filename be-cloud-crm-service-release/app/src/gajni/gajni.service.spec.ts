import { Test, TestingModule } from '@nestjs/testing';
import { GajniService } from './gajni.service';

describe('OtpService', () => {
  let service: GajniService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GajniService],
    }).compile();

    service = module.get<GajniService>(GajniService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
