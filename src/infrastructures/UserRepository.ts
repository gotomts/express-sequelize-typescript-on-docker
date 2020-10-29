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

  public save = async (user: User) => {
    try {
      const results = await User.save(user);
      return results;
    } catch (err) {
      throw new Error(err);
    }
  };

  public update = async (id: string, user: User) => {
    try {
      const userResult = await User.findOneOrFail(id);
      User.merge(userResult, user);
      const results = await User.save(user);
      return results;
    } catch (err) {
      throw new Error(err);
    }
  };

  public delete = async (id: number) => {
    try {
      const results = await User.delete(id);
      return results;
    } catch (err) {
      throw new Error(err);
    }
  };
}

export default UserRepository;
