export interface IProfile {
  playerInfo: {
    size?: string;
    shoeSize?: string;
    position?: string;
    strongFoot?: string;
    prevClubs?: string;
    victories?: string;
    losses?: string;
  };

  favorites: {
    favDrink?: string;
    favFood?: string;
    favClub?: string;
    favPlayer?: string;
    favTeam?: string;
    favTrainer?: string;
  };
}
