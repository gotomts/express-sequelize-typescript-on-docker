import { Seeder, Factory } from 'typeorm-seeding';
// import { createConnection } from 'typeorm';
import { User } from '../entity/User';
// import option from '../common/db-option';

export default class CreateUsers implements Seeder {
  run = async (factory: Factory): Promise<void> => {
    await factory(User)().create();
  };
}
