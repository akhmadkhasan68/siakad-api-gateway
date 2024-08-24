import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ServiceCommands } from 'src/common/constants/service-command.constant';
import { ServiceClientEnum } from 'src/common/enums/service-client.enum';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(
        @Inject(ServiceClientEnum.AuthService)
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
                ServiceCommands.AuthService.V1.Login
                    .VerifyUserByEmailAndPassword,
                {
                    email,
                    password,
                },
            );

            return await lastValueFrom(result);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    async findById(id: string): Promise<IUser> {
        try {
            const result = this.client.send<IUser, string>(
                ServiceCommands.AuthService.V1.Login.GetUserById,
                id,
            );

            return await lastValueFrom(result);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    async findByEmail(email: string): Promise<IUser> {
        try {
            const result = this.client.send<IUser, string>(
                ServiceCommands.AuthService.V1.Login.GetUserByEmail,
                email,
            );

            return await lastValueFrom(result);
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
