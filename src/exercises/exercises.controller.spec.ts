import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { Exercise } from './exercise.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ExercisesController', () => {
  let controller: ExercisesController;
  let service: ExercisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExercisesController],
      providers: [
        ExercisesService,
        {
          provide: getRepositoryToken(Exercise),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ExercisesController>(ExercisesController);
    service = module.get<ExercisesService>(ExercisesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should throw an error if an exercise already exists', () => {
      jest.spyOn(service, 'create').mockImplementation(() => {
        throw new HttpException(
          'Exercise already exists',
          HttpStatus.BAD_REQUEST,
        );
      });
      expect(() =>
        controller.create(
          new Exercise(
            1,
            'Push-up',
            'Bodyweight exercise',
            'Chest',
            'Medium',
            'Easy',
          ),
        ),
      ).toThrow(HttpException);
    });
    it('should create a new exercise', async () => {
      const exercise: Exercise = {
        id: 1,
        name: 'Exercise 1',
        description: 'Description 1',
        muscleGroup: 'Chest',
        intensity: 'Low',
        difficulty: 'Easy',
      };
      jest.spyOn(service, 'create').mockResolvedValue(exercise);

      const result = await controller.create(exercise);

      expect(result).toEqual(exercise);
    });
  });

  describe('delete', () => {
    it('should delete an exercise', async () => {
      const id = 1;
      jest
        .spyOn(service, 'delete')
        .mockResolvedValue(Promise.resolve(undefined));

      await expect(controller.delete(id)).resolves.toBeUndefined();
      expect(service.delete).toHaveBeenCalledWith(id);
    });
  });

  it('should return an array of exercises', async () => {
    const exercises: Exercise[] = [
      {
        id: 1,
        name: 'Exercise 1',
        description: 'Description 1',
        muscleGroup: 'Chest',
        intensity: 'Low',
        difficulty: 'Easy',
      },
      {
        id: 2,
        name: 'Exercise 2',
        description: 'Description 2',
        muscleGroup: 'Legs',
        intensity: 'High',
        difficulty: 'Medium',
      },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(exercises);

    const result = await controller.findAll({});

    expect(result).toEqual(exercises);
  });
});
