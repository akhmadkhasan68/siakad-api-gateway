import {
    Controller,
    Get,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Query,
} from '@nestjs/common';
import { IPaginateResponse } from 'src/common/interfaces/index.interface';
import { IApiResponse } from 'src/common/interfaces/response.interface';
import { RoleV1Application } from '../../applications/v1/role-v1.application';
import { RolePaginateV1Request } from '../../dto/requests/v1/role-paginate-v1.request';
import { RoleV1Response } from '../../dto/responses/v1/role-v1.response';

@Controller({
    path: 'auth/roles',
    version: '1',
})
export class RoleV1Controller {
    constructor(private readonly roleApplication: RoleV1Application) {}

    @Get()
    async index(
        @Query() query: RolePaginateV1Request,
    ): Promise<IPaginateResponse<RoleV1Response>> {
        const { data, meta } = await this.roleApplication.fetchPaginate(query);

        return {
            meta,
            data: RoleV1Response.toResponses(data),
        };
    }

    @Get(':id')
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
}
