import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ExercisesModule } from './exercises/exercises.module';
import { WorkoutsController } from './workout/workouts.controller';
import { WorkoutsService } from './workout/workouts.service';

@Module({
  imports: [UsersModule, ExercisesModule],
  controllers: [AppController, WorkoutsController],
  providers: [AppService, WorkoutsService],
})
export class AppModule {}
