import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { DhtService } from './dht.service';
import { Server } from 'socket.io';

@WebSocketGateway(5000, { namespace: 'dht', cors: { origin: '*' } })
export class DhtGateway implements OnGatewayConnection {

  constructor(private readonly dhtService: DhtService) { }

  @WebSocketServer()
  server: Server;

  private temperatureArray: number[] = [];
  private humidityArray: number[] = [];

  handleConnection() {
    setInterval(async () => {
      try {
        const temperature = await this.dhtService.getTemperature();
        this.temperatureArray.push(temperature);

        const humidity = await this.dhtService.getHumidity();
        this.humidityArray.push(humidity)

        if (this.temperatureArray.length > 5) {
          this.temperatureArray.shift();
        }

        if (this.humidityArray.length > 5) {
          this.humidityArray.shift();
        }

        this.server.emit('temperatureData', this.temperatureArray);
        this.server.emit('humidityData', this.humidityArray);
      } catch (err) {
        console.error(err);
      }
    }, 500);
  }
}