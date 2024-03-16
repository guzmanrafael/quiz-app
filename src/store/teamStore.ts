import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ITeam } from '../interfaces/ITeam';

interface TeamState {
  teams: ITeam[];
  selectedTeam: ITeam | null;
  deleteTeam: (team: ITeam) => void;
  resetTeams: () => void;
  setSelectedTeam: () => void;
  setTeam: (team: ITeam) => void;
  setPlayTeam: (team: ITeam) => void;
  resetTeamPlay: () => void;
}

export const useTeamStore = create<TeamState>()(
  devtools((set) => ({
    teams: [],
    selectedTeam: null,
    deleteTeam: (teamData: ITeam) => {
      set((state) => {
        return { teams: state.teams.filter((team) => team.id !== teamData.id) };
      });
    },
    resetTeams: () => {
      set(() => {
        return {
          teams: [],
          selectedTeam: null,
        };
      });
    },
    setSelectedTeam: () => {
      set((state) => {
        const selectedTeam = state.teams.find((team) => team.play === false);
        state.selectedTeam = selectedTeam!;
        return {
          selectedTeam: selectedTeam,
        };
      });
    },
    setTeam: (team: ITeam) => {
      set((state) => {
        state.teams.push({ id: team.id, name: team.name, play: false });

        return {
          teams: state.teams,
        };
      });
    },
    setPlayTeam: (teamData: ITeam) => {
      set((state) => {
        const team = state.teams.findIndex((t) => t.id === teamData.id);
        state.teams[team].play = true;
        return { teams: state.teams };
      });
    },
    resetTeamPlay: () => {
      set((state) => {
        const teamData = state.teams.map((team) => {
          team.play = false;
          return team;
        });
        return { teams: teamData };
      });
    },
  })),
);
