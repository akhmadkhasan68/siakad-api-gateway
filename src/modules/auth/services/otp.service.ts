import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ServiceCommands } from 'src/common/constants/service-command.constant';
import { ServiceClientEnum } from 'src/common/enums/service-client.enum';
import { IOtp } from '../interfaces/otp.interface';

@Injectable()
export class OtpService {
    constructor(
        @Inject(ServiceClientEnum.AuthService)
        private client: ClientProxy,
    ) {}

    // RequestOtp: 'auth:otp:requestOtp',
    // VerifyOtp: 'auth:otp:verifyOtp',

    async requestOtp(email: string): Promise<IOtp> {
        try {
            const result = this.client.send<
                IOtp,
                {
                    email: string;
                }
            >(ServiceCommands.AuthService.V1.Otp.RequestOtp, {
                email,
            });

            return await lastValueFrom(result);
        } catch (error) {
            throw error;
        }
    }
}
