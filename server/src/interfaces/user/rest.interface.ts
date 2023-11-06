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
  groupId: string;
  role: Role;
}

export interface RestGetUser {
  email: string;
  password: string;
}
