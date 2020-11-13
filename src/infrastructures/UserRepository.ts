import { createConnection, getConnection } from 'typeorm';
import { User } from '../entity/User';
import configOptions from '../common/db-option';

class UserRepository {
  public fetchAll = async () => {
    try {
      const connection = await createConnection(configOptions());
      const results = await User.find();
      connection.close();
      return results;
    } catch (err) {
      throw new Error(err);
    }
  };

  public fetch = async (id: string) => {
    try {
      const connection = await createConnection(configOptions());
      const results = await User.findOne(id);
      connection.close();
      return results;
    } catch (err) {
      throw new Error(err);
    }
  };

  public save = async (reqBody: any) => {
    try {
      const user = new User(
        reqBody.firstname,
        reqBody.lastname,
        reqBody.age ? parseInt(reqBody.age, 10) : undefined,
      );
      const connection = await createConnection(configOptions());
      await getConnection().transaction(async (transactionalEntityManager) => {
        const results = await transactionalEntityManager.save(user);
        return results;
      });
      connection.close();
    } catch (err) {
      throw new Error(err);
    }
  };

  public update = async (id: string, reqBody: any) => {
    try {
      const connection = await createConnection(configOptions());
      await getConnection().transaction(async (transactionalEntityManager) => {
        const user = await User.findOneOrFail(id);
        User.merge(user, reqBody);
        const results = await transactionalEntityManager.save(user);
        return results;
      });
      connection.close();
    } catch (err) {
      throw new Error(err);
    }
  };

  public delete = async (id: string) => {
    try {
      const connection = await createConnection(configOptions());
      await getConnection().transaction(async (transactionalEntityManager) => {
        const results = await transactionalEntityManager.delete(User, id);
        return results;
      });
      connection.close();
    } catch (err) {
      throw new Error(err);
    }
  };
}

export default UserRepository;
