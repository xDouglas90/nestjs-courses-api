import { IsString, Length } from 'class-validator';

export class CreateCourseDto {
  @IsString({
    message: 'Name must be a string',
  })
  @Length(1, 100, {
    message: 'Name must be between 1 and 100 characters',
  })
  name: string;

  @IsString({
    message: 'Description must be a string',
  })
  @Length(3, 255, {
    message: 'Description must be between 3 and 255 characters',
  })
  description: string;

  @IsString({
    each: true,
    message: 'Tags must be an array of strings',
  })
  @Length(1, 100, {
    each: true,
    message: 'Tags must be between 1 and 100 characters',
  })
  tags: string[];
}
