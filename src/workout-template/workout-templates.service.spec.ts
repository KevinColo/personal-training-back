import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { WorkoutTemplatesService } from './workout-templates.service';
import { WorkoutTemplate } from './workout-template.entity';
import { WorkoutTemplateMuscleBuildingEntity } from './workout-template-muscle-building.entity';

describe('WorkoutTemplatesService', () => {
  let service: WorkoutTemplatesService;
  let repo: Repository<WorkoutTemplate>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutTemplatesService,
        {
          provide: getRepositoryToken(WorkoutTemplate),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WorkoutTemplatesService>(WorkoutTemplatesService);
    repo = module.get<Repository<WorkoutTemplate>>(
      getRepositoryToken(WorkoutTemplate),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const workoutTemplateTypeMuscle = [
      new WorkoutTemplateMuscleBuildingEntity(
        1,
        'Type 1 Workout 1',
        'Description 1',
        4,
        30,
        30,
        10,
        'Medium',
        10,
      ),
      new WorkoutTemplateMuscleBuildingEntity(
        2,
        'Type 1 Workout 2',
        'Description 2',
        3,
        20,
        10,
        15,
        'High',
        10,
      ),
      // ...
    ];

    it('should return a saved workout template', async () => {
      const workoutTemplate: WorkoutTemplate = {
        id: 1,
        name: 'Test Workout Template',
      } as WorkoutTemplate;
      jest.spyOn(repo, 'save').mockResolvedValue(workoutTemplate);

      expect(await service.create(workoutTemplate)).toBe(workoutTemplate);
    });

    it('should create workout template type muscle', () => {
      workoutTemplateTypeMuscle.forEach(async (data) => {
        jest.spyOn(repo, 'save').mockResolvedValue(data);
        expect(await service.create(data)).toEqual(data);
      });
    });
  });

  describe('findAll', () => {
    it('should return all workout templates', async () => {
      const workoutTemplates: WorkoutTemplate[] = [
        { id: 1, name: 'Test Workout Template 1' } as WorkoutTemplate,
        { id: 2, name: 'Test Workout Template 2' } as WorkoutTemplate,
      ];
      jest.spyOn(repo, 'find').mockResolvedValue(workoutTemplates);

      expect(await service.findAll()).toBe(workoutTemplates);
    });
  });

  describe('findOne', () => {
    it('should return a single workout template', async () => {
      const workoutTemplate: WorkoutTemplate = {
        id: 1,
        name: 'Test Workout Template',
      } as WorkoutTemplate;
      jest.spyOn(repo, 'findOne').mockResolvedValue(workoutTemplate);

      expect(await service.findOne(1)).toBe(workoutTemplate);
    });
  });

  describe('remove', () => {
    it('should delete a workout template and return affected result', async () => {
      const deleteResult: DeleteResult = { affected: 1, raw: {} };
      jest.spyOn(repo, 'delete').mockResolvedValue(deleteResult);

      expect(await service.remove(1)).toBe(deleteResult);
    });

    it('should throw an error if no workout template was found to delete', async () => {
      const deleteResult: DeleteResult = { affected: 0, raw: {} };
      jest.spyOn(repo, 'delete').mockResolvedValue(deleteResult);

      await expect(service.remove(1)).rejects.toThrow();
    });
  });
});
