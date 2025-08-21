import { Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { buildEndpoint, HttpClientService } from '@shared/http-client';
import { ExternalApiOptions, RequestConfig, RequestData } from './interfaces';
import { EndpointResolver } from './endpoint-resolver';
import { INTEGRATION_EXTERNAL_API_KEY } from './constants';

@Injectable()
export class BaseApiClient {
  protected readonly logger = new Logger(BaseApiClient.name);
  protected metadata: ExternalApiOptions;

  protected baseUrl: string;

  constructor(
    protected readonly client: HttpClientService,
    protected readonly endpointResolver: EndpointResolver,
    protected readonly reflector: Reflector,
  ) {
    // Soft magic to auto register all client extends
    const childClass = Object.getPrototypeOf(this).constructor;

    if (childClass === BaseApiClient.name) {
      return;
    }

    this.metadata = this.reflector.get<ExternalApiOptions>(
      INTEGRATION_EXTERNAL_API_KEY,
      childClass,
    );
  }

  /**
   * Makes an HTTP request to the specified endpoint using the shared HttpClientService.
   * @param endpoint The endpoint template (can include path params).
   * @param data The request data (body, query, pathParam).
   * @param config Optional config (skipException, headers, etc.).
   */
  protected async _makeRequest<
    TBody = unknown,
    TQuery = unknown,
    TPathParam = unknown,
  >(
    endpoint: string,
    data: RequestData<TBody, TQuery, TPathParam>,
    config: RequestConfig = {},
  ) {
    const url = buildEndpoint(endpoint, data.pathParam);

    // Get the base URL safely, lazily.
    const baseUrl = this.getBaseUrl();

    const fullUrl = `${baseUrl}${url.path}`;
    const resp = await this.client.request({
      method: url.method,
      url: fullUrl,
      ...(data?.query && { params: data.query }),
      ...(data?.body && { data: data.body }),
      ...(config.headers && { headers: config.headers }),
    });

    if (!config?.skipException) {
      // Optionally call your custom exception handler here
      // _checkExceptionFromAxiosRes(resp);
    }

    return resp;
  }

  /**
   * Lazily gets and caches the baseUrl from endpointResolver.
   */
  protected getBaseUrl(): string {
    if (!this.baseUrl) {
      this.baseUrl = this.endpointResolver.resolve(this.metadata?.key);
      if (!this.baseUrl) {
        throw new Error(
          `Endpoint not registered for key: ${this.metadata.key}. Did the scanner run?`,
        );
      }
    }

    return this.baseUrl;
  }
}
