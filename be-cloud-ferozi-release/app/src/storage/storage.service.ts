import { Injectable } from '@nestjs/common';
import { UploadFile } from './models/upload.file.model';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from '../config/app.configuration';

@Injectable()
export class StorageService {
  private readonly envName: string;

  private readonly bucketName: string;

  constructor(private readonly config: ConfigService) {
    this.envName = this.config.get(ConfigKeys.ENV_NAME);
    this.bucketName = this.config.get(ConfigKeys.PUBLIC_BUCKET);
  }

  async upload(file: UploadFile, path: string): Promise<string> {
    AWS.config.update({ region: 'ap-southeast-1' });

    const key = path + '/' + file.name.replace(/ /g, '');
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.file.buffer,
    };
    const bucket = new AWS.S3();
    await bucket.putObject(params).promise();

    console.log('Uploaded file');
    return this.getURL(key);
  }

  private getURL(file: string): string {
    const baseURL = `https://assets${
      this.envName === 'dev' ? '-dev' : ''
    }.maqsad.net`;
    return `${baseURL}/${file}`;
  }
}
