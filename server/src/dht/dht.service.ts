import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dhtSensor from 'node-dht-sensor';
import { Model } from 'mongoose';
import { DhtSensorDto } from './dtos/dht-sensor.dto';
import { Data } from 'src/users/schemas/data.schema';


@Injectable()
export class DhtService {
  constructor(
    @InjectModel(Data.name) private dataModel: Model<Data>,
  ) { }

  // DHT22 센서에서 온도 값을 가져오는 서비스
  async getTemperature(): Promise<number> {
    const sensorType = 22;
    const pin = 4;
    try {
      const data = dhtSensor.read(sensorType, pin);
      const temperature = parseFloat(data.temperature.toFixed(2));
      return temperature
    } catch (err) {
      throw new HttpException(err.message, err.status || 500)
    }
  }

  // DHT22 센서에서 습도 값을 가져오는 서비스
  async getHumidity(): Promise<number> {
    const sensorType = 22;
    const pin = 4;
    try {
      const data = dhtSensor.read(sensorType, pin);
      const humidity = parseFloat(data.humidity.toFixed(2));
      return humidity;
    } catch (err) {
      throw new HttpException(err.message, err.status || 500)
    }
  }

  // 신규 유저의 DHT22 센서 기본 데이터 DB 생성
  async createDhtData(): Promise<DhtSensorDto> {
    const temperature = [null, null, null, null, null, null, null, null, null, null];
    const humidity = [null, null, null, null, null, null, null, null, null, null];

    const dhtData = {
      temperature,
      humidity
    }

    return dhtData;
  }

  // 유저 Id를 통해 해당 유저의 온습도 데이터를 DB에서 가져옴
  async getDhtDataByUserId(id: string): Promise<DhtSensorDto> {
    const userData = await this.dataModel.findById(id).exec();
    const { temperature, humidity } = userData.sensor
    const dhtData = { temperature, humidity }

    return dhtData;
  }

  // 유저 Id를 통해 현재 온습도 데이터를 DB에 저장
  async updateDhtDataByUserId(
    id: string,
    temperature: number[],
    humidity: number[]
  ): Promise<Data> {
    const userData = await this.dataModel.findOneAndUpdate(
      { id },
      { temperature: [...temperature], humidity: [...humidity] },
      { new: true, upsert: true }
    ).exec();

    if (!userData) {
      throw new NotFoundException(`DHT data for user ID ${id} not found`);
    }

    return userData;
  }
}