import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
    app: {
        host: process.env.APP_HOST || 'localhost',
        port: +process.env.APP_PORT || 3000,
        env: process.env.APP_ENV || 'development',
        debug: process.env.APP_DEBUG || false,
        key: process.env.APP_KEY || 'secret',
        url: process.env.APP_URL || 'http://localhost:3000',
    },

    nats: {
        authServiceUrl:
            process.env.NATS_AUTH_SERVICE_URL || 'nats://localhost:4222',
    },

    jwt: {
        secret: process.env.JWT_SECRET || 'secret',
        expiresInMilisecond: +process.env.JWT_EXPIRES_IN_MILISECOND || 3600000,
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        refreshExpiresInMilisecond:
            +process.env.JWT_REFRESH_EXPIRES_IN_MILISECOND || 86400000,
    },

    timezone: process.env.TZ || 'UTC',
    dateFormat: process.env.DATE_FORMAT || 'YYYY-MM-DD HH:mm:ss',
};
