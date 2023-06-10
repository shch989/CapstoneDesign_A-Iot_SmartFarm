import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WeatherService } from './weather.service';
import { DataDto } from 'src/users/dtos/data.dto';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway(5000, { namespace: 'weather', cors: { origin: '*' } })
export class WeatherGateway implements OnGatewayConnection {
  private interval: NodeJS.Timeout | undefined;

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
      const decodedToken = this.jwtService.verify(token, { 
        secret: process.env.JWT_SECRET_KEY 
      }); // 토큰 검증
      const userId = decodedToken.sub; // 토큰에서 유저 ID 추출
      // 유효한 토큰인 경우 연결 허용
      if (!this.interval) {
        this.updateWeatherData(userId);
        this.interval = setInterval(() => {
          this.updateWeatherData(userId);
        }, 3600000);
      }
    } catch (err) {
      // 토큰이 유효하지 않을 경우 연결 거부
      console.log('유효하지 않는 토큰입니다.');
      socket.disconnect();
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