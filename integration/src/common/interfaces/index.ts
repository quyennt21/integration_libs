export interface ExternalApiOptions {
  key: string;
  name: string;
  envKey: string;
  description?: string;
  auth?: any; // Impl later
}

export interface RequestData<TBody, TQuery, TPathParam> {
  body?: TBody;
  pathParam?: TPathParam;
  query?: TQuery;
}

export interface RequestConfig {
  skipException?: boolean;
  headers?: Record<string, string>;
  // Add more config options as needed (timeout, auth, etc.)
}
