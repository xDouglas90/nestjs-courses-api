import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async insert(createCourseDto: CreateCourseDto): Promise<Course> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.courseRepository.insert(createCourseDto);
        const { id } = response.generatedMaps[0];
        const created: Course = new Course();
        created.id = id;
        created.name = createCourseDto.name;
        created.description = createCourseDto.description;
        created.tags = createCourseDto.tags;
        resolve(created);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async findAll(): Promise<Course[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.courseRepository.find();
        resolve(response);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async findOne(id: number): Promise<Course> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.courseRepository.findOne({
          where: {
            id,
          },
        });
        if (!response) {
          reject({
            code: 404,
            detail: 'Course not found',
          });
        }
        resolve(response);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.courseRepository.update(
          id,
          updateCourseDto,
        );
        const { affected } = response;
        if (affected === 0) {
          reject({
            code: 404,
            detail: 'Course not found',
          });
        }
        resolve(await this.findOne(id));
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async delete(id: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.courseRepository.delete(id);
        const { affected } = response;
        if (affected === 0) {
          reject({
            code: 404,
            detail: 'Course not found',
          });
        }
        resolve(true);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }
}
