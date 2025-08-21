import { Controller, Get } from '@nestjs/common';
import { ExternalApiScanner } from './common';

@Controller('_integrations')
export class IntegrationController {
  constructor(private readonly scanner: ExternalApiScanner) {}

  @Get('/register-apis')
  getRegisterApis() {
    return this.scanner.getAllRegisterApis();
  }

  @Get('/endpoint-resolvers')
  getEndpointResolvers() {
    return this.scanner.getEndpointResolvers();
  }
}
