export interface User {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  fullName?: string;
  birthDate?: string;
  gender?: 'male' | 'female';
  image?: string;
  role?: 'user' | 'admin';
  createdAt?: string;
}
