import { Injectable } from '@nestjs/common';
import { IPaginateResponse } from 'src/common/interfaces/index.interface';
import { PermissionPaginateV1Request } from '../../dto/requests/v1/permission-paginate-v1.request';
import { IPermission } from '../../interfaces/permission.interface';
import { IUser } from '../../interfaces/user.interface';
import { PermissionService } from '../../services/permission.service';

@Injectable()
export class PermissionV1Application {
    constructor(private readonly permissionService: PermissionService) {}

    async fetchPaginate(
        query: PermissionPaginateV1Request,
    ): Promise<IPaginateResponse<IPermission>> {
        const { data, meta } =
            await this.permissionService.fetchPaginate(query);

        return {
            data,
            meta,
        };
    }

    async getDetail(id: string): Promise<IPermission> {
        return await this.permissionService.findOneById(id);
    }

    async getPermissionsUserByRoleIds(user: IUser): Promise<IPermission[]> {
        const roleIds = user.roles.map((role) => role.id);

        return await this.permissionService.getPermissionsByRoleIds(roleIds);
    }
}
