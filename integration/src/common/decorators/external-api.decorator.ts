import 'reflect-metadata';

import { ExternalApiOptions } from '@inter/common/interfaces';
import { INTEGRATION_EXTERNAL_API_KEY } from '../constants';

type ExternalApiDecorator = (options: ExternalApiOptions) => ClassDecorator;

export const ExternalApi: ExternalApiDecorator = (options) => (target) => {
  Reflect.defineMetadata(INTEGRATION_EXTERNAL_API_KEY, options, target);
};
