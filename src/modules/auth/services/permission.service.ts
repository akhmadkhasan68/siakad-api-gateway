import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ServiceCommands } from 'src/common/constants/service-command.constant';
import { ServiceClientEnum } from 'src/common/enums/service-client.enum';
import { IPaginateResponse } from 'src/common/interfaces/index.interface';
import { PermissionPaginateV1Request } from '../dto/requests/v1/permission-paginate-v1.request';
import { IPermission } from '../interfaces/permission.interface';

@Injectable()
export class PermissionService {
    constructor(
        @Inject(ServiceClientEnum.AuthService)
        private client: ClientProxy,
    ) {}

    async fetchPaginate(
        payload: PermissionPaginateV1Request,
    ): Promise<IPaginateResponse<IPermission>> {
        try {
            const result = this.client.send<
                IPaginateResponse<IPermission>,
                PermissionPaginateV1Request
            >(
                ServiceCommands.AuthService.V1.Permissions.FetchPaginate,
                payload,
            );
            const response = await lastValueFrom(result);

            return response;
        } catch (error) {
            throw new RpcException(error);
        }
    }

    async findOneById(id: string): Promise<IPermission> {
        try {
            const result = this.client.send<IPermission, string>(
                ServiceCommands.AuthService.V1.Permissions.FindOneById,
                id,
            );

            return await lastValueFrom(result);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    async getPermissionsByRoleIds(roleIds: string[]): Promise<IPermission[]> {
        try {
            const result = this.client.send<
                IPermission[],
                { roleIds: string[] }
            >(
                ServiceCommands.AuthService.V1.Permissions
                    .GetPermissionsByRoleIds,
                {
                    roleIds,
                },
            );

            return await lastValueFrom(result);
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
