import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutTemplatesController } from './workout-templates.controller';

describe('WorkoutTemplateController', () => {
  let controller: WorkoutTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutTemplatesController],
    }).compile();

    controller = module.get<WorkoutTemplatesController>(
      WorkoutTemplatesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
