import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'src/config';
import { AuthV1Application } from './applications/v1/auth-v1.application';
import { PermissionV1Application } from './applications/v1/permission-v1.application';
import { RoleV1Application } from './applications/v1/role-v1.application';
import { AuthV1Controller } from './controllers/v1/auth-v1.controller';
import { PermissionV1Controller } from './controllers/v1/permission-v1.controller';
import { RoleV1Controller } from './controllers/v1/role-v1.controller';
import { JwtStrategy } from './services/jwt.strategy';
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
    controllers: [AuthV1Controller, PermissionV1Controller, RoleV1Controller],
    providers: [
        JwtStrategy,

        AuthV1Application,
        PermissionV1Application,
        RoleV1Application,

        UserService,
        PermissionService,
        RoleService,
    ],
    exports: [
        JwtModule,
        PassportModule,

        PermissionV1Application,
        RoleV1Application,

        UserService,
        PermissionService,
    ],
})
export class AuthModule {}
