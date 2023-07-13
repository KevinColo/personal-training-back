import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesService } from './exercises.service';
import { Exercise } from './exercise.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult, FindManyOptions } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ExercisesService', () => {
  let service: ExercisesService;
  let repository: Repository<Exercise>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExercisesService,
        {
          provide: getRepositoryToken(Exercise),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ExercisesService>(ExercisesService);
    repository = module.get<Repository<Exercise>>(getRepositoryToken(Exercise));
  });

  describe('create', () => {
    it('should create a new exercise', async () => {
      const exercise: Exercise = {
        id: 1,
        name: 'Exercise 1',
        description: 'Description 1',
        muscleGroup: 'Chest',
        intensity: 'Low',
        difficulty: 'Easy',
      };
      jest.spyOn(repository, 'save').mockResolvedValue(exercise);

      const result = await service.create(exercise);

      expect(result).toEqual(exercise);
      expect(repository.save).toHaveBeenCalledWith(exercise);
    });
  });

  describe('delete', () => {
    it('should delete an existing exercise', async () => {
      const id = 1;
      const deleteResult: DeleteResult = {
        affected: 1,
        raw: {},
      };
      jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);

      await expect(service.delete(id)).resolves.toEqual({
        affected: 1,
        raw: {},
      });
      expect(repository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException for non-existing exercise', async () => {
      const id = 1;
      const deleteResult: DeleteResult = {
        affected: 0,
        raw: {},
      };
      jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);

      await expect(service.delete(id)).rejects.toThrow(NotFoundException);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('findAll', () => {
    it('should return all exercises', async () => {
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
      const findOptions: FindManyOptions<Exercise> = {};
      jest.spyOn(repository, 'find').mockResolvedValue(exercises);

      const result = await service.findAll();

      expect(result).toEqual(exercises);
      expect(repository.find).toHaveBeenCalledWith(findOptions);
    });

    it('should return exercises filtered by muscleGroup', async () => {
      const muscleGroup = 'Chest';
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
          muscleGroup: 'Chest',
          intensity: 'Medium',
          difficulty: 'Medium',
        },
      ];
      const findOptions: FindManyOptions<Exercise> = {
        where: { muscleGroup },
      };
      jest.spyOn(repository, 'find').mockResolvedValue(exercises);

      const result = await service.findAll(muscleGroup);

      expect(result).toEqual(exercises);
      expect(repository.find).toHaveBeenCalledWith(findOptions);
    });

    // Autres cas de test pour les filtres intensity et difficulty
  });
});
