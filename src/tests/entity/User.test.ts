import { User } from '../../entity/User';

describe('ユーザーモデル テスト', () => {
  const userParams = {
    firstname: 'Yamada',
    lastname: 'Taro',
    age: 25,
  };
  it('ユーザーインスタンス作成 名前、名字、年齢が存在する場合、作成成功', () => {
    const user = new User(
      userParams.firstname,
      userParams.lastname,
      userParams.age,
    );
    expect(user).toBeInstanceOf(User);
    expect(user.firstname).toBe(userParams.firstname);
    expect(user.lastname).toBe(userParams.lastname);
    expect(user.age).toBe(userParams.age);
  });

  it('ユーザーインスタンス作成 名前、名字が存在する場合、作成成功', () => {
    const user = new User(
      userParams.firstname,
      userParams.lastname,
    );
    expect(user).toBeInstanceOf(User);
    expect(user.firstname).toBe(userParams.firstname);
    expect(user.lastname).toBe(userParams.lastname);
    expect(user.age).toBeUndefined();
  });
});
