import { Test, TestingModule } from '@nestjs/testing';
import { ZoomGateway } from './zoom.gateway';

describe('ZoomGateway', () => {
  let gateway: ZoomGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZoomGateway],
    }).compile();

    gateway = module.get<ZoomGateway>(ZoomGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
