import { Injectable } from '@nestjs/common';
import { IAMApiService } from './external-api';

@Injectable()
export class IntegrationService {
  constructor(public readonly iamApi: IAMApiService) {}
}
