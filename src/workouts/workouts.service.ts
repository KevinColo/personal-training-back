import { Injectable } from '@nestjs/common';
import { Workout } from './workout.entity';

@Injectable()
export class WorkoutsService {
  private workouts: Workout[] = [];

  create(workout: Workout) {
    this.workouts.push(workout);
  }

  findAll() {
    return this.workouts;
  }

  findOne(id: number) {
    return this.workouts.find((workout) => workout.id === id);
  }

  remove(id: number) {
    this.workouts = this.workouts.filter((workout) => workout.id !== id);
  }
}
