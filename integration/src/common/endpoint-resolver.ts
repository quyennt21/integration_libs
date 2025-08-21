import { Injectable } from '@nestjs/common';

@Injectable()
export class EndpointResolver {
  private endpoints: Record<string, string> = {};

  registerEndpoint(apiName: string, url: string) {
    this.endpoints[apiName] = url;
  }

  resolve(apiName: string): string {
    return this.endpoints[apiName];
  }

  getAll() {
    return this.endpoints;
  }
}
