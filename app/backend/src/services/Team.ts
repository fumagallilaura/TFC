import Team from '../database/models/Teams';

export default class TeamService {
  public static async getAll() {
    return Team.findAll();
  }
  public static async getById(id: string) {
    const team = await Team.findByPk(id);
    if (!team) return null;
    return team;
  }
}