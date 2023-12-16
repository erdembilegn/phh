export enum Role {
  student = 'Student',
  teacher = 'Teacher',
  admin = 'Admin',
}

export interface RestCreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  groupId: string | null;
  role: Role;
}

export interface RestGetUser {
  email: string;
  password: string;
}

export interface RestGetUserByRoleGroup {
  role: string;
  groupId: string;
}

export interface RestUpdateUser {
  id : string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  groupId?: string | null;
  role?: Role;
}

export interface RestDeleteUser {
  id : string;
}