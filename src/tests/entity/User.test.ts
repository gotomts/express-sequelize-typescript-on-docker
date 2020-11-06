import { User } from '../../entity/User';

describe('ユーザーモデル テスト', () => {
  const userParams = {
    firstName: 'Yamada',
    lastName: 'Taro',
    age: 25,
  };
  it('ユーザーインスタンス作成 名前、名字、年齢が存在する場合、作成成功', () => {
    const user = new User(
      userParams.firstName,
      userParams.lastName,
      userParams.age,
    );
    expect(user).toBeInstanceOf(User);
    expect(user.firstName).toBe(userParams.firstName);
    expect(user.lastName).toBe(userParams.lastName);
    expect(user.age).toBe(userParams.age);
  });

  it('ユーザーインスタンス作成 名前、名字が存在する場合、作成成功', () => {
    const user = new User(
      userParams.firstName,
      userParams.lastName,
    );
    expect(user).toBeInstanceOf(User);
    expect(user.firstName).toBe(userParams.firstName);
    expect(user.lastName).toBe(userParams.lastName);
    expect(user.age).toBeUndefined();
  });
});
