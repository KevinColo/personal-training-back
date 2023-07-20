import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkoutTemplate } from './workout-template.entity';
import { WorkoutTemplatesService } from './workout-templates.service';
import { WorkoutTemplatesController } from './workout-templates.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutTemplate])],
  providers: [WorkoutTemplatesService],
  controllers: [WorkoutTemplatesController],
})
export class WorkoutTemplatesModule {}
