import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { serviceClient } from "src/common/constants/service-client.constant";
import { SERVICE_NATS_COMMAND } from "src/common/constants/service-nats-command.constant";
import { IUser } from "../interfaces/user.interface";

@Injectable()
export class UserService {
    constructor(
        @Inject(serviceClient.AUTH_SERVICE) 
        private client: ClientProxy,
    ) {}

    async verifyUserbyEmailAndPassword(
        email: string,
        password: string,
    ): Promise<IUser> {
        try {
            const result = this.client.send<IUser, {email: string, password: string}>(SERVICE_NATS_COMMAND.AUTH_SERVICE.LOGIN.VERIFY_USER_BY_EMAIL_AND_PASSWORD, {
                email,
                password,
            });

            return await lastValueFrom(result);            
        } catch (error) {
            throw new RpcException(error.response);
        }
    }

    async findById(id: string): Promise<IUser> {
        try {
            const result = this.client.send<IUser, string>(SERVICE_NATS_COMMAND.AUTH_SERVICE.LOGIN.GET_USER_BY_ID, id);

            return await lastValueFrom(result);
        } catch (error) {
            throw new RpcException(error.response);
        }
    }

    async findByEmail(email: string): Promise<IUser> {
        try {
            const result = this.client.send<IUser, string>(SERVICE_NATS_COMMAND.AUTH_SERVICE.LOGIN.GET_USER_BY_EMAIL, email);

            return await lastValueFrom(result);
        } catch (error) {
            throw new RpcException(error.response);
        }
    }
}
