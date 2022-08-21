import { Injectable, HttpException } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { Express } from 'express';
const DataURIParser = require('datauri/parser');
import * as path from 'path';
const parser = new DataURIParser();

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File) {
    try {
      const extension_name = path.extname(file.originalname).toString();
      const image_data = parser.format(extension_name, file.buffer);
      const upload = await v2.uploader.upload(image_data.content);

      return upload.secure_url;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
