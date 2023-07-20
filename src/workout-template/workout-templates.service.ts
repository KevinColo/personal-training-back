import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, Repository } from 'typeorm';

import { WorkoutTemplate } from './workout-template.entity';
import { WorkoutTemplateSetsEntity } from './workout-template-sets.entity';
import { WorkoutTemplateMuscleBuildingEntity } from './workout-template-muscle-building.entity';

@Injectable()
export class WorkoutTemplatesService {
  constructor(
    @InjectRepository(WorkoutTemplate)
    private readonly workoutTemplateRepository: Repository<WorkoutTemplate>,
  ) {}

  async create(
    workoutTemplate:
      | WorkoutTemplate
      | WorkoutTemplateMuscleBuildingEntity
      | WorkoutTemplateSetsEntity,
  ) {
    return this.workoutTemplateRepository.save(workoutTemplate);
  }

  async findAll(): Promise<WorkoutTemplate[]> {
    return this.workoutTemplateRepository.find();
  }

  async findOne(id: number): Promise<WorkoutTemplate> {
    const options: FindManyOptions<WorkoutTemplate> = {};
    options.where = { id };
    return this.workoutTemplateRepository.findOne(options);
  }

  async remove(id: number): Promise<DeleteResult> {
    const result = await this.workoutTemplateRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`WorkoutTemplate with ID ${id} not found`);
    }
    return result;
  }
}
