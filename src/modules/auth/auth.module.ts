import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'src/config';
import { AuthV1Application } from './applications/v1/auth-v1.application';
import { OtpV1Application } from './applications/v1/otp-v1.application';
import { PermissionV1Application } from './applications/v1/permission-v1.application';
import { RoleV1Application } from './applications/v1/role-v1.application';
import { AuthV1Controller } from './controllers/v1/auth-v1.controller';
import { OtpV1Controller } from './controllers/v1/otp-v1.controller';
import { PermissionV1Controller } from './controllers/v1/permission-v1.controller';
import { RoleV1Controller } from './controllers/v1/role-v1.controller';
import { JwtStrategy } from './services/jwt.strategy';
import { OtpService } from './services/otp.service';
import { PermissionService } from './services/permission.service';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

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
        PermissionV1Controller,
        RoleV1Controller,
        OtpV1Controller,
    ],
    providers: [
        JwtStrategy,

        // Applications
        AuthV1Application,
        PermissionV1Application,
        RoleV1Application,
        OtpV1Application,

        // Services
        UserService,
        PermissionService,
        RoleService,
        OtpService,
    ],
    exports: [
        JwtModule,
        PassportModule,

        // Applications
        AuthV1Application,
        PermissionV1Application,
        RoleV1Application,

        // Services
        UserService,
        PermissionService,
        RoleService,
        OtpService,
    ],
})
export class AuthModule {}
