import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { serviceClient } from 'src/common/constants/service-client.constant';
import { ServiceNatsCommand } from 'src/common/constants/service-nats-command.constant';
import { IPaginateResponse } from 'src/common/interfaces/index.interface';
import { CreateRoleV1Request } from '../dto/requests/v1/create-role-v1.request';
import { RolePaginateV1Request } from '../dto/requests/v1/role-paginate-v1.request';
import { IRole } from '../interfaces/role.interface';

@Injectable()
export class RoleService {
    constructor(
        @Inject(serviceClient.AuthService)
        private client: ClientProxy,
    ) {}

    async fetchPaginate(
        payload: RolePaginateV1Request,
    ): Promise<IPaginateResponse<IRole>> {
        try {
            const result = this.client.send<
                IPaginateResponse<IRole>,
                RolePaginateV1Request
            >(ServiceNatsCommand.AuthService.Roles.FetchPaginate, payload);
            const response = await lastValueFrom(result);

            return response;
        } catch (error) {
            throw new RpcException(error);
        }
    }

    async findOneById(id: string): Promise<IRole> {
        try {
            const result = this.client.send<IRole, string>(
                ServiceNatsCommand.AuthService.Roles.FindOneById,
                id,
            );

            return await lastValueFrom(result);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    async create(payload: CreateRoleV1Request): Promise<IRole> {
        try {
            const result = this.client.send<IRole, CreateRoleV1Request>(
                ServiceNatsCommand.AuthService.Roles.Create,
                payload,
            );

            return await lastValueFrom(result);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    async update(id: string, payload: CreateRoleV1Request): Promise<IRole> {
        try {
            const result = this.client.send<IRole, any>(
                ServiceNatsCommand.AuthService.Roles.Update,
                { id, ...payload },
            );

            return await lastValueFrom(result);
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
