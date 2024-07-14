export const ServiceNatsCommand = {
    AuthService: {
        Login: {
            VerifyUserByEmailAndPassword:
                'auth:login:verifyUserByEmailAndPassword',
            GetUserById: 'auth:login:getUserById',
            GetUserByEmail: 'auth:login:getUserByEmail',
        },
        Permissions: {
            FetchPaginate: 'auth:permissions:fetchPaginate',
            FindOneById: 'auth:permissions:findOneById',
            GetPermissionsByRoleIds: 'auth:permissions:GetPermissionsByRoleIds',
        },
        Roles: {
            FetchPaginate: 'auth:roles:fetchPaginate',
        },
    },
};
