import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { LoginV1Request } from '../../dto/requests/v1/login-v1.request';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Injectable()
export class AuthV1Application {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(data: LoginV1Request): Promise<{
        user: IUser;
        token: string;
    }> {
        const user = await this.userService.verifyUserbyEmailAndPassword(
            data.email,
            data.password,
        );

        const token = this.generateToken(user);

        return {
            user,
            token,
        };
    }

    generateToken(user: IUser): string {
        const payload: IJwtPayload = {
            id: user.id,
        };

        return this.jwtService.sign(payload);
    }
}
