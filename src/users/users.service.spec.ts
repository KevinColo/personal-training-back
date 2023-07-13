import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user and find all users', () => {
    service.create(new User(1, 'toto', '122', 'test@example.com'));
    expect(service.findAll()).toEqual([
      new User(1, 'toto', '122', 'test@example.com'),
    ]);
  });
});
