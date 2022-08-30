import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

interface IMatch {
  id?: number
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

interface ITeam {
  id?: number
  teamName: string
}

type Tgoals = {
  goals: number
  id: number
};
type TReport = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
};

const newReport = (team:ITeam):TReport => ({
  name: team.teamName,
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
});

const registerGoalsAndPoints = (report: TReport, thisTeam: Tgoals, otherTeam: Tgoals) => {
  const reportCopy = { ...report };
  reportCopy.totalGames += 1;
  reportCopy.goalsFavor += thisTeam.goals;
  reportCopy.goalsOwn += otherTeam.goals;

  const matchBalance = thisTeam.goals - otherTeam.goals;
  reportCopy.goalsBalance += matchBalance;

  const isWin = matchBalance > 0;
  const isDraw = matchBalance === 0;

  if (isWin) { reportCopy.totalVictories += 1; reportCopy.totalPoints += 3; }
  if (isDraw) { reportCopy.totalDraws += 1; reportCopy.totalPoints += 1; }

  if (!isWin && !isDraw) reportCopy.totalLosses += 1;

  return reportCopy;
};

export default class LeaderBoardService {
  // eslint-disable-next-line max-lines-per-function
  static getReportByTeam(team:ITeam, matches: IMatch[]) {
    let report = newReport(team);
    matches.forEach((match) => {
      if (match.inProgress) return;
      if (match.awayTeam !== team.id && match.homeTeam !== team.id) return;
      if (team.teamName === 'Santos') console.log(Object.values(match)[0]);
      const isHome = match.homeTeam === team.id;
      const homeTeam = { id: match.homeTeam, goals: match.homeTeamGoals };
      const awayTeam = { id: match.awayTeam, goals: match.awayTeamGoals };
      if (isHome) {
        report = registerGoalsAndPoints(report, homeTeam, awayTeam);
      } else {
        report = registerGoalsAndPoints(report, awayTeam, homeTeam);
      }
    });
    report.efficiency = Number(((report.totalPoints / (report.totalGames * 3)) * 100).toFixed(2));
    return report;
  }

  static async getBoard() {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll();

    const teamsReport = teams.map((team) => this.getReportByTeam(team, matches));
    return LeaderBoardService.orderedBoard(teamsReport);
  }

  static async getBoardHome() {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll();
    const teamsReport = teams.map((team) => this.getReportByTeamHome(team, matches));
    return this.orderedBoard(teamsReport);
  }

  static getReportByTeamHome(team:ITeam, matches: IMatch[]) {
    let report = newReport(team);
    matches.forEach((match) => {
      if (match.homeTeam !== team.id || match.inProgress) return;

      const homeTeam = { id: match.homeTeam, goals: match.homeTeamGoals };
      const awayTeam = { id: match.awayTeam, goals: match.awayTeamGoals };
      report = registerGoalsAndPoints(report, homeTeam, awayTeam);
    });
    report.efficiency = Number(((report.totalPoints / (report.totalGames * 3)) * 100).toFixed(2));
    return report;
  }

  static async orderedBoard(teamsReport:TReport[]) {
    return teamsReport.sort(
      (a, b) => {
        const pointDifference = b.totalPoints - a.totalPoints;
        if (!pointDifference) {
          const victoriesDifference = b.totalVictories - a.totalVictories;
          if (!victoriesDifference) {
            const goalsDifference = b.goalsBalance - a.goalsBalance;
            if (!goalsDifference) return b.goalsFavor - a.goalsFavor;
            return goalsDifference;
          }
          return victoriesDifference;
        }
        return pointDifference;
      },
    );
  }
}