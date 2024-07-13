import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { serviceClient } from 'src/common/constants/service-client.constant';
import { ServiceNatsCommand } from 'src/common/constants/service-nats-command.constant';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(
        @Inject(serviceClient.AuthService)
        private client: ClientProxy,
    ) {}

    async verifyUserbyEmailAndPassword(
        email: string,
        password: string,
    ): Promise<IUser> {
        try {
            const result = this.client.send<
                IUser,
                { email: string; password: string }
            >(
                ServiceNatsCommand.AuthService.Login
                    .VerifyUserByEmailAndPassword,
                {
                    email,
                    password,
                },
            );

            return await lastValueFrom(result);
        } catch (error) {
            throw new RpcException(error.response);
        }
    }

    async findById(id: string): Promise<IUser> {
        try {
            const result = this.client.send<IUser, string>(
                ServiceNatsCommand.AuthService.Login.GetUserById,
                id,
            );

            return await lastValueFrom(result);
        } catch (error) {
            throw new RpcException(error.response);
        }
    }

    async findByEmail(email: string): Promise<IUser> {
        try {
            const result = this.client.send<IUser, string>(
                ServiceNatsCommand.AuthService.Login.GetUserByEmail,
                email,
            );

            return await lastValueFrom(result);
        } catch (error) {
            throw new RpcException(error.response);
        }
    }
}
