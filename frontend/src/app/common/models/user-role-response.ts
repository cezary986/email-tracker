
export enum UserRole {
    ADMIN = 'ROLE_ADMIN',
    CLUB = 'ROLE_CLUB',
    REFEREE = 'ROLE_REFEREE',
}

export interface UserRoleResponse {
    Role: UserRole;
}
