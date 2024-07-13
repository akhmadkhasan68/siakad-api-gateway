import { Controller, Get } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
    HealthCheck,
    HealthCheckService,
    MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { serviceClient } from 'src/common/constants/service-client.constant';
import { config } from 'src/config';

@Controller({
    path: 'health',
    version: '1',
})
export class HealthController {
    constructor(
        private readonly healthCheckService: HealthCheckService,
        private readonly microserviceHealthCheckService: MicroserviceHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    async health() {
        return this.healthCheckService.check([
            () =>
                this.microserviceHealthCheckService.pingCheck(
                    serviceClient.AuthService,
                    {
                        transport: Transport.NATS,
                        options: {
                            url: config.nats.authServiceUrl,
                        },
                    },
                ),
        ]);
    }
}
