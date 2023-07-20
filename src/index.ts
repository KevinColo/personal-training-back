import { Exercise } from './exercises/exercise.entity';
import { Workout } from './workouts/workout.entity';
import { WorkoutTemplate } from './workout-template/workout-template.entity';

const entities = [Exercise, Workout, WorkoutTemplate];

export { Exercise, Workout, WorkoutTemplate };
export default entities;
