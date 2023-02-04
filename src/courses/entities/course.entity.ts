import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TagEntity } from './tag.entity';

/*
    +-------------+--------------+----------------------------+
    |                          course                           |
    +-------------+--------------+----------------------------+
    | id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
    | name        | varchar(100) |                            |
    | description | varchar(255) |                            |
    | tags        | Tag[]        |                            |
    +-------------+--------------+----------------------------+
*/

@Entity('courses')
export class CourseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  description: string;

  @JoinTable({
    name: 'course_tags',
    joinColumn: {
      name: 'course_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  @ManyToMany(() => TagEntity, (tag: TagEntity) => tag.courses, {
    cascade: true,
  })
  tags: TagEntity[];
}
