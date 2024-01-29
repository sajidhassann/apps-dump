import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { ConfigKeys } from 'src/config/app.configuration';

@Injectable()
export class StorageService {
  private readonly defaultBucket: string;
  private readonly s3: AWS.S3;

  constructor(private readonly config: ConfigService) {
    AWS.config.update({ region: 'ap-southeast-1' });
    this.defaultBucket =
      this.config.get<string>(ConfigKeys.S3_BUCKET_SAARIF) ?? '';
    this.s3 = new AWS.S3({
      region: 'ap-southeast-1',
    });
  }

  async upload(
    key: string,
    buffer: Buffer,
    mimeType: string,
  ): Promise<AWS.S3.PutObjectOutput> {
    console.log('buffer :>> ', buffer);
    const params: S3.PutObjectRequest = {
      Bucket: this.defaultBucket,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    };
    return this.s3.putObject(params).promise();
  }
}
