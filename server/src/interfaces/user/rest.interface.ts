export interface RestCreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  groupId: string;
  role: string;
}

export interface RestGetUser {
  email: string;
  password: string;
}
