import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ServiceCommands } from 'src/common/constants/service-command.constant';
import { ServiceClientEnum } from 'src/common/enums/service-client.enum';
import { ForgotPasswordRequestV1Request } from '../dto/requests/v1/forgot-password-request-v1.request';
import { ForgotPasswordResetV1Request } from '../dto/requests/v1/forgot-password-reset-v1.request';
import { ForgotPasswordVerifyV1Request } from '../dto/requests/v1/forgot-password-verify-v1.request';
import { IPasswordResetToken } from '../interfaces/password-reset-token.interface';

@Injectable()
export class ForgotPasswordService {
    constructor(
        @Inject(ServiceClientEnum.AuthService)
        private client: ClientProxy,
    ) {}

    async requestForgotPassword(
        data: ForgotPasswordRequestV1Request,
    ): Promise<void> {
        try {
            this.client
                .emit<
                    void,
                    ForgotPasswordRequestV1Request
                >(ServiceCommands.AuthService.V1.ForgotPassword.RequestForgotPassword, data)
                .subscribe();
        } catch (error) {
            throw error;
        }
    }

    async verifyForgotPassword(
        data: ForgotPasswordVerifyV1Request,
    ): Promise<IPasswordResetToken> {
        try {
            const result = await this.client.send<
                IPasswordResetToken,
                ForgotPasswordVerifyV1Request
            >(
                ServiceCommands.AuthService.V1.ForgotPassword
                    .VerifyForgotPassword,
                data,
            );

            return await lastValueFrom(result);
        } catch (error) {
            throw error;
        }
    }

    async resetPassword(data: ForgotPasswordResetV1Request): Promise<void> {
        try {
            this.client
                .emit<
                    void,
                    ForgotPasswordResetV1Request
                >(ServiceCommands.AuthService.V1.ForgotPassword.ResetPassword, data)
                .subscribe();
        } catch (error) {
            throw error;
        }
    }
}
