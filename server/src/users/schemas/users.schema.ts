import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

@Schema({ _id: false })
export class User extends Document {
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @Prop({
    required: true,
    type: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  })
  @IsObject()
  @IsNotEmpty()
  location: {
    lat: number;
    lng: number;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);