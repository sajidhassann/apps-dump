import { Test, TestingModule } from '@nestjs/testing';
import { UserWhatsappTrackingService } from './user-whatsapp-tracking.service';

describe('UserWhatsappTrackingService', () => {
  let service: UserWhatsappTrackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserWhatsappTrackingService],
    }).compile();

    service = module.get<UserWhatsappTrackingService>(UserWhatsappTrackingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
