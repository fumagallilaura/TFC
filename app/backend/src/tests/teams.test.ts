import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Teams from '../database/models/Teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Group of test that validate the logic behind TEAMS', () => {
  const teams: Array<{id:number, teamName: string}> = [
    {
      id: 1,
      teamName: 'Avaí/Kindermann',
    },
    {
      id: 2,
      teamName: 'Bahia',
    },
    {
      id: 3,
      teamName: 'Botafogo',
    },
    {
      id: 4,
      teamName: 'Corinthians',
    },
    {
      id: 5,
      teamName: 'Cruzeiro',
    },
    {
      id: 6,
      teamName: 'Ferroviária',
    },
    {
      id: 7,
      teamName: 'Flamengo',
    },
    {
      id: 8,
      teamName: 'Grêmio',
    },
    {
      id: 9,
      teamName: 'Internacional',
    },
    {
      id: 10,
      teamName: 'Minas Brasília',
    },
    {
      id: 11,
      teamName: 'Napoli-SC',
    },
    {
      id: 12,
      teamName: 'Palmeiras',
    },
    {
      id: 13,
      teamName: 'Real Brasília',
    },
    {
      id: 14,
      teamName: 'Santos',
    },
    {
      id: 15,
      teamName: 'São José-SP',
    },
    {
      id: 16,
      teamName: 'São Paulo',
    },
  ];

  let response: Response;
  beforeEach(sinon.restore);

  // it('should be able to list all teams', async () => {
  //   sinon.stub(Teams, 'findAll').resolves(teams as Teams);
  //   response = await chai.request(app).get('/teams');

  //   expect(response).to.have.status(200);
  //   expect(response.body).to.have.lengthOf(16);
  // });

  it('should be able to filter by a team using the ID', async () => {
    response = await chai.request(app).get('/teams/1');

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('teamName', 'Grêmio');
  });

  it('should not be able to filter by a team using an ID that does not exist', async () => {
    (Teams.findByPk as sinon.SinonStub).restore();
    sinon.stub(Teams, 'findByPk').resolves(null);
    response = await chai.request(app).get('/teams/999');

    expect(response).to.have.status(404);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.equal('Team does not exist');
  });
});