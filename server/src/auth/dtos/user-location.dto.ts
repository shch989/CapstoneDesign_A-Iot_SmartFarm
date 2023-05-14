import { IsNotEmpty, IsNumber } from "class-validator";

export class UserLocationDto {
  @IsNotEmpty()
  @IsNumber()
  lat: number

  @IsNotEmpty()
  @IsNumber()
  lng: number
}