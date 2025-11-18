import { Test, TestingModule } from "@nestjs/testing";
import { MyListController } from "./myList.controller";
import { MyListService } from "./myList.service";

describe("MyListController", () => {
  let controller: MyListController;
  let myListService: jest.Mocked<MyListService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyListController],
      providers: [
        {
          provide: MyListService,
          useValue: {
            getMyList: jest.fn(),
            removeFromMyList: jest.fn(),
            addToMyList: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MyListController>(MyListController);
    myListService = module.get(MyListService);
  });

  it("should return my list for the user", async () => {
    const userId = "user-123";
    const mockList = [{ itemId: "item-1" }] as any;
    myListService.getMyList.mockResolvedValue(mockList);

    const result = await controller.getMyList(userId, {});

    expect(myListService.getMyList).toHaveBeenCalledWith(userId, {});
    expect(result).toBe(mockList);
  });

  it("should remove item from my list", async () => {
    const params = { itemId: "item-1" } as any;
    const userId = "user-123";
    const mockResponse = { success: true } as any;
    myListService.removeFromMyList.mockResolvedValue(mockResponse);

    const result = await controller.removeFromMyList(params, userId);

    expect(myListService.removeFromMyList).toHaveBeenCalledWith(params, userId);
    expect(result).toBe(mockResponse);
  });

  it("should add item to my list", async () => {
    const userId = "user-123";
    const dto = { itemId: "item-1" } as any;
    const mockResponse = { success: true } as any;
    myListService.addToMyList.mockResolvedValue(mockResponse);

    const result = await controller.addToMyList(userId, dto);

    expect(myListService.addToMyList).toHaveBeenCalledWith(userId, dto);
    expect(result).toBe(mockResponse);
  });
});
