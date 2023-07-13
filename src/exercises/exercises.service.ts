import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from './exercise.entity';
import { DeleteResult, FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}

  async create(exercise: Exercise): Promise<Exercise> {
    return this.exerciseRepository.save(exercise);
  }

  async delete(id: number): Promise<DeleteResult> {
    const result = await this.exerciseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    return result;
  }

  async findAll(
    muscleGroup?: string,
    intensity?: string,
    difficulty?: string,
  ): Promise<Exercise[]> {
    const options: FindManyOptions<Exercise> = {};

    if (muscleGroup) {
      options.where = { muscleGroup };
    }

    if (intensity) {
      options.where = { ...options.where, intensity };
    }

    if (difficulty) {
      options.where = { ...options.where, difficulty };
    }

    return this.exerciseRepository.find(options);
  }
}
