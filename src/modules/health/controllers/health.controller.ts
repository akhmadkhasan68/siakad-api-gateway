import { Controller, Get } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
    HealthCheck,
    HealthCheckService,
    MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { ServiceClientEnum } from 'src/common/enums/service-client.enum';
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
                    ServiceClientEnum.AuthService,
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
