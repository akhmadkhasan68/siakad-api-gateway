import { Controller, Get } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";
import { HealthCheck, HealthCheckService, MicroserviceHealthIndicator } from "@nestjs/terminus";
import { config } from "src/config";

@Controller({
    path: 'health',
    version: '1'
})
export class HealthController {
    constructor(
        private readonly healthCheckService: HealthCheckService,
        private readonly microserviceHealthCheckService: MicroserviceHealthIndicator,
    ) { }

    @Get()
    @HealthCheck()
    async health() {
        return this.healthCheckService.check([
            () => this.microserviceHealthCheckService.pingCheck('auth-service', {
                transport: Transport.NATS,
                options: {
                    url: config.nats.authServiceUrl,
                }
            }),
        ]);
    }
}
