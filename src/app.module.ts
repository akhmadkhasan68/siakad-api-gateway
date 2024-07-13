import { Global, Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { config } from './config';
import { serviceClient } from './common/constants/service-client.constant';

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
    AuthModule, 
  ],
  providers: [],
  exports: [
    ClientsModule,
  ],
})
export class AppModule {}
