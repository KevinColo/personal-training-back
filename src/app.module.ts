import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ExercisesModule } from './exercises/exercises.module';
import { WorkoutsController } from './workouts/workouts.controller';
import { WorkoutsService } from './workouts/workouts.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { ProgressController } from './progress/progress.controller';
import { ProgressService } from './progress/progress.service';

@Module({
  imports: [UsersModule, ExercisesModule],
  controllers: [
    AppController,
    WorkoutsController,
    AuthController,
    ProgressController,
  ],
  providers: [AppService, WorkoutsService, AuthService, ProgressService],
})
export class AppModule {}
