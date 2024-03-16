import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { IMatch } from '../interfaces/IMatch';

interface MatchState {
  match: IMatch | null;
  resetMatch: () => void;
  setMatch: (seconds: number, numTeams: number, numberQuestionForTeam: number) => void;
}

export const useMatchStore = create<MatchState>()(
  devtools((set) => ({
    match: null,
    resetMatch: () => {
      set(() => {
        return {
          match: null,
        };
      });
    },
    setMatch: (seconds: number, numTeams: number, numberQuestionForTeam: number) => {
      set(() => {
        return { match: { id: uuidv4(), ranking: [], numTeams, seconds, numberQuestionForTeam } };
      });
    },
  })),
);
