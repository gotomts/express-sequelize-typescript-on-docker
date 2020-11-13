import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from '../entity/User';

define(User, (faker: typeof Faker) => {
  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();
  const age = faker.random.number();

  const user = new User(firstname, lastname, age);
  return user;
});
