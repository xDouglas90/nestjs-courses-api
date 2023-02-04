import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { courseProviders } from './courses.provider';
import { databaseProvider } from 'src/core/database/database.provider';

@Module({
  imports: [],
  controllers: [CoursesController],
  providers: [...databaseProvider, ...courseProviders, CoursesService],
})
export class CoursesModule {}
