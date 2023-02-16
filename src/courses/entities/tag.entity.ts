import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('tags')
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    nullable: false,
    length: 100,
  })
  name: string;

  @ManyToMany(() => CourseEntity, (course: CourseEntity) => course.tags)
  courses: CourseEntity[];

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @BeforeInsert()
  generatedId() {
    if (this.id) return;

    this.id = uuidv4();
  }
}
