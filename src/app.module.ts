import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { serviceClient } from './common/constants/service-client.constant';
import { config } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';

@Global()
@Module({
    imports: [
        ClientsModule.register([
            {
                name: serviceClient.AuthService,
                transport: Transport.NATS,
                options: {
                    url: config.nats.authServiceUrl,
                },
            },
        ]),
        HealthModule,
        AuthModule,
    ],
    providers: [],
    exports: [ClientsModule],
})
export class AppModule {}
