import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { Exercise } from './exercise.entity';

describe('ExercisesController', () => {
  let controller: ExercisesController;
  let service: ExercisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExercisesController],
      providers: [
        {
          provide: ExercisesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ExercisesController>(ExercisesController);
    service = module.get<ExercisesService>(ExercisesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

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
});
