import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService, User } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: User): void {
    this.usersService.create(user);
  }

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }
}
