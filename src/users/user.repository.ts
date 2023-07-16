import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Ajoutez ici les méthodes spécifiques du repository si nécessaire
}
