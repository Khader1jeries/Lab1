export class User {
  constructor(
    public email: string,
    public password: string,
    public fullName: string,
    public birthDate: Date,
    public gender: string,
    public image: string,
    public isAdmin: boolean = false
  ) {}
}
