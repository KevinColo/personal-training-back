import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { Workout } from './workout.entity';
import { ExercisesService } from '../exercises/exercises.service';
import { WorkoutTemplatesService } from '../workout-template/workout-templates.service';
import { WorkoutModel } from './workout.model';
import { WorkoutTemplate } from '../workout-template/workout-template.entity';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,
    private readonly exercisesService: ExercisesService,
    private readonly workoutTemplatesService: WorkoutTemplatesService,
  ) {}

  // Generate workout based on user preferences
  async generateWorkout(userPreferences: WorkoutModel): Promise<Workout> {
    // Retrieve all exercises from the database
    //const allExercises = await this.exercisesService.findAll();

    //// Filter exercises based on user's difficulty preference
    //const filteredExercises = allExercises.filter(
    //  (exercise) => exercise.difficulty === userPreferences.difficulty,
    //);

    //// Check that there are enough exercises for the requested difficulty
    //if (filteredExercises.length < userPreferences.exercises.length) {
    //  throw new BadRequestException(
    //    'Not enough exercises for the requested difficulty.',
    //  );
    //}

    // Choose random exercises based on user's preference
    // const chosenExercises = this.chooseRandomItems(
    //   filteredExercises,
    //   userPreferences.numExercises,
    // );

    // Create new workout
    const workout = new Workout();
    workout.exercisesId = userPreferences.exercisesId;
    workout.duration = userPreferences.duration;
    workout.name = 'userPreferences.duration';
    // Retrieve all workout templates from the database
    const allWorkoutTemplates = await this.workoutTemplatesService.findAll();
    // Filter workout templates based on user's difficulty preference
    const filteredWorkoutTemplates: WorkoutTemplate[] =
      allWorkoutTemplates.filter(
        (workoutTemplate) =>
          workoutTemplate.intensity === userPreferences.difficulty,
      );

    // Choose random workout template
    const chosenWorkoutTemplate = this.chooseRandomItem(
      filteredWorkoutTemplates,
    );
    workout.workoutTemplate = chosenWorkoutTemplate;
    // Calculate total workout time and adjust number of rounds if necessary
    const totalWorkoutTime = chosenWorkoutTemplate.getTotalTime();
    if (totalWorkoutTime > userPreferences.duration) {
      const ratio = userPreferences.duration / totalWorkoutTime;
      chosenWorkoutTemplate.numRounds = Math.floor(
        chosenWorkoutTemplate.numRounds * ratio,
      );
    }

    // Save and return generated workout
    await this.workoutRepository.save(workout);
    return workout;
  }

  chooseRandomItems<T>(items: T[], numItems: number): T[] {
    const chosenItems = [];
    for (let i = 0; i < numItems; i++) {
      const index = Math.floor(Math.random() * items.length);
      chosenItems.push(items[index]);
      items.splice(index, 1); // Enlève l'item choisi pour éviter les doublons
    }
    return chosenItems;
  }

  chooseRandomItem<T>(items: T[]): T {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
  }

  async findAll(): Promise<Workout[]> {
    return this.workoutRepository.find();
  }

  async findOne(id: number) {
    const options: FindManyOptions<Workout> = {};
    options.where = { id };
    options.relations = ['workoutTemplate'];
    const workout = await this.workoutRepository.findOne(options);
    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }

    // Retrieve exercises
    const exercises = await this.exercisesService.findSome(workout.exercisesId);

    // Build the workout
    const workoutRounds = [];
    for (let round = 0; round < workout.workoutTemplate.numRounds; round++) {
      const roundExercises = [];
      for (
        let exerciseIndex = 0;
        exerciseIndex < workout.workoutTemplate.numExercisesRound;
        exerciseIndex++
      ) {
        // Use exercises in order, and start over from the beginning if necessary
        const exercise = exercises[exerciseIndex % exercises.length];
        roundExercises.push(exercise.id); // Store only the exercise ID
      }
      workoutRounds.push(roundExercises);
    }

    // Add rounds of exercises to the workout
    workout.exercisesId = workoutRounds; // Store only the exercise IDs

    return workout;
  }

  async remove(id: number) {
    const result = await this.workoutRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    return result;
  }
}
