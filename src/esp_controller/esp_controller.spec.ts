import { Test, TestingModule } from '@nestjs/testing';
import { EspController } from './esp_controller';

describe('EspControllerController', () => {
  let controller: EspController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EspController],
    }).compile();

    controller = module.get<EspController>(EspController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

