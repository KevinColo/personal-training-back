import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
