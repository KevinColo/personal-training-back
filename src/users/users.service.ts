import { Injectable } from '@nestjs/common';

export class User {
  constructor(public id: number, public name: string, public email: string) {}
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: User) {
    this.users.push(user);
  }

  findAll(): User[] {
    return this.users;
  }
}
