import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from '../../config';
import { parseDatetimeObj } from 'src/common/utils/date.util';
import { snakeCaseKeyObj } from 'src/common/utils/string.util';
import { IApiResponse } from 'src/common/interfaces/response.interface';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        return next.handle().pipe(
            map((data: IApiResponse<any>) => {
                if (data?.data) {
                    data.data = snakeCaseKeyObj(data.data);
                    data.data = parseDatetimeObj(
                        data.data,
                        request.headers['timezone'] != undefined
                            ? request.headers['timezone']?.toString()
                            : config.timezone,
                    );
                }

                if (data?.meta) {
                    data.meta = {
                        page: snakeCaseKeyObj(data.meta).page,
                        perPage: snakeCaseKeyObj(data.meta).per_page,
                        total: snakeCaseKeyObj(data.meta).total,
                        totalPage: snakeCaseKeyObj(data.meta).total_page,
                    }
                    data.meta = parseDatetimeObj(
                        data.meta,
                        request.headers['timezone'] != undefined
                            ? request.headers['timezone']?.toString()
                            : config.timezone,
                    );
                }

                if (data?.code === undefined) {
                    data.code =
                        context.switchToHttp().getResponse().statusCode ||
                        200;
                }

                return data;
            }),
        );
    }
}
