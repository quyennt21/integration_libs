import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { ExternalApiOptions } from './interfaces';
import { INTEGRATION_EXTERNAL_API_KEY } from './constants';
import { EndpointResolver } from './endpoint-resolver';

@Injectable()
export class ExternalApiScanner implements OnApplicationBootstrap {
  private readonly logger = new Logger(ExternalApiScanner.name);

  private readonly externalApiRegistries = new Map<
    string,
    ExternalApiOptions
  >();

  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly endpointResolver: EndpointResolver,
    private readonly discovery: DiscoveryService,
  ) {}

  onApplicationBootstrap() {
    const providers = this.discovery.getProviders();
    for (const provider of providers) {
      const instance = provider.metatype;

      if (!instance) continue;

      const metadata = this.reflector.get<ExternalApiOptions>(
        INTEGRATION_EXTERNAL_API_KEY,
        instance,
      );

      if (metadata) {
        this.externalApiRegistries.set(metadata.key, metadata);
        this.endpointResolver.registerEndpoint(
          metadata.key,
          this.configService.get<string>(metadata.envKey, ''),
        );
        this.logger.log(
          `[Discovery] Registered external API: ${metadata.name}`,
        );
      }
    }
  }

  getAllRegisterApis(): ExternalApiOptions[] {
    return Array.from(this.externalApiRegistries.values());
  }

  getRegisterApi(key: string): ExternalApiOptions | undefined {
    return this.externalApiRegistries.get(key);
  }

  getEndpointResolvers() {
    return this.endpointResolver.getAll();
  }
}
