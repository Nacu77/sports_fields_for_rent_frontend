export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  phoneNumber: string;
}

export enum Role {
  ADMIN = 'Admin',
  OWNER = 'Field Owner',
  USER = 'Base User',
}
