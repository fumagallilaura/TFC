import { Model, DataTypes } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  public homeTeam!: number;

  public homeTeamGoals!: number;

  public awayTeam!: number;

  public awayTeamGoals!: number;

  public inProgress!: boolean;
}
Matches.init({
  homeTeam: DataTypes.NUMBER,
  homeTeamGoals: DataTypes.NUMBER,
  awayTeam: DataTypes.NUMBER,
  awayTeamGoals: DataTypes.NUMBER,
  inProgress: DataTypes.BOOLEAN,
}, {
  sequelize: db,
  modelName: 'Matches',
  underscored: true,
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', targetKey: 'id', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', targetKey: 'id', as: 'teamAway' });

export default Matches;