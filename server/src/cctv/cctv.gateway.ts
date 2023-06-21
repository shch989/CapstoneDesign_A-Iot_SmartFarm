import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CctvService } from './cctv.service';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway(5000, { namespace: 'cctv', cors: { origin: '*' } })
export class CctvGateway implements OnGatewayConnection, OnGatewayDisconnect {

  private intervalMap: Map<string, NodeJS.Timeout> = new Map();

  constructor(
    private cctvService: CctvService,
    private readonly jwtService: JwtService
  ) { }

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const userId = this.getUserIdFromSocket(client);

    // 연결이 확립되면 최초의 이미지 목록을 보내줌
    const images = await this.cctvService.showAllImages(userId);
    client.emit('imageList', images);

    // Flask 백엔드에서 processImage에 요청을 보낼 때마다 이미지 정보를 리액트에 실시간으로 전송
    client.on('processImage', async () => {
      const newImages = await this.cctvService.showAllImages(userId);
      client.emit('imageList', newImages);
    });
  }

  handleDisconnect(socket: Socket) {
    const userId = this.getUserIdFromSocket(socket);
    if (userId && this.intervalMap.has(userId)) {
      clearInterval(this.intervalMap.get(userId));
      this.intervalMap.delete(userId);
    }
  }

  private getUserIdFromSocket(socket: Socket): string | undefined {
    const token = socket.handshake.auth.token;
    if (token) {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      return decodedToken.sub;
    }
    return undefined;
  }
}
