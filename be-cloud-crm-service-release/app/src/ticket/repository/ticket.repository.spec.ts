import { Test } from '@nestjs/testing';
import {
  PrismaClient,
  RecipientType,
  TicketMessage,
  TicketMode,
  TicketStatus,
} from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../../database/prisma.service';
import { TicketRepository } from './ticket.repository';

describe(`TicketRepository`, () => {
  let ticketRepository: TicketRepository;
  let prismaService: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TicketRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    ticketRepository = moduleRef.get(TicketRepository);
    prismaService = moduleRef.get(PrismaService);
  });

  describe(`TICKET`, () => {
    it(`should create a new ticket`, () => {
      const mockedTicket = {
        id: '361fbf5c-e1dd-4f60-9ce4-8f74af7eaa2f',
        username: 'Umer Nasir',
        is_read: false,
        status: TicketStatus.PENDING,
        number: '923482498343',
        mode: TicketMode.CHAT_BOT,
      };

      // prismaService.ticket.create.mockResolvedValue(mockedTicket);

      expect(ticketRepository.createTicket(mockedTicket)).resolves.toBe(
        mockedTicket,
      );
    });

    it(`should get a ticket`, () => {
      const mockedTicket = {
        id: '361fbf5c-e1dd-4f60-9ce4-8f74af7eaa2f',
        username: 'Umer Nasir',
        is_read: false,
        status: TicketStatus.PENDING,
        number: '923482498343',
        mode: TicketMode.CHAT_BOT,
      };

      // prismaService.ticket.findUniqueOrThrow.mockResolvedValue(mockedTicket);

      expect(ticketRepository.getTicket(mockedTicket.id)).resolves.toBe(
        mockedTicket,
      );
    });

    it(`should update a ticket`, () => {
      const mockedTicket = {
        id: '361fbf5c-e1dd-4f60-9ce4-8f74af7eaa2f',
        username: 'Umer Nasir',
        is_read: false,
        status: TicketStatus.PENDING,
        number: '923482498343',
        mode: TicketMode.CHAT_BOT,
      };

      // prismaService.ticket.update.mockResolvedValue(mockedTicket);
      //
      // expect(ticketRepository.updateTicket(mockedTicket)).resolves.toBe(
      //   mockedTicket,
      // );
    });

    it(`should create a new ticket message`, () => {
      const mockedTicketMessage = {
        id: '361fbf5c-e1dd-4f60-9ce4-8f74af7eaa2f',
        ticketID: '361fbf5c-e1dd-4f60-9ce4-8f74af7eaa2a',
        recipientID: '361fbf5c-e1dd-4f60-9ce4-8f74af7eaa2x',
        status: TicketStatus.CLOSED,
        content: 'Good Message...',
        mimeType: 'jpeg',
        mediaURL: 'https://',
        metaID: 'a',
        type: RecipientType.AGENT,
        isRead: true,
      } as unknown as TicketMessage;

      prismaService.ticketMessage.create.mockResolvedValue(mockedTicketMessage);

      expect(
        ticketRepository.createTicketMessage(mockedTicketMessage),
      ).resolves.toBe(mockedTicketMessage);
    });

    it(`should retrieve ticket messages`, () => {
      prismaService.ticketMessage.findMany.mockResolvedValue([]);

      expect(
        ticketRepository.listTicketMessageByTicket(
          '361fbf5c-e1dd-4f60-9ce4-8f74af7eaa2f',
        ),
      ).resolves.toStrictEqual([]);
    });

    it(`should retrieve all read tickets`, () => {
      prismaService.ticket.findMany.mockResolvedValue([]);

      expect(
        ticketRepository.listTicketsByIncludedStatusesByMode(
          [TicketStatus.PENDING],
          TicketMode.AGENT,
        ),
      ).resolves.toStrictEqual([]);
    });

    it(`should retrieve all read tickets`, () => {
      prismaService.ticket.findMany.mockResolvedValue([]);

      expect(
        ticketRepository.listTicketsByIncludedStatusesByMode(
          [TicketStatus.PENDING],
          TicketMode.AGENT,
        ),
      ).resolves.toStrictEqual([]);
    });
  });
});
