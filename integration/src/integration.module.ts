import { Global, Module } from '@nestjs/common';
import { DiscoveryModule, Reflector } from '@nestjs/core';

import { ExternalApiScanner, BaseApiClient, EndpointResolver } from './common';
import { HttpClientModule } from '@shared/http-client';
import { API_MAX_REDIRECT, API_TIMEOUT } from '@common/constants';
import { IntegrationController } from './integration.controller';
import { IAMApiService } from './external-api';
import { IntegrationService } from './integration.service';

@Global()
@Module({
  imports: [
    DiscoveryModule,
    HttpClientModule.registerAsync({
      useFactory: () => ({
        baseURL: '',
        timeout: API_TIMEOUT,
        maxRedirects: API_MAX_REDIRECT,
        validateStatus: () => {
          return true;
        },
      }),
    }),
  ],
  controllers: [IntegrationController],
  providers: [
    ExternalApiScanner,
    EndpointResolver,
    BaseApiClient,
    Reflector,
    IAMApiService,
    IntegrationService,
  ],
  exports: [BaseApiClient, EndpointResolver, IntegrationService],
})
export class IntegrationModule {}
