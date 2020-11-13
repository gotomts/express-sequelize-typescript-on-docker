import request from 'supertest';
import { Connection } from 'typeorm';
import {
  useRefreshDatabase,
  tearDownDatabase,
  factory,
  useSeeding,
  setConnectionOptions,
} from 'typeorm-seeding';

import app from '../../app';
import { User } from '../../entity/User';

import ormconfig from '../../../ormconfig.json';

const configOption = {
  host: ormconfig[1].host,
  database: ormconfig[1].database,
};

describe('/', () => {
  let connection: Connection;

  beforeEach(async (done) => {
    setConnectionOptions(configOption);
    connection = await useRefreshDatabase();
    await useSeeding();
    done();
  });

  afterAll(async (done) => {
    await tearDownDatabase();
    done();
  });

  it('GET "/users"', async (done) => {
    const createUser = await factory(User)().createMany(10);
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    for (let i = 0; i < createUser.length; i++) {
      expect(response.body[i].id).toBe(createUser[i].id);
      expect(response.body[i].firstname).toBe(createUser[i].firstname);
      expect(response.body[i].lastname).toBe(createUser[i].lastname);
      expect(response.body[i].age).toBe(createUser[i].age);
    }
    done();
  });

  it('GET "/users/:id"', async (done) => {
    const createUser = await factory(User)().create();
    const response = await request(app).get(`/users/${createUser.id}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createUser.id);
    expect(response.body.firstname).toBe(createUser.firstname);
    expect(response.body.lastname).toBe(createUser.lastname);
    expect(response.body.age).toBe(createUser.age);
    done();
  });

  it('POST "/users"', async (done) => {
    const user = {
      firstname: 'Yamada',
      lastname: 'Taro',
      age: 21,
    };
    await request(app).post('/users').send(user).expect((response) => {
      expect(response.status).toBe(201);
    });
    const response = await request(app).get('/users/1').send(user);
    expect(response.body.firstname).toBe(user.firstname);
    expect(response.body.lastname).toBe(user.lastname);
    expect(response.body.age).toBe(user.age);
    done();
  });

  it('PUT "/users"', async (done) => {
    const createUser = await factory(User)().create();
    const user = {
      firstname: 'Satou',
    };
    await request(app).put(`/users/${createUser.id}`).send(user);

    const response = await request(app).get(`/users/${createUser.id}`).send(user);
    expect(response.status).toBe(200);
    expect(response.body.firstname).toBe(user.firstname);
    expect(response.body.lastname).toBe(createUser.lastname);
    expect(response.body.age).toBe(createUser.age);
    done();
  });

  it('DELETE "/users"', async (done) => {
    const createUser = await factory(User)().create();
    const deleteResponse = await request(app).delete(`/users/${createUser.id}`);
    expect(deleteResponse.status).toBe(200);

    const response = await request(app).get(`/users/${createUser.id}`);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
    done();
  });

});
