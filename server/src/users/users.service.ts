import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
// dto
import { UserRegisterDto } from './dtos/user-register.dto';
// model
import { User } from 'src/users/schemas/users.schema';
// service
import { AuthService } from 'src/auth/auth.service';
import { UsersRepository } from './users.repository';
import { DhtService } from 'src/dht/dht.service';
import { WeatherService } from 'src/weather/weather.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly authService: AuthService,
    private readonly userRepository: UsersRepository,
    private readonly dhtService: DhtService,
    private readonly weatherService: WeatherService
  ) { }

  private readonly googleApiKey = process.env.GOOGLE_API_KEY;

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
      throw new HttpException(err.message, err.status || 500);
    }
  }

  // 회원가입 정보를 활용하여 name, email, password(hashPassword()), address, location(getLatLng()) 값을 MongoDB에 저장
  async createUser(registerUserDto: UserRegisterDto) {
    try {
      const { name, email, password, address } = registerUserDto;

      const existingUser = await this.userRepository.existsByEmail(email);
      if (existingUser) {
        throw new HttpException('User with this email already exists', 409);
      }
      const hashed = await this.authService.hashPassword(password);
      const location = await this.getLatLng(address);
      const createdUser = await this.userModel.create({
        name,
        email,
        password: hashed,
        address,
        location, 
      });
      await this.dhtService.createDhtData(createdUser.id)
      await this.weatherService.createWeatherData(createdUser.id)
      return createdUser.registerData;
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }
}
