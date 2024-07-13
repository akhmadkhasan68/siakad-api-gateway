import { Global, Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { config } from './config';
import { serviceClient } from './common/constants/service-client.constant';
import { HealthModule } from './modules/health/health.module';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: serviceClient.AUTH_SERVICE,
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
  exports: [
    ClientsModule,
  ],
})
export class AppModule {}
