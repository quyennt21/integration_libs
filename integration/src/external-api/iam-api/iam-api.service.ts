import { Injectable } from '@nestjs/common';
import { BaseApiClient, ExternalApi } from '@inter/common';
import { HttpClientRequestConfig } from '@shared/http-client';

import { IAMApiEndpoint } from './iam-api.endpoint';
import { VerifyOtpDto } from './dto';

@ExternalApi({
  key: 'IAM_API',
  name: 'IAM API',
  envKey: 'INTER_IAM_API_URL',
  description: 'Wrapper api IAM service',
})
@Injectable()
export class IAMApiService extends BaseApiClient {
  async verifyOtp(
    payload: VerifyOtpDto,
    _configs?: HttpClientRequestConfig,
  ): Promise<any> {
    const results = await this._makeRequest<VerifyOtpDto, null, null>(
      IAMApiEndpoint.VerifyOtp,
      {
        body: payload,
      },
    );

    return results.data;
  }
}
