export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public zipcode: number,
    public address: string,
    public phone: string,
    public tos_accepted: boolean
  ) { }
}