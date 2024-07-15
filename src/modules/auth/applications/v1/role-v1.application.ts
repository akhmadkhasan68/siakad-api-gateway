import { Injectable } from '@nestjs/common';
import { IPaginateResponse } from 'src/common/interfaces/index.interface';
import { CreateRoleV1Request } from '../../dto/requests/v1/create-role-v1.request';
import { RolePaginateV1Request } from '../../dto/requests/v1/role-paginate-v1.request';
import { IRole } from '../../interfaces/role.interface';
import { RoleService } from '../../services/role.service';

@Injectable()
export class RoleV1Application {
    constructor(private readonly roleService: RoleService) {}

    async fetchPaginate(
        payload: RolePaginateV1Request,
    ): Promise<IPaginateResponse<IRole>> {
        const { data, meta } = await this.roleService.fetchPaginate(payload);

        return {
            data,
            meta,
        };
    }

    async getDetail(id: string): Promise<IRole> {
        return await this.roleService.findOneById(id);
    }

    async create(payload: CreateRoleV1Request): Promise<IRole> {
        return await this.roleService.create(payload);
    }
}
