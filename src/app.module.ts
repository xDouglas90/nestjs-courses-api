import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';
import { databaseProvider } from './core/database/database.provider';
import { CoursesModule } from './courses/courses.module';
import { courseProviders } from './courses/courses.provider';

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    CoursesModule,
  ],
  controllers: [],
  providers: [...databaseProvider, ...courseProviders],
})
export class AppModule {}
