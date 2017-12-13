export interface IMatch {
  id?: string;
  homeTeam: {
    logo: string;
    externalTeamLink: string;
    name: string;
  };
  guestTeam: {
    logo: string;
    externalTeamLink: string;
    name: string;
  };

  isHomeTeam: boolean;

  matchType?: string;
  matchEndDate: Date;
  matchLink: string;
  matchStartDate: Date;

  result: {
    otherEvent: string;
    homeTeamGoals: number | '';
    guestTeamGoals: number | '';
  };
}
