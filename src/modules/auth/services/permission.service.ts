import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { serviceClient } from "src/common/constants/service-client.constant";
import { SERVICE_NATS_COMMAND } from "src/common/constants/service-nats-command.constant";
import { IPermission } from "../interfaces/permission.interface";
import { IPaginateResponse } from "src/common/interfaces/index.interface";
import { PermissionPaginateV1Request } from "../dto/requests/v1/permission-paginate-v1.request";

@Injectable()
export class PermissionService {
    constructor(
        @Inject(serviceClient.AUTH_SERVICE) 
        private client: ClientProxy,
    ) {}

    async fetchPaginate(
        payload: PermissionPaginateV1Request,
    ): Promise<IPaginateResponse<IPermission>> {

        try {
            const result = this.client.send<IPaginateResponse<IPermission>, PermissionPaginateV1Request>(SERVICE_NATS_COMMAND.AUTH_SERVICE.PERMISSIONS.FETCH_PAGINATE, payload);
            const response = await lastValueFrom(result);
            
            return response;
        } catch (error) {
            throw new RpcException(error.response);
        }
    }

    async getPermissionsByRoleIds(
        roleIds: string[],
    ): Promise<IPermission[]> {
        try {
            const result = this.client.send<IPermission[], {roleIds: string[]}>(SERVICE_NATS_COMMAND.AUTH_SERVICE.PERMISSIONS.GET_PERMISSIONS_BY_ROLE_IDS, {
                roleIds,
            });

            return await lastValueFrom(result);            
        } catch (error) {
            throw new RpcException(error.response);
        }
    }
}
