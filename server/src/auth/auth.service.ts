import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
import * as bcrypt from 'bcrypt';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService) {}

  private readonly geocodingApiUrl =
    'https://maps.googleapis.com/maps/api/geocode/json';
  private readonly openWeatherApiKey = process.env.OPENWEATHER_API_KEY;
  private readonly saltRounds = 10;

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async getLatLng(address: string): Promise<any> {
    const response: AxiosResponse = await this.httpService
      .get(this.geocodingApiUrl, {
        params: {
          address,
          key: 'YOUR_API_KEY_HERE', // replace with your Geocoding API key
        },
      })
      .toPromise();

    if (response.data.status === 'OK') {
      return response.data.results[0].geometry.location;
    } else {
      throw new Error('Geocoding failed');
    }
  }

  getWeather(latitude: number, longitude: number): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.openWeatherApiKey}`;

    return this.httpService.get(url).pipe(
      map((response) => {
        const data = response.data;
        return {
          location: data.name,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          description: data.weather[0].description,
        };
      }),
    );
  }
}
