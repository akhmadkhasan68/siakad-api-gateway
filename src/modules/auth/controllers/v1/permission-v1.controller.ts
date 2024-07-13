import { Controller, Get, HttpStatus, Query, UseGuards } from "@nestjs/common";
import { IApiResponse } from "src/common/interfaces/response.interface";
import { GetUserLogged } from "src/infrastructures/decorators/get-user-logged.decorator";
import { LoggedInGuard } from "src/infrastructures/guards/logged-in.guard";
import { IUser } from "../../interfaces/user.interface";
import { PermissionV1Application } from "../../applications/v1/permission-v1.application";
import { PermissionV1Response } from "../../dto/responses/v1/permission-v1.response";
import { PermissionGuard } from "src/infrastructures/guards/permission.guard";
import { IPaginateResponse } from "src/common/interfaces/index.interface";
import { PermissionPaginateV1Request } from "../../dto/requests/v1/permission-paginate-v1.request";

@Controller({
    path: 'auth/permissions',
    version: '1'
})
@UseGuards(LoggedInGuard)
export class PermissionV1Controller {
    constructor(
        private readonly permissionApplication: PermissionV1Application,
    ) {}

    @Get()
    async index(
        @Query() query: PermissionPaginateV1Request,
    ): Promise<IPaginateResponse<PermissionV1Response>> {
        const {
            data,
            meta,
        } = await this.permissionApplication.fetchPaginate(query);

        return {
            meta,
            data: PermissionV1Response.toResponses(data),
        };
    }

    @Get('my-permissions')
    @UseGuards(PermissionGuard('AUTH_SERVICE_CREATE_USER'))
    async myPermissions(
        @GetUserLogged() user: IUser,
    ): Promise<IApiResponse<PermissionV1Response[]>> {
        const permissions = await this.permissionApplication.getPermissionsUserByRoleIds(user);

        return {
            code: HttpStatus.OK,
            message: 'Get user permissions success',
            data: PermissionV1Response.toResponses(permissions),
        };
    }
}
