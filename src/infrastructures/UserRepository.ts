import { getConnection } from 'typeorm';
import { User } from '../entity/User';

class UserRepository {
  public fetchAll = async () => {
    try {
      const results = await User.find();
      return results;
    } catch (err) {
      throw new Error(err);
    }
  };

  public fetch = async (id: string) => {
    try {
      const results = await User.findOne(id);
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
      await getConnection().transaction(async (transactionalEntityManager) => {
        const results = await transactionalEntityManager.save(user);
        return results;
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  public update = async (id: string, reqBody: any) => {
    try {
      await getConnection().transaction(async (transactionalEntityManager) => {
        const user = await User.findOneOrFail(id);
        User.merge(user, reqBody);
        const results = await transactionalEntityManager.save(user);
        return results;
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  public delete = async (id: string) => {
    try {
      await getConnection().transaction(async (transactionalEntityManager) => {
        const results = await transactionalEntityManager.delete(User, id);
        return results;
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export default UserRepository;
