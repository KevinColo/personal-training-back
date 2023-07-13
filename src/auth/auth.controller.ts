import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) user: User) {
    return this.authService.signUp(user);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) user: User) {
    return this.authService.signIn(user);
  }
}
