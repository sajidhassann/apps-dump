import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ConfigKeys } from 'src/config/app.configuration';

@Injectable()
export class GajniService {
  private readonly apiKey: string;
  private readonly baseURL: string;

  constructor(private readonly config: ConfigService) {
    this.baseURL = this.config.get<string>(ConfigKeys.GAJNI_BASE_URL) ?? '';
    this.apiKey = this.config.get<string>(ConfigKeys.GAJNI_API_KEY) ?? '';
  }

  async generateOTP(number: string): Promise<string | undefined> {
    try {
      const response = await axios.post<{ otp: string }>(
        `${this.baseURL}/admin/otp`,
        { number },
        {
          headers: {
            'x-api-key': this.apiKey,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data.otp;
    } catch (err) {
      console.log('OTP Genereate Error', err);
      return undefined;
    }
  }
}
