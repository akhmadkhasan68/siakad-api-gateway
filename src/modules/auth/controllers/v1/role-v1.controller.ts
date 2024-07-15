import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { PermissionConstants } from 'src/common/constants/permission.constant';
import { IPaginateResponse } from 'src/common/interfaces/index.interface';
import { IApiResponse } from 'src/common/interfaces/response.interface';
import { GetUserLogged } from 'src/infrastructures/decorators/get-user-logged.decorator';
import { LoggedInGuard } from 'src/infrastructures/guards/logged-in.guard';
import { PermissionGuard } from 'src/infrastructures/guards/permission.guard';
import { RoleV1Application } from '../../applications/v1/role-v1.application';
import { CreateRoleV1Request } from '../../dto/requests/v1/create-role-v1.request';
import { RolePaginateV1Request } from '../../dto/requests/v1/role-paginate-v1.request';
import { RoleV1Response } from '../../dto/responses/v1/role-v1.response';
import { IUser } from '../../interfaces/user.interface';

@Controller({
    path: 'auth/roles',
    version: '1',
})
@UseGuards(LoggedInGuard)
export class RoleV1Controller {
    constructor(private readonly roleApplication: RoleV1Application) {}

    @Get()
    @UseGuards(PermissionGuard(PermissionConstants.AuthService.ReadRole))
    async index(
        @Query() query: RolePaginateV1Request,
    ): Promise<IPaginateResponse<RoleV1Response>> {
        const { data, meta } = await this.roleApplication.fetchPaginate(query);

        return {
            meta,
            data: RoleV1Response.toResponses(data),
        };
    }

    @Get('my-roles')
    @UseGuards(PermissionGuard(PermissionConstants.AuthService.ReadRole))
    async myRoles(
        @GetUserLogged() userLogged: IUser,
    ): Promise<IApiResponse<RoleV1Response[]>> {
        const roles = userLogged.roles;

        return {
            code: HttpStatus.OK,
            message: 'Get my roles success',
            data: RoleV1Response.toResponses(roles),
        };
    }

    @Get(':id')
    @UseGuards(PermissionGuard(PermissionConstants.AuthService.ReadRole))
    async show(
        @Param('id', new ParseUUIDPipe()) id: string,
    ): Promise<IApiResponse<RoleV1Response>> {
        const role = await this.roleApplication.getDetail(id);

        return {
            code: HttpStatus.OK,
            message: 'Get role detail success',
            data: RoleV1Response.toResponse(role),
        };
    }

    @Post()
    @UseGuards(PermissionGuard(PermissionConstants.AuthService.CreateRole))
    @HttpCode(HttpStatus.CREATED)
    async store(
        @Body() body: CreateRoleV1Request,
    ): Promise<IApiResponse<RoleV1Response>> {
        const role = await this.roleApplication.create(body);

        return {
            code: HttpStatus.CREATED,
            message: 'Create role success',
            data: RoleV1Response.toResponse(role),
        };
    }

    @Put(':id')
    @UseGuards(PermissionGuard(PermissionConstants.AuthService.UpdateRole))
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: CreateRoleV1Request,
    ): Promise<IApiResponse<RoleV1Response>> {
        const role = await this.roleApplication.update(id, body);

        return {
            code: HttpStatus.OK,
            message: 'Update role success',
            data: RoleV1Response.toResponse(role),
        };
    }
}
