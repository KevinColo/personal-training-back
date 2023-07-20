import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth/auth.controller';
import { ExercisesController } from './exercises/exercises.controller';
import { ProgressController } from './progress/progress.controller';
import { UsersController } from './users/users.controller';
import { WorkoutsController } from './workouts/workouts.controller';
import { WorkoutTemplatesController } from './workout-template/workout-templates.controller';

import { ExercisesModule } from './exercises/exercises.module';
import { UsersModule } from './users/users.module';
import { WorkoutsModule } from './workouts/workouts.module';

import { AuthService } from './auth/auth.service';
import { ExercisesService } from './exercises/exercises.service';
import { ProgressService } from './progress/progress.service';
import { UsersService } from './users/users.service';
import { WorkoutsService } from './workouts/workouts.service';
import { WorkoutTemplatesService } from './workout-template/workout-templates.service';

import entities, { Exercise, Workout, WorkoutTemplate } from './index';
import { User } from './users/user.entity';
import { WorkoutTemplatesModule } from './workout-template/workout-templates.module';

@Module({
  imports: [
    UsersModule,
    ExercisesModule,
    WorkoutsModule,
    WorkoutTemplatesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Exercise, Workout, WorkoutTemplate]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'VOTRE_CLE_SECRETE',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    AuthController,
    ExercisesController,
    ProgressController,
    UsersController,
    WorkoutsController,
    WorkoutTemplatesController,
  ],
  providers: [
    AuthService,
    ExercisesService,
    ProgressService,
    UsersService,
    WorkoutsService,
    WorkoutTemplatesService,
  ],
})
export class AppModule {}
