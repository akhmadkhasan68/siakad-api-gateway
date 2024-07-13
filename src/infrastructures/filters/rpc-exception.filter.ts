import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { IApiResponse } from 'src/common/interfaces/response.interface';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error: any = exception.getError();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    try {
        const statusCode = error?.statusCode;
        const message = error?.message;
        const errors = error?.errors;

        response
        .status(statusCode)
        .json(<IApiResponse<null>>{
            code: statusCode,
            data: null,
            message: message,
            errors: errors,
        });
    } catch (error) {
        response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(<IApiResponse<null>>{
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            data: null,
            message: 'Internal Server Error',
            errors: 'Something went wrong. Please try again later.',
        });
    }

    return;
  }
}
