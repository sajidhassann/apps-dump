import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationService } from './registration.service';
import { RegistrationRepository as RegistrationRepository } from './repository/registration.repository';
import { ConfigModule } from '@nestjs/config';
import { AppLogger } from '../app.logger';
import { UserToken } from './models/user.token.model';
import { PrismaService } from '../prisma-client/prisma.service';
import { Token } from '@prisma/client';

describe('RegistrationService', () => {
  let repository: RegistrationRepository;
  let service: RegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        AppLogger,
        RegistrationRepository,
        RegistrationService,
        PrismaService,
      ],
    }).compile();

    repository = module.get<RegistrationRepository>(RegistrationRepository);
    service = module.get<RegistrationService>(RegistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should store user token when registering', async () => {
      const spy = jest.spyOn(repository, 'registerToken');

      service.register({ userID: '123', token: '456' } as UserToken);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getTokensForUsers', () => {
    it('should return tokens for users', async () => {
      const userIDs = ['123', '456'];
      const userTokens = [
        {
          userID: '123',
          token: '456',
        },
        {
          userID: '123',
          token: '789',
        },
        {
          userID: '123',
          token: '101',
        },
      ];
      jest
        .spyOn(repository, 'getTokensForUsers')
        .mockImplementation((userIDs: string[]) =>
          Promise.resolve(userTokens as Token[]),
        );

      const result = await service.getTokensForUsers(userIDs);
      expect(result).toHaveLength(userTokens.length);
      expect(result).toBe(userTokens);
    });
  });
});
