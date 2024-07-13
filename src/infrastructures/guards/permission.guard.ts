import { ExecutionContext, ForbiddenException, Inject, mixin } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGroupEnum } from 'src/common/enums/role-group.enum';
import { PermissionV1Application } from 'src/modules/auth/applications/v1/permission-v1.application';
import { IUser } from 'src/modules/auth/interfaces/user.interface';

export const PermissionGuard = (permissionKey: string): any => {
    class PermissionGuardMixin extends AuthGuard('jwt') {
        constructor(
            @Inject(PermissionV1Application)
            private readonly permissionApplication: PermissionV1Application, 
        ) {
            super();
        }

        async canActivate(context: ExecutionContext) {
            const user = context.switchToHttp().getRequest().user as IUser;
            const roles = user.roles;
            const permissions = await this.permissionApplication.getPermissionsUserByRoleIds(
                user,
            );

            if (roles.some((role) => role.roleGroup?.key !== RoleGroupEnum.Admin)) {
                return true;
            }

            if (!permissions) {
                throw new ForbiddenException('Forbidden');
            }

            const permissionKeys = permissions.map(
                (permission) => permission.key,
            );

            if (!permissionKeys.includes(permissionKey)) {
                throw new ForbiddenException('Forbidden');
            }

            return true;
        }
    }

    const guard = mixin(PermissionGuardMixin);
    return guard;
};
