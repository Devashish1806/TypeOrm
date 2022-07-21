export class CreateUserDto {
  _id: string;
  name: string;
  email: string;
}

export class GetUserDto {
  email: string;
}
