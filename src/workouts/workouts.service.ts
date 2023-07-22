import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { Workout } from './workout.entity';
import { Exercise } from '../exercises/exercise.entity';
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

  async generateWorkout(training: WorkoutModel): Promise<Workout> {
    let chosenExercises: Exercise[];
    if (typeof training.exercises === 'number') {
      // Assurez-vous que le nombre d'exercices est valide
      if (training.exercises < 4 || training.exercises > 20) {
        throw new BadRequestException(
          'Number of exercises must be between 4 and 20.',
        );
      }
      // Récupérez tous les exercices
      const allExercises = await this.exercisesService.findAll();
      // Filtrer les exercices en fonction de la difficulté
      const filteredExercises = allExercises.filter(
        (exercise) => exercise.difficulty === training.difficulty,
      );
      // Vérifiez qu'il y a suffisamment d'exercices
      if (filteredExercises.length < training.exercises) {
        throw new BadRequestException(
          'Not enough exercises for the requested difficulty.',
        );
      }
      // Choisissez aléatoirement des exercices
      chosenExercises = this.chooseRandomItems(
        filteredExercises,
        training.exercises,
      );
    } else {
      // L'utilisateur a fourni une liste spécifique d'exercices
      chosenExercises = training.exercises;
    }
    if (training.duration < 8 || training.duration > 45) {
      throw new BadRequestException(
        'Workout duration must be between 8 and 45 minutes.',
      );
    }
    // Récupérez tous les exercices et templates de workout
    const allWorkoutTemplates = await this.workoutTemplatesService.findAll();
    // Filtrer les exercices et les templates de workout en fonction de la difficulté
    //TODO si un nombre d'xercice est choisi au lieu d'une liste
    // const allExercises = await this.exercisesService.findAll();
    // const filteredExercises = allExercises.filter(
    //  (exercise) => exercise.difficulty === training.difficulty,
    //);
    const filteredWorkoutTemplates = allWorkoutTemplates.filter(
      (workoutTemplate) => workoutTemplate.intensity === training.difficulty,
    );
    // TODO gérer les exception sur les exercices et les templates
    // Choisissez aléatoirement des exercices et un template de workout
    const chosenWorkoutTemplate: WorkoutTemplate = this.chooseRandomItem(
      filteredWorkoutTemplates,
    );
    // Créez le workout
    const workout = new Workout();
    workout.exercises = chosenExercises;
    workout.workoutTemplate = chosenWorkoutTemplate;
    // Calculez le temps total du workout et ajustez le nombre de rounds si nécessaire
    const totalWorkoutTime = chosenWorkoutTemplate.getTotalTime();
    if (totalWorkoutTime > training.duration) {
      const ratio = training.duration / totalWorkoutTime;
      chosenWorkoutTemplate.numRounds = Math.floor(
        chosenWorkoutTemplate.numRounds * ratio,
      );
    }
    // Retournez le workout généré
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
    return this.workoutRepository.findOne(options);
  }

  async remove(id: number) {
    const result = await this.workoutRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    return result;
  }
}
