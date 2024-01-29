import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { UserRepository } from "./repository/user.repository";
import { PrismaService } from "../prisma-client/prisma.service";

describe("UserService", () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository, PrismaService]
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getUsersWithTokens", () => {
    it("should get all users with tokens", async () => {
      jest
        .spyOn(repository, "getUsersWithTokens")
        .mockImplementation(() =>
          Promise.resolve([{ userID: "123" }, {userID: "321" }])
        );
      const userIDs = await service.getUsersWithTokens()
      expect(userIDs).toHaveLength(2)

    });
  });
});
