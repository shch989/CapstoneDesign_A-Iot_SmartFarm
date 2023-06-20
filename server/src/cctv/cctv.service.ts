import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UsersRepository } from 'src/users/users.repository';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import * as path from 'path';

@Injectable()
export class CctvService {
  constructor( private usersRepository: UsersRepository ) { }

  async processImage(file: Express.Multer.File, userId: string): Promise<any> {
    try {
      const { buffer, originalname } = file;
      const fileExtension = originalname.split('.').pop().toLowerCase();
      const validExtensions = ['jpg', 'jpeg', 'png'];

      if (!validExtensions.includes(fileExtension)) {
        throw new Error(
          'Invalid file format. Only JPEG, JPG, and PNG formats are allowed.',
        );
      }

      const binaryImageName = uuid();
      const imageName = `image-${binaryImageName}.${fileExtension}`;

      const outputFileName = path.join('images', imageName);
      const outputFilePath = path.join(__dirname, '..', '..', outputFileName);

      const imagesDir = path.join(__dirname, '..', '..', 'images');
      if (!existsSync(imagesDir)) {
        mkdirSync(imagesDir);
      }

      const writeStream = createWriteStream(outputFilePath);
      writeStream.write(buffer);
      writeStream.end();

      const existingData = await this.usersRepository.findUserByUserId(userId);

      if (existingData) {
        const cctv = existingData.images;
        cctv.push(imageName);
        await existingData.save();
      } else {
        throw new Error('User not found');
      }

      return { message: 'Image uploaded and saved successfully' };
    } catch (error) {
      console.error(error);
      return { error: 'Error uploading and saving the image' };
    }
  }

  async showAllImages(userId: string) {
    const existingData = await this.usersRepository.findUserByUserId(userId);
    return existingData.images
  }
}
