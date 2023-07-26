import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutModel } from './workout.model';
import { Workout } from './workout.entity';
import { ExercisesService } from '../exercises/exercises.service';
import { WorkoutTemplatesService } from '../workout-template/workout-templates.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Exercise } from '../exercises/exercise.entity';
import { Repository } from 'typeorm';
import { WorkoutTemplate } from '../workout-template/workout-template.entity';

describe('WorkoutService', () => {
  let service: WorkoutsService;
  let workoutTemplateService: WorkoutTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExercisesService,
        WorkoutsService,
        WorkoutTemplatesService,
        {
          provide: getRepositoryToken(Exercise),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Workout),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(WorkoutTemplate),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<WorkoutsService>(WorkoutsService);
    workoutTemplateService = module.get<WorkoutTemplatesService>(
      WorkoutTemplatesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateWorkout', () => {
    it('should throw an error if not enough exercises for the requested difficulty', async () => {
      // Arrange
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue([{ exercisesId: [1, 2] } as Workout]);
      jest.spyOn(workoutTemplateService, 'findAll').mockResolvedValue([
        {
          numRounds: 4,
          intensity: 'Hard',
          numExercisesRound: 4,
          getTotalTime: () => 100,
        } as WorkoutTemplate,
      ]);
      // Assert
      await expect(
        service.generateWorkout({
          difficulty: 'Hard',
          exercisesId: [1, 2, 3],
        } as WorkoutModel),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create a workout with the given duration and exercise ids', async () => {
      // Arrange
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue([
          { exercisesId: [1, 2], duration: 3000 } as Workout,
        ]);
      jest.spyOn(workoutTemplateService, 'findAll').mockResolvedValue([
        {
          numRounds: 4,
          numExercisesRound: 2,
          intensity: 'Medium',
          getTotalTime: () => 3600,
        } as WorkoutTemplate,
      ]); // Fill in your mock exercises and workout templates here
      const userPreferences: WorkoutModel = {
        exercisesId: [1],
        duration: 1800,
        difficulty: 'Medium',
      };

      // Act
      const workout = await service.generateWorkout(userPreferences);

      // Assert
      expect(workout.duration).toBe(userPreferences.duration);
      expect(workout.exercisesId.length).toEqual(4);
      expect(workout.exercisesId).toEqual([
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
      ]);
      // Add more expectations here as necessary
    });

    // Add more tests here as necessary
  });
});
