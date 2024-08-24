import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceClientEnum } from './common/enums/service-client.enum';
import { config } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';

@Global()
@Module({
    imports: [
        ClientsModule.register([
            {
                name: ServiceClientEnum.AuthService,
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
