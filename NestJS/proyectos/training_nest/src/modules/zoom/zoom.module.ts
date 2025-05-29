import { Module } from '@nestjs/common';
import { ZoomService } from './zoom.service';
import { ZoomController } from './zoom.controller';
import { ZoomGateway } from './zoom.gateway';

@Module({
  controllers: [ZoomController],
  providers: [ZoomService, ZoomGateway],
})
export class ZoomModule {}
