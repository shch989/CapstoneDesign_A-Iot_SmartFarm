import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dhtSensor from 'node-dht-sensor';
import { Dht } from './schemas/dht.schema';
import { Model } from 'mongoose';
import { DhtSensorDto } from './dtos/dht-sensor.dto';


@Injectable()
export class DhtService {
  constructor(
    @InjectModel(Dht.name) private dhtModel: Model<Dht>,
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

  // 신규 유저 Id로 연동된 DHT22 센서 기본 데이터 DB 생성
  async createDhtData(userId: string): Promise<DhtSensorDto> {
    const humidity = [0, 0, 0, 0, 0];
    const temperature = [0, 0, 0, 0, 0];

    const dhtData = new this.dhtModel({
      userId,
      humidity,
      temperature,
    });

    return dhtData.save();
  }

  // 유저 Id를 통해 해당 유저의 온습도 데이터를 DB에서 가져옴
  async getDhtDataByUserId(userId: string): Promise<Dht> {
    const dhtData = await this.dhtModel.findOne({ id: userId }).exec();
    if (!dhtData) {
      throw new NotFoundException('Not Found User.');
    }
    return dhtData;
  }

  // 유저 Id를 통해 현재 온습도 데이터를 DB에 저장
  async updateDhtDataByUserId(
    userId: string,
    temperature: number[],
    humidity: number[]
  ): Promise<Dht> {
    const dhtData = await this.dhtModel.findOneAndUpdate(
      { id: userId },
      { temperature: [...temperature], humidity: [...humidity] },
      { new: true, upsert: true }
    ).exec();

    if (!dhtData) {
      throw new NotFoundException(`DHT data for user ID ${userId} not found`);
    }

    return dhtData;
  }
}