import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  private users: User[] = [];

  signUp(user: User) {
    // TODO: Add password hashing and validation
    this.users.push(user);
  }

  signIn(user: User) {
    const foundUser = this.users.find(
      (u) => u.username === user.username && u.password === user.password,
    );
    if (!foundUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // TODO: Return JWT or other form of token
  }
}
