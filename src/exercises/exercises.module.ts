import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';

@Module({
  providers: [ExercisesService, AuthService],
  controllers: [ExercisesController, AuthController],
})
export class ExercisesModule {}
