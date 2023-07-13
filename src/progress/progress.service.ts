import { Injectable } from '@nestjs/common';
import { Progress } from './progress.entity';

@Injectable()
export class ProgressService {
  private progress: Progress[] = [];

  getProgress(userId: number) {
    return this.progress.find((p) => p.userId === userId);
  }

  updateProgress(userId: number, progress: Progress) {
    const existingProgress = this.progress.find((p) => p.userId === userId);
    if (existingProgress) {
      // TODO: Update existing progress
    } else {
      this.progress.push(progress);
    }
  }
}
