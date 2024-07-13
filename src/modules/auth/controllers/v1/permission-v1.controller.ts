import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { PERMISSION } from 'src/common/constants/permission.constant';
import { IPaginateResponse } from 'src/common/interfaces/index.interface';
import { IApiResponse } from 'src/common/interfaces/response.interface';
import { GetUserLogged } from 'src/infrastructures/decorators/get-user-logged.decorator';
import { LoggedInGuard } from 'src/infrastructures/guards/logged-in.guard';
import { PermissionGuard } from 'src/infrastructures/guards/permission.guard';
import { PermissionV1Application } from '../../applications/v1/permission-v1.application';
import { PermissionPaginateV1Request } from '../../dto/requests/v1/permission-paginate-v1.request';
import { PermissionV1Response } from '../../dto/responses/v1/permission-v1.response';
import { IUser } from '../../interfaces/user.interface';

@Controller({
    path: 'auth/permissions',
    version: '1',
})
@UseGuards(LoggedInGuard)
export class PermissionV1Controller {
    constructor(
        private readonly permissionApplication: PermissionV1Application,
    ) {}

    @Get()
    @UseGuards(PermissionGuard(PERMISSION.AUTH_SERVICE.READ_PERMISSION))
    async index(
        @Query() query: PermissionPaginateV1Request,
    ): Promise<IPaginateResponse<PermissionV1Response>> {
        const { data, meta } =
            await this.permissionApplication.fetchPaginate(query);

        return {
            meta,
            data: PermissionV1Response.toResponses(data),
        };
    }

    @Get('my-permissions')
    @UseGuards(PermissionGuard(PERMISSION.AUTH_SERVICE.READ_PERMISSION))
    async myPermissions(
        @GetUserLogged() user: IUser,
    ): Promise<IApiResponse<PermissionV1Response[]>> {
        const permissions =
            await this.permissionApplication.getPermissionsUserByRoleIds(user);

        return {
            code: HttpStatus.OK,
            message: 'Get user permissions success',
            data: PermissionV1Response.toResponses(permissions),
        };
    }
}
