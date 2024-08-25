import { Injectable } from '@nestjs/common';
import { ForgotPasswordRequestV1Request } from '../../dto/requests/v1/forgot-password-request-v1.request';
import { ForgotPasswordResetV1Request } from '../../dto/requests/v1/forgot-password-reset-v1.request';
import { ForgotPasswordVerifyV1Request } from '../../dto/requests/v1/forgot-password-verify-v1.request';
import { ForgotPasswordService } from '../../services/forgot-password.service';

@Injectable()
export class ForgotPasswordV1Application {
    constructor(
        private readonly forgotPasswordService: ForgotPasswordService,
    ) {}

    async request(data: ForgotPasswordRequestV1Request): Promise<void> {
        await this.forgotPasswordService.requestForgotPassword(data);
    }

    async verify(data: ForgotPasswordVerifyV1Request): Promise<void> {
        await this.forgotPasswordService.verifyForgotPassword(data);
    }

    async reset(data: ForgotPasswordResetV1Request): Promise<void> {
        await this.forgotPasswordService.resetPassword(data);
    }
}
