import { Global, Module } from '@nestjs/common';
import { AuthV1Controller } from './controllers/v1/auth-v1.controller';
import { UserService } from './services/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';
import { AuthV1Application } from './applications/v1/auth-v1.application';
import { JwtStrategy } from './services/jwt.strategy';
import { PermissionService } from './services/permission.service';
import { PermissionV1Controller } from './controllers/v1/permission-v1.controller';
import { PermissionV1Application } from './applications/v1/permission-v1.application';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: { expiresIn: config.jwt.expiresInMilisecond },
    }),
  ],
  controllers: [
    AuthV1Controller,
    PermissionV1Controller
  ],
  providers: [
    JwtStrategy,

    AuthV1Application,
    PermissionV1Application,

    UserService,
    PermissionService,
  ],
  exports: [
    JwtModule,
    PassportModule,

    PermissionV1Application,

    UserService,
    PermissionService,
  ],
})
export class AuthModule {}
