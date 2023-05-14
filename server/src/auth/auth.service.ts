import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  private readonly googleApiKey = process.env.GOOGLE_API_KEY;
  private readonly weatherstackApiKey = process.env.WEATHER_STACK_API_KEY;
  private readonly saltRounds = 10;

  async getLatLng(address: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.googleApiKey}`;
    const response = await axios.get(url);
    const data = response.data;
    if (!data || data.status === 'ZERO_RESULTS') {
      throw new NotFoundException(
        'Could not find location for the specified address.',
      );
    }
    const coordinates = data.results[0].geometry.location;
    return coordinates;
  }

  async getWeather(address: string) {
    const {lat, lng} = await this.getLatLng(address)
    const url = `http://api.weatherstack.com/current?access_key=${this.weatherstackApiKey}&query=${lat},${lng}`;
    const response = await axios.get(url);
    const data = response.data;
    return data;
  }

  // async hashPassword() {
  //   const salt = await bcrypt.genSalt();
  //   const password = await bcrypt.hash(password, salt);
  // }
}
