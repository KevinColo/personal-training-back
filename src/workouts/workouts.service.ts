import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { Workout } from './workout.entity';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,
  ) {}

  async create(workout: Workout): Promise<Workout> {
    return this.workoutRepository.save(workout);
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
