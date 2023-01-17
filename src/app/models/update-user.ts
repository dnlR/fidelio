export class UpdateUser {
  constructor(
    public id: string,
    public name: string,
    public zipcode: number,
    public address: string,
    public phone: string,
  ) { }
}