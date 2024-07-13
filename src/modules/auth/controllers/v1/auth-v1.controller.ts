import { Body, Controller, Get, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { LoginV1Request } from "../../dto/requests/v1/login-v1.request";
import { AuthV1Application } from "../../applications/v1/auth-v1.application";
import { IApiResponse } from "src/common/interfaces/response.interface";
import { LoginV1Response } from "../../dto/responses/v1/login-v1.response";
import { LoggedInGuard } from "src/infrastructures/guards/logged-in.guard";
import { GetUserLogged } from "src/infrastructures/decorators/get-user-logged.decorator";
import { IUser } from "../../interfaces/user.interface";
import { MeV1Response } from "../../dto/responses/v1/me-v1.response";

@Controller({
    path: 'auth',
    version: '1'
})
export class AuthV1Controller {
    constructor(
        private readonly authApplication: AuthV1Application,
    ) {}

    @Post('login')
    async login(
        @Body() body: LoginV1Request,
    ): Promise<IApiResponse<LoginV1Response>> {
        const {
            user,
            token,
        } = await this.authApplication.login(body);

        return {
            code: HttpStatus.CREATED,
            message: 'Login success',
            data: LoginV1Response.toResponse(user, token),
        };
    }

    @Get('me')
    @UseGuards(LoggedInGuard)
    async me(
        @GetUserLogged() user: IUser,
    ): Promise<IApiResponse<MeV1Response>> {
        return {
            code: HttpStatus.OK,
            message: 'Get user success',
            data: MeV1Response.toResponse(user),
        };
    }
}
