import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { ProgressController } from './progress/progress.controller';
import { WorkoutsController } from './workouts/workouts.controller';
import { ExercisesController } from './exercises/exercises.controller';

import { ExercisesModule } from './exercises/exercises.module';
import { UsersModule } from './users/users.module';

import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { ProgressService } from './progress/progress.service';
import { WorkoutsService } from './workouts/workouts.service';
import entities, { Exercise } from './index';
import { User } from './users/user.entity';
import { ExercisesService } from './exercises/exercises.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UserRepository } from './users/user.repository';
import { WorkoutsModule } from './workouts/workouts.module';
import { Workout } from './workouts/workout.entity';

@Module({
  imports: [
    UsersModule,
    ExercisesModule,
    WorkoutsModule,
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
    TypeOrmModule.forFeature([User, UserRepository, Exercise, Workout]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'VOTRE_CLE_SECRETE',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    AppController,
    WorkoutsController,
    AuthController,
    ProgressController,
    ExercisesController,
    UsersController,
  ],
  providers: [
    AppService,
    WorkoutsService,
    AuthService,
    ProgressService,
    ExercisesService,
    UsersService,
  ],
})
export class AppModule {}
