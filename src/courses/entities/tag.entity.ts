import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity('tags')
export class TagEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 100,
    name: 'name',
  })
  name: string;

  @ManyToMany(() => CourseEntity, (course: CourseEntity) => course.tags)
  courses: CourseEntity[];
}
