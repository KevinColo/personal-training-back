import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesService, Exercise } from './exercises.service';
import { HttpException } from '@nestjs/common';

describe('ExercisesService', () => {
  let service: ExercisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExercisesService],
    }).compile();

    service = module.get<ExercisesService>(ExercisesService as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an exercise and find all exercises', () => {
    service.create(
      new Exercise(
        1,
        'Push-up',
        'Bodyweight exercise',
        'Chest',
        'Medium',
        'Easy',
      ),
    );
    expect(service.findAll()).toEqual([
      new Exercise(
        1,
        'Push-up',
        'Bodyweight exercise',
        'Chest',
        'Medium',
        'Easy',
      ),
    ]);
  });
  it('should throw an error if an exercise already exists', () => {
    service.create(
      new Exercise(
        1,
        'Push-up',
        'Bodyweight exercise',
        'Chest',
        'Medium',
        'Easy',
      ),
    );
    expect(() =>
      service.create(
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
});
