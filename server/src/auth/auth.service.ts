import {
  HttpException,
  Injectable,
} from '@nestjs/common';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { User } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRegisterDto } from './dtos/user-register.dto';
import { UserLocationDto } from './dtos/user-location.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private readonly googleApiKey = process.env.GOOGLE_API_KEY;
  private readonly weatherstackApiKey = process.env.WEATHER_STACK_API_KEY;

  // 지역명이나 주소지를 입력할 수 GCP를 사용하여 위도와 경도 추출
  async getLatLng(address: string) {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.googleApiKey}`;
      const response = await axios.get(url);
      const data = response.data;
      if (!data || data.status === 'ZERO_RESULTS') {
        throw new HttpException(
          'Could not find location for the specified address.',
          404,
        );
      }
      const coordinates = data.results[0].geometry.location;
      return coordinates;
    } catch (err) {
      throw new HttpException(
        'Failed to retrieve latitude and longitude data for the specified address.',
        400,
      );
    }
  }

  // 위도와 경도를 WeatherStack API를 활용하여 날씨 정보 추출
  async getWeather(userLocationDto: UserLocationDto) {
    try {
      const {lat, lng} = userLocationDto
      const url = `http://api.weatherstack.com/current?access_key=${this.weatherstackApiKey}&query=${lat},${lng}`;
      const response = await axios.get(url);
      const data = response.data;
      return data;
    } catch (err) {
      throw new HttpException(err, err.response.status);
    }
  }

  // Bcrypt를 사용한 비밀번호 해쉬화
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  // 회원가입 정보를 활용하여 name, email, password(hashPassword()), address, location(getLatLng()) 값을 MongoDB에 저장
  async createUser(registerUserDto: UserRegisterDto) {
    try {
      const { name, email, password, address } = registerUserDto;

      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        throw new HttpException('User with this email already exists', 409);
      }
      const hashed = await this.hashPassword(password);
      const location = await this.getLatLng(address);
      const createdUser = await this.userModel.create({
        name,
        email,
        password: hashed,
        address,
        location,
      });
      return createdUser.registerData;
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }

  //
  async findUserData(userId: string) {
    try {
      const user = await this.userModel.findById(userId).exec();
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      return user;
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }
}
