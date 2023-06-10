import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DhtService } from './dht.service';
import { DataDto } from 'src/users/dtos/data.dto';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway(5000, { namespace: 'dht', cors: { origin: '*' } })
export class DhtGateway implements OnGatewayConnection {
  private interval: NodeJS.Timeout | undefined;

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
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      }); // 토큰 검증
      const userId = decodedToken.sub; // 토큰에서 유저 ID 추출
      // 유효한 토큰인 경우 연결 허용
      socket.join(userId); // 유저별로 개별 방에 조인
      if (!this.interval) {
        this.accessData(userId);
        this.interval = setInterval(() => {
          this.updateData(userId);
        }, 60000);
      }
    } catch (err) {
      // 토큰이 유효하지 않을 경우 연결 거부
      console.log('유효하지 않는 토큰입니다.');
      socket.disconnect();
    }
  }

  private async accessData(userId: string) {
    try {
      const sensorData = await this.dhtService.getDhtDataByUserId(userId);
      return this.emitData(userId, sensorData);
    } catch (err) {
      console.error(err);
    }
  }

  private async updateData(userId: string) {
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