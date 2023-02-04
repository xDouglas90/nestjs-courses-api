import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from './entities/course.entity';
import { TagEntity } from './entities/tag.entity';

@Injectable()
export class CoursesService {
  constructor(
    @Inject('COURSE_REPOSITORY')
    private readonly courseRepository: Repository<CourseEntity>,

    @Inject('TAG_REPOSITORY')
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async insert(createCourseDto: CreateCourseDto): Promise<CourseEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const tags = await Promise.all(
          createCourseDto.tags.map(async (name) => this.preloadTagByName(name)),
        );

        const response = await this.courseRepository.insert({
          ...createCourseDto,
          tags,
        });

        const { id } = response.generatedMaps[0];

        const created: CourseEntity = new CourseEntity();
        created.id = id;
        created.name = createCourseDto.name;
        created.description = createCourseDto.description;
        created.tags = tags;

        await this.courseRepository.save(created);

        resolve(created);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async findAll(): Promise<CourseEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.courseRepository.find({
          relations: ['tags'],
        });
        resolve(response);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async findOne(id: number): Promise<CourseEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.courseRepository.findOne({
          where: {
            id,
          },
          relations: ['tags'],
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

  async update(
    id: number,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CourseEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const tags =
          updateCourseDto.tags &&
          (await Promise.all(
            updateCourseDto.tags.map(async (name) =>
              this.preloadTagByName(name),
            ),
          ));

        const response = await this.courseRepository.preload({
          id,
          ...updateCourseDto,
          tags,
        });

        if (!response) {
          reject({
            code: 404,
            detail: 'Course not found',
          });
        }

        await this.courseRepository.save(response);

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

  private async preloadTagByName(name: string): Promise<TagEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.tagRepository.findOne({
          where: {
            name,
          },
        });
        if (!response) {
          const tag = new TagEntity();
          tag.name = name;
          const created = await this.tagRepository.save(tag);
          resolve(created);
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
}
