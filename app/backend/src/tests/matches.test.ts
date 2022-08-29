import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import auth from '../middlewares/Autentication';
import { app } from '../app';
import { Response } from 'superagent';
import Teams from '../database/models/Teams';

chai.use(chaiHttp);

const { expect } = chai;

const MatchMock = [
  {
    "id": 1,
    "homeTeam": 1,
    "homeTeamGoals": 1,
    "awayTeam": 7,
    "awayTeamGoals": 1,
    "inProgress": false
  },
  {
    "id": 2,
    "homeTeam": 2,
    "homeTeamGoals": 1,
    "awayTeam": 6,
    "awayTeamGoals": 1,
    "inProgress": false
  },
  {
    "id": 3,
    "homeTeam": 3,
    "homeTeamGoals": 3,
    "awayTeam": 5,
    "awayTeamGoals": 0,
    "inProgress": false
  },
  {
    "id": 4,
    "homeTeam": 3,
    "homeTeamGoals": 0,
    "awayTeam": 4,
    "awayTeamGoals": 0,
    "inProgress": false
  },
  {
    "id": 5,
    "homeTeam": 7,
    "homeTeamGoals": 1,
    "awayTeam": 6,
    "awayTeamGoals": 1,
    "inProgress": false
  },
  {
    "id": 6,
    "homeTeam": 3,
    "homeTeamGoals": 0,
    "awayTeam": 6,
    "awayTeamGoals": 0,
    "inProgress": true
  },
  {
    "id": 7,
    "homeTeam": 1,
    "homeTeamGoals": 1,
    "awayTeam": 5,
    "awayTeamGoals": 1,
    "inProgress": true
  }
];

const tokenVerify = { id: 2 }
const token = "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0";
describe('Group of test that validate the logic behind MATCHES', () => {
  let response: Response;

  beforeEach(sinon.restore);

  it('should be able to create a new match', async () => {
    // @ts-ignore
    sinon.stub(Teams, 'findByPk').resolves(MatchMock[1]);
    sinon.stub(auth, 'middleware').resolves(tokenVerify);
    response = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', token)
      .send({
        homeTeam: 1,
        awayTeam: 2,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true
      });

    expect(response).to.have.status(201);
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('inProgress', true);
  });

  it('should not be able to create a new match with an invalid token', async () => {
    response = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', 'token')
      .send({
        homeTeam: 1,
        awayTeam: 1,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });

    expect(response).to.have.status(401);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.equal('Token must be a valid token');
  });

  it('should not be able to create a new match with same teams', async () => {
    response = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', token)
      .send({
        homeTeam: 1,
        awayTeam: 1,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });

    expect(response).to.have.status(401);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.equal(
      'It is not possible to create a match with two equal teams'
    );
  });
});