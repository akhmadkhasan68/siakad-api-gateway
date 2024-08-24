import { IOtp } from 'src/modules/auth/interfaces/otp.interface';

export class OtpV1Response {
    id: string;
    code: string;
    email: string;
    expiredAt: Date;

    static toResponse(entity: IOtp): OtpV1Response {
        const otpV1Response = new OtpV1Response();
        otpV1Response.id = entity.id;
        otpV1Response.code = entity.code;
        otpV1Response.email = entity.email;
        otpV1Response.expiredAt = entity.expiredAt;

        return otpV1Response;
    }

    static toResponses(entities: IOtp[]): OtpV1Response[] {
        return entities.map((entity) => this.toResponse(entity));
    }
}
