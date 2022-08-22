import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  const users: Array<object> = [
    {
      id: 1,
      username: "userA",
      role: "userA",
      email: "userA@email.com",
      password: "userA!@#$%¨&*()1234567890"
    },
    {
      id: 2,
      username: "userB",
      role: "userB",
      email: "userB@email.com",
      password: "userB!@#$%¨&*()1234567890"
    },
  ]

  const userC: object = {
    id: 3,
    username: "userC",
    role: "userC",
    email: "userC@email.com",
    password: "userC!@#$%¨&*()1234567890"
  }

  beforeEach(sinon.restore);
  let response: Response;
  describe('valid user', () => {
    it('should return status and token correct if valid user is provided', async () => {
      sinon.stub(Users, 'findOne').resolves(users[0] as Users);

      response = await chai
        .request(app)
        .post('/login')
        .send({
          email: "userA@email.com",
          password: "userA!@#$%¨&*()1234567890",
        });

      expect(response.status).to.be.equal(201);
      expect(response.body).to.have.property('token');
    })
  })
  /**
   * Exemplo do uso de stubs com tipos
   */
  // it('should create a new user', async () => {
  //   sinon.stub(Users, 'create').resolves()
  //   sinon.stub(Users, 'findOne').resolves(null);
  // })
  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
