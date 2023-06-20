import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CctvService } from './cctv.service';

@Controller('cctv')
export class CctvController {
  constructor(private readonly cctvService: CctvService) {}

  @Post('upload/:userId')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Param('userId') userId: string) {
    return this.cctvService.processImage(file, userId);
  }

  @Get('load/:userId')
  async showAllImages(@Param('userId') userId: string) {
    return this.cctvService.showAllImages(userId);
  }
}