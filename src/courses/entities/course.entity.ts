import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/*
    +-------------+--------------+----------------------------+
    |                          course                           |
    +-------------+--------------+----------------------------+
    | id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
    | name        | varchar(100) |                            |
    | description | varchar(255) |                            |
    | tags        | boolean      |                            |
    +-------------+--------------+----------------------------+
*/

@Entity('courses')
export class Course {
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

  @Column({
    name: 'tags',
    type: 'json',
    nullable: true,
  })
  tags: string[];
}
