import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { User } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dtos/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  private readonly googleApiKey = process.env.GOOGLE_API_KEY;
  private readonly weatherstackApiKey = process.env.WEATHER_STACK_API_KEY;

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
      throw new HttpException('Failed to retrieve location data.', 500);
    }
  }

  async getWeather(address: string) {
    try {
      const { lat, lng } = await this.getLatLng(address);
      const url = `http://api.weatherstack.com/current?access_key=${this.weatherstackApiKey}&query=${lat},${lng}`;
      const response = await axios.get(url);
      const data = response.data;
      return data;
    } catch (err) {
      throw new HttpException(err, err.response.status);
    }
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async createUser(registerUserDto: RegisterUserDto) {
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
}
