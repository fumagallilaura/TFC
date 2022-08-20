import { Model, DataTypes } from 'sequelize';
import db from '.';

class Teams extends Model {
  public teamName: string;
}
Teams.init({
  teamName: DataTypes.STRING,
}, {
  sequelize: db,
  modelName: 'Teams',
  underscored: true,
  timestamps: false,

});

export default Teams;