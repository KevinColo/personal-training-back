import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';

describe('WorkoutsController', () => {
  let workoutsController: WorkoutsController;
  let workoutsService: WorkoutsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsController],
      providers: [WorkoutsService],
    }).compile();

    workoutsController = module.get<WorkoutsController>(WorkoutsController);
    workoutsService = module.get<WorkoutsService>(WorkoutsService);
  });

  it('should be defined', () => {
    expect(workoutsController).toBeDefined();
  });
});
