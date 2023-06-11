import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WeatherService } from './weather.service';
import { DataDto } from 'src/users/dtos/data.dto';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway(5000, { namespace: 'weather', cors: { origin: '*' } })
export class WeatherGateway implements OnGatewayConnection {
  private intervalMap: Map<string, NodeJS.Timeout> = new Map();

  constructor(
    private readonly weatherService: WeatherService,
    private readonly jwtService: JwtService,
  ) { }

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    const token = socket.handshake.auth.token;
    if (!token) {
      // 토큰이 없을 경우 연결 거부
      console.log('로그인이 되어있지 않습니다.');
      socket.disconnect();
      return;
    }

    try {
      const userId = this.getUserIdFromSocket(socket); // 유저 ID 추출
      if (!userId) {
        // 유효한 유저 ID가 없을 경우 연결 거부
        console.log('유효한 유저 ID가 없습니다.');
        socket.disconnect();
        return;
      }
      // 유효한 토큰인 경우 연결 허용
      socket.join(userId);
      this.startUpdateData(userId)
    } catch (err) {
      // 토큰이 유효하지 않을 경우 연결 거부
      console.log('유효하지 않는 토큰입니다.');
      socket.disconnect();
    }
  }

  handleDisconnect(socket: Socket) {
    const userId = this.getUserIdFromSocket(socket);
    if (userId && this.intervalMap.has(userId)) {
      clearInterval(this.intervalMap.get(userId));
      this.intervalMap.delete(userId);
    }
  }

  private getUserIdFromSocket(socket: Socket): string | undefined {
    // 소켓에서 유저 ID를 추출하는 로직을 구현해야 합니다.
    // 예시로서는 토큰에서 유저 ID를 추출하는 것으로 가정합니다.
    const token = socket.handshake.auth.token;
    if (token) {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      return decodedToken.sub;
    }
    return undefined;
  }

  private async startUpdateData(userId: string) {
    if (!this.intervalMap.has(userId)) {
      const interval = setInterval(() => {
        this.updateWeatherData(userId);
      }, 3600000);
      this.intervalMap.set(userId, interval);
      this.updateWeatherData(userId); // 첫 번째 호출을 추가합니다.
    }
  }

  private async updateWeatherData(userId: string) {
    try {
      const weatherData = await this.weatherService.saveWeatherData(userId)
      this.emitWeatherData(weatherData)

    } catch (err) {
      console.error(err);
    }
  }

  private emitWeatherData(userData: DataDto) {
    this.server.emit('weatherData', userData);
    console.log('weather', userData)
  }
}