import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { CoursesModule } from './courses/courses.module';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/src/**/*.entity.ts'],
      migrations: [__dirname + '/migrations/*.ts'],
      autoLoadEntities: true,
      migrationsTableName: 'history',
      synchronize: true,
    }),
    CoursesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
