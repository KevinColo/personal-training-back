import { EntityRepository, Repository } from 'typeorm';
import { Exercise } from './exercise.entity';

@EntityRepository(Exercise)
export class ExerciseRepository extends Repository<Exercise> {
  // Ajoutez ici les méthodes spécifiques du repository si nécessaire
}
