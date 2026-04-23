import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class HealthController {
  @Get('health')
  health() {
    return {
      success: true,
      message: 'NestJS server running',
      timestamp: new Date().toISOString(),
      version: 'v1.0 - NestJS + Prisma + MySQL'
    };
  }
}