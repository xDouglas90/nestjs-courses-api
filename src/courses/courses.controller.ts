import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from './entities/course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async insert(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<CourseEntity> {
    try {
      return await this.coursesService.insert(createCourseDto);
    } catch (error) {
      if (error.code === '23505')
        throw new HttpException(
          {
            reason: error?.detail,
          },
          HttpStatus.CONFLICT,
        );

      throw new HttpException(
        {
          reason: error?.detail,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(): Promise<CourseEntity[]> {
    try {
      return await this.coursesService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          reason: error?.detail,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CourseEntity> {
    try {
      return await this.coursesService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        {
          reason: error?.detail,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<CourseEntity> {
    try {
      return await this.coursesService.update(+id, updateCourseDto);
    } catch (error) {
      if (error.code === '20000')
        throw new HttpException(
          {
            reason: error?.detail,
          },
          HttpStatus.OK,
        );

      throw new HttpException(
        {
          reason: error?.detail,
        },
        HttpStatus.NOT_MODIFIED,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.coursesService.delete(+id);
      return;
    } catch (error) {
      if (error.code === '20000')
        throw new HttpException(
          {
            reason: error?.detail,
          },
          HttpStatus.OK,
        );

      throw new HttpException(
        {
          reason: error?.detail,
        },
        HttpStatus.NOT_MODIFIED,
      );
    }
  }
}
