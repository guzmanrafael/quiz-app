import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IRanking } from '../interfaces/IRanking';
import { v4 as uuidv4 } from 'uuid';

interface RankingState {
  ranking: IRanking[];
  resetRanking: () => void;
  setMatchRanking: (team: IRanking) => void;
  setRankingScore: (ranking: IRanking) => void;
  deleteOneRanking: (teamId: string) => void;
}

export const useRankingStore = create<RankingState>()(
  devtools((set) => ({
    ranking: [],
    resetRanking: () => {
      set(() => {
        return {
          ranking: [],
        };
      });
    },
    deleteOneRanking: (teamId: string) => {
      set((state) => {
        const index = state.ranking.findIndex((rank) => rank.teamId === teamId);
        delete state.ranking[index];
        return {
          ranking: state.ranking,
        };
      });
    },
    setMatchRanking: (team: IRanking) => {
      set((state) => {
        state.ranking.push({ id: uuidv4(), score: team.score, teamId: team.teamId, teamName: team.teamName });

        return {
          ranking: state.ranking.sort((a, b) => b.score - a.score),
        };
      });
    },
    setRankingScore: (ranking: IRanking) => {
      set((state) => {
        const rankingSelected = state.ranking.findIndex((q) => q.teamId === ranking.teamId);
        if (rankingSelected !== undefined) {
          state.ranking[rankingSelected].score = state.ranking[rankingSelected].score + ranking.score;
        }
        state.ranking.sort((a, b) => b.score - a.score);
        return {
          ranking: state.ranking,
        };
      });
    },
  })),
);
