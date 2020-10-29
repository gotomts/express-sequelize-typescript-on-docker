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

  public save = async (user: any) => {
    try {
      const results = await User.save(user);
      return results;
    } catch (err) {
      throw new Error(err);
    }
  };

  public update = async (id: string, reqBody: any) => {
    try {
      const user = await User.findOneOrFail(id);
      User.merge(user, reqBody);
      const results = await User.save(user);
      return results;
    } catch (err) {
      throw new Error(err);
    }
  };

  public delete = async (id: string) => {
    try {
      const results = await User.delete(id);
      return results;
    } catch (err) {
      throw new Error(err);
    }
  };
}

export default UserRepository;
