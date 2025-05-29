import { Injectable } from '@nestjs/common';
import { CreateZoomDto } from './dto/create-zoom.dto';
import { UpdateZoomDto } from './dto/update-zoom.dto';
import { Socket, DefaultEventsMap } from 'socket.io';

@Injectable()
export class ZoomService {
  handleDisconnect(client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    console.log(`client disconnected: 
      `)
      // ${JSON.stringify(client)}
  }

  handleConnection(client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    console.log(`client connected: 
      `)
      // ${JSON.stringify(client)}
  }

  create(createZoomDto: CreateZoomDto) {
    return 'This action adds a new zoom';
  }

  findAll() {
    return `This action returns all zoom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zoom`;
  }

  update(id: number, updateZoomDto: UpdateZoomDto) {
    return `This action updates a #${id} zoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} zoom`;
  }
}
