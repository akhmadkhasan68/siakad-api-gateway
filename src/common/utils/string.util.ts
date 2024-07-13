import * as _ from 'lodash';

/**
 * snake case object key
 * @param obj
 */
export const snakeCaseKeyObj = (obj: { [x: string]: any }): { [x: string]: any } => {
    if (typeof obj != 'object') return obj;

    for (const oldName in obj) {
        // Camel to underscore
        const newName = _.snakeCase(oldName);

        // Only process if names are different
        if (newName != oldName) {
            // Check for the old property name to avoid a ReferenceError in strict mode.
            if (obj.hasOwnProperty(oldName)) {
                obj[newName] = obj[oldName];
                delete obj[oldName];
            }
        }

        // Recursion
        if (typeof obj[newName] == 'object') {
            obj[newName] = snakeCaseKeyObj(obj[newName]);
        }
    }
    return obj;
}

/**
 * camel case object key
 * @param obj
 */
export const camelCaseKeyObj = (obj: { [x: string]: any }): { [x: string]: any } => {
    if (typeof obj != 'object') return obj;

    for (const oldName in obj) {
        const newName = _.camelCase(oldName);

        if (newName != oldName) {
            if (obj.hasOwnProperty(oldName)) {
                obj[newName] = obj[oldName];
                delete obj[oldName];
            }
        }

        if (typeof obj[newName] == 'object') {
            obj[newName] = camelCaseKeyObj(obj[newName]);
        }
    }
    return obj;
}
