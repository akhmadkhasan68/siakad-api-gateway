import {
    Controller,
    Get,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Query,
    UseGuards,
} from '@nestjs/common';
import { PermissionConstants } from 'src/common/constants/permission.constant';
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
    @UseGuards(PermissionGuard(PermissionConstants.AuthService.ReadPermission))
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

    @Get(':id')
    @UseGuards(PermissionGuard(PermissionConstants.AuthService.ReadPermission))
    async show(
        @Param('id', new ParseUUIDPipe()) id: string,
    ): Promise<IApiResponse<PermissionV1Response>> {
        const permission = await this.permissionApplication.getDetail(id);

        return {
            code: HttpStatus.OK,
            message: 'Get permission detail success',
            data: PermissionV1Response.toResponse(permission),
        };
    }

    @Get('my-permissions')
    @UseGuards(PermissionGuard(PermissionConstants.AuthService.ReadPermission))
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
