import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  age?: number;

  constructor(firstname: string, lastname: string, age?: number) {
    super();
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
  }
}

export default User;
