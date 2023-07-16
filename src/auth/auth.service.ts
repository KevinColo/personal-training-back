import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  signUp(user: User): Promise<User> {
    // TODO: Add password hashing and validation
    return this.userRepository.save(user);
  }

  async signIn(user: User) {
    const options: FindManyOptions<User> = {};
    options.where = { username: user.username };
    options.where = { password: user.password };
    const foundUser = await this.userRepository.findOne(options);
    if (!foundUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      sub: foundUser.id,
      username: foundUser.username,
    };

    // Signez le token JWT en utilisant la clé secrète.
    // Retournez le token JWT à l'utilisateur.
    return this.jwtService.sign(payload);
  }

  async findUserById(id: number): Promise<User | null> {
    const options: FindManyOptions<User> = {};
    options.where = { id };
    return this.userRepository.findOne(options);
  }
}
