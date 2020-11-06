import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from '../entity/User';

define(User, (faker: typeof Faker) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const age = faker.random.number();

  const user = new User(firstName, lastName, age);
  return user;
});
