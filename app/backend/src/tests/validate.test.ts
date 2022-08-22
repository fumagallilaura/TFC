import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from '../app';
import { Response } from 'superagent';
import Users from '../database/models/Users';
import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /login/validate', () => {
  const users = [
    {
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      // senha: secret_admin
    },
    {
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
      // senha: secret_user
    },
  ];

  let response: Response;
  let token: string;

  beforeEach(sinon.restore);

  it('login with success', async () => {
    sinon.stub(Users, 'findOne').resolves(users[0] as Users);
    sinon.stub(jwt, 'verify').resolves(users[0].email as string);
    response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    token = response.body.token;

    response = await chai.request(app).get('/login/validate').set('Authorization', token);

    expect(response).to.have.status(200);
    expect(response.body.role).to.equal('admin');
  })
})