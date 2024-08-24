import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from '@nestjs/common';
import { IApiResponse } from 'src/common/interfaces/response.interface';
import { GetUserLogged } from 'src/infrastructures/decorators/get-user-logged.decorator';
import { LoggedInGuard } from 'src/infrastructures/guards/logged-in.guard';
import { OtpV1Application } from '../../applications/v1/otp-v1.application';
import { OtpV1Response } from '../../dto/responses/v1/otp-v1.response';
import { IUser } from '../../interfaces/user.interface';

@Controller({
    path: 'auth/otp',
    version: '1',
})
@UseGuards(LoggedInGuard)
export class OtpV1Controller {
    constructor(private readonly otpApplication: OtpV1Application) {}

    @Post('request')
    @HttpCode(HttpStatus.OK)
    async request(
        @GetUserLogged() user: IUser,
    ): Promise<IApiResponse<OtpV1Response>> {
        const data = await this.otpApplication.requestOtp(user.email);

        return {
            code: HttpStatus.OK,
            message: 'Request OTP Success',
            data: OtpV1Response.toResponse(data),
        };
    }
}
