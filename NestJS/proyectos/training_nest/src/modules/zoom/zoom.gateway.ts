import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { ZoomService } from './zoom.service';
import { Socket } from "socket.io"
 

@WebSocketGateway({ cors: true })
export class ZoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor( private readonly zoomService: ZoomService ) {}


  // * Este es el decorador suscriptor de eventos para recibir las señales del websocket
  @SubscribeMessage('payload')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket
  ): string {
    console.clear();
    console.log(data);
    return data;
  }
  
  handleConnection(client: Socket, ...args: any[]) {
    this.zoomService.handleConnection(client);
  }
  handleDisconnect(client: Socket) {
    this.zoomService.handleDisconnect(client);
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
