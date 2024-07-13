// import moment from 'moment-timezone';
import * as moment from "moment-timezone";
import { config } from "src/config";

/**
 * Parse datetime object key
 * @param obj
 */
export const parseDatetimeObj = (obj: { [x: string]: any }, timezone: string): any => {
    if (typeof obj != 'object') {
        return obj;
    }

    for (const oldName in obj) {
        // Recursion
        if (typeof obj[oldName] == 'object') {
            obj[oldName] = parseDatetimeObj(obj[oldName], timezone);
        }
    }

    if (obj instanceof Date) {
        const date = moment.tz(obj, timezone).format('YYYY-MM-DD HH:mm:ss');

        return date;
    }

    return obj;
}

export const getDateNow = (timezone?: string): Date => {
    const tz = timezone || config.timezone || 'UTC';

    return moment.tz(tz).toDate();
}

export const getUnixTimeNow = (timezone?: string): number => {
    const tz = timezone || config.timezone || 'UTC';

    return moment.tz(tz).unix();
}

export const formatDate = (date: Date, format?: string, timezone?: string): string => {
    const tz = timezone || config.timezone || 'UTC';
    const defaultFormat = format || 'YYYY-MM-DD HH:mm:ss';

    return moment.tz(date, tz).format(defaultFormat);
}
