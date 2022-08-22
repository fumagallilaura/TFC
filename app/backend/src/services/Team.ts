import Team from '../database/models/Teams';

export default class TeamService {
  public static async getAll() {
    return Team.findAll();
  }
}