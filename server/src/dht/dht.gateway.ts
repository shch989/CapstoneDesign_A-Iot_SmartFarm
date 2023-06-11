import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DhtService } from './dht.service';
import { DataDto } from 'src/users/dtos/data.dto';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway(5000, { namespace: 'dht', cors: { origin: '*' } })
export class DhtGateway implements OnGatewayConnection, OnGatewayDisconnect {

  private intervalMap: Map<string, NodeJS.Timeout> = new Map();

  constructor(
    private readonly dhtService: DhtService,
    private readonly jwtService: JwtService,
  ) { }

  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
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
      socket.join(userId); // 유저별로 개별 방에 조인
      this.startUpdateData(userId);
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
        this.updateDhtData(userId);
      }, 60000);
      this.intervalMap.set(userId, interval);
      this.updateDhtData(userId); // 첫 번째 호출을 추가합니다.
    }
  }

  private async updateDhtData(userId: string) {
    try {
      const temperatureData = await this.dhtService.getTemperature();
      const humidityData = await this.dhtService.getHumidity();

      const userData = await this.dhtService.getDhtDataByUserId(userId);

      userData.sensor.temperature.push(temperatureData);
      userData.sensor.humidity.push(humidityData);

      if (userData.sensor.temperature.length > 10) {
        userData.sensor.temperature.shift();
      }

      if (userData.sensor.humidity.length > 10) {
        userData.sensor.humidity.shift();
      }

      const updatedData = await this.dhtService.updateDhtDataByUserId(
        userId,
        userData.sensor.temperature,
        userData.sensor.humidity,
      );

      return this.emitData(userId, updatedData);
    } catch (err) {
      console.error(err);
    }
  }

  private emitTemperatureData(userId: string, temperature: number[]) {
    this.server.to(userId).emit('temperatureData', temperature);
    console.log('temperature', temperature);
  }

  private emitHumidityData(userId: string, humidity: number[]) {
    this.server.to(userId).emit('humidityData', humidity);
    console.log('humidity', humidity);
  }

  private emitData(userId: string, userData: DataDto) {
    this.emitTemperatureData(userId, userData.sensor.temperature);
    this.emitHumidityData(userId, userData.sensor.humidity);
  }
} 