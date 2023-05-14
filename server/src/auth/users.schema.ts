import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
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

  readonly registerData: {
    id: string;
    email: string;
    name: string;
    address: string;
    location: object;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('registerData').get(function (this: User) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    address: this.address,
    location: {
      lat: this.location.lat,
      lng: this.location.lng,
    },
  };
});
