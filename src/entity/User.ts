import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age?: number;

  constructor(firstName: string, lastName: string, age?: number) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
}

export default User;
