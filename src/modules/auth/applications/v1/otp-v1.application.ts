import { Injectable } from '@nestjs/common';
import { IOtp } from '../../interfaces/otp.interface';
import { OtpService } from '../../services/otp.service';

@Injectable()
export class OtpV1Application {
    constructor(private readonly otpService: OtpService) {}

    async requestOtp(email: string): Promise<IOtp> {
        return await this.otpService.requestOtp(email);
    }
}
