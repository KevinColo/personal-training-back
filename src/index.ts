import { Exercise } from './exercises/exercise.entity';
import { Workout } from './workouts/workout.entity';
import { WorkoutTemplate } from './workout-template/workout-template.entity';
import { Article } from './blog/entities/article.entity';
import { Category } from './blog/entities/category.entity';

const entities = [Article, Category, Exercise, Workout, WorkoutTemplate];

export { Article, Category, Exercise, Workout, WorkoutTemplate };
export default entities;
