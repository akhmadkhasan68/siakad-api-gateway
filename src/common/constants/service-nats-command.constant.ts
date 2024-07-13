export const SERVICE_NATS_COMMAND = {
    AUTH_SERVICE: {
        LOGIN: {
            VERIFY_USER_BY_EMAIL_AND_PASSWORD: 'auth:login:verifyUserByEmailAndPassword',
            GET_USER_BY_ID: 'auth:login:getUserById',
            GET_USER_BY_EMAIL: 'auth:login:getUserByEmail',
        },
        PERMISSIONS: {
            FETCH_PAGINATE: 'auth:permissions:fetchPaginate',
            GET_PERMISSIONS_BY_ROLE_IDS: 'auth:permissions:GetPermissionsByRoleIds',
        }
    }
}
