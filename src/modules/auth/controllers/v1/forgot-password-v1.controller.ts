import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { IApiResponse } from 'src/common/interfaces/response.interface';
import { ForgotPasswordV1Application } from '../../applications/v1/forgot-password-v1.application';
import { ForgotPasswordRequestV1Request } from '../../dto/requests/v1/forgot-password-request-v1.request';
import { ForgotPasswordResetV1Request } from '../../dto/requests/v1/forgot-password-reset-v1.request';
import { ForgotPasswordVerifyV1Request } from '../../dto/requests/v1/forgot-password-verify-v1.request';

@Controller({
    version: '1',
    path: 'auth/forgot-password',
})
export class ForgotPasswordV1Controller {
    constructor(
        private readonly forgotPasswordApplication: ForgotPasswordV1Application,
    ) {}

    @Post('request')
    @HttpCode(HttpStatus.OK)
    async request(
        @Body() body: ForgotPasswordRequestV1Request,
    ): Promise<IApiResponse<null>> {
        await this.forgotPasswordApplication.request(body);

        return {
            code: HttpStatus.OK,
            message: 'Request OTP Success',
            data: null,
        };
    }

    @Post('verify')
    @HttpCode(HttpStatus.OK)
    async verify(
        @Body() body: ForgotPasswordVerifyV1Request,
    ): Promise<IApiResponse<null>> {
        await this.forgotPasswordApplication.verify(body);

        return {
            code: HttpStatus.OK,
            message: 'Verify OTP Success',
            data: null,
        };
    }

    @Post('reset')
    @HttpCode(HttpStatus.OK)
    async reset(
        @Body() body: ForgotPasswordResetV1Request,
    ): Promise<IApiResponse<null>> {
        await this.forgotPasswordApplication.reset(body);

        return {
            code: HttpStatus.OK,
            message: 'Reset Password Success',
            data: null,
        };
    }
}
