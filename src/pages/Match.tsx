import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTeamStore } from '../store/teamStore';
import { ITeam } from '../interfaces/ITeam';
import { useMatchStore } from '../store/matchStore';
import { FaPlay } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { useQuestionStore } from '../store/questionsStore';
import { v4 as uuidv4 } from 'uuid';
import { useRankingStore } from '../store/rankingStore';

function Match() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const teams = useTeamStore((state) => state.teams);
  const setTeam = useTeamStore((state) => state.setTeam);
  const deleteTeam = useTeamStore((state) => state.deleteTeam);
  const match = useMatchStore((state) => state.match);
  const setMatchRanking = useRankingStore((state) => state.setMatchRanking);
  const resetQuestions = useQuestionStore((state) => state.resetQuestions);
  const resetRanking = useRankingStore((state) => state.resetRanking);
  const deleteOneRanking = useRankingStore((state) => state.deleteOneRanking);

  const resetMatch = useMatchStore((state) => state.resetMatch);
  const resetTeams = useTeamStore((state) => state.resetTeams);

  const [formData, setFormData] = useState<ITeam>({ name: '' });

  const play = () => {
    navigate('/ronda');
  };

  const removeTeam = (team: ITeam) => {
    deleteTeam(team);
    deleteOneRanking(team.id!);
  };

  const handleInputChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (formData.name) {
      const team: ITeam = {
        name: formData.name,
        id: uuidv4(),
      };
      setTeam(team);
      setMatchRanking({ score: 0, teamId: team.id!, teamName: team.name });
    }
    setFormData({ name: '' });
    setShowModal(false);
  };

  const finish = () => {
    resetTeams();
    resetMatch();
    resetQuestions();
    resetRanking();
    navigate('/');
  };

  return (
    <div className="h-full bg-[#3F33B0] min-h-screen">
      <div className="pt-4 pl-8">
        <button
          className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-600 hover:bg-red-700 focus:outline-none rounded"
          onClick={() => finish()}
        >
          <p className="text-sm font-medium leading-none text-white">Terminar</p>
        </button>
      </div>
      <div className="py-3 text-2xl text-center text-white ">
        <div className="col-span-4 ">
          <div className="sm:px-6 w-full">
            <section className="container px-4 mx-auto">
              <div className="sm:flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-4xl font-semibold text-white">Administrar equipos</p>
                </div>
                <button
                  className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-[#45F881] hover:bg-green-700 focus:outline-none rounded"
                  onClick={() => setShowModal(true)}
                  disabled={match?.numTeams ? (match?.numTeams <= teams.length ? true : false) : false}
                >
                  <p className="text-xl font-medium leading-none text-black">Agregar equipo</p>
                </button>
              </div>
              <div className="flex flex-col mt-6">
                <table className="min-w-full divide-y divide-[#5549C7] dark:divide-[#5549C7]">
                  <thead className="bg-[#5549C7] dark:bg-[#5549C7]">
                    <tr>
                      <th className="py-3.5 px-4 text-xl font-normal items-center	 rtl:text-right text-white dark:text-white">
                        <span>Nombre del equipo</span>
                      </th>

                      <th className="relative py-3.5 px-4"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#5B4FCC] divide-y divide-[#5549C7] dark:divide-[#5549C7] dark:bg-[#5B4FCC] ">
                    {teams.map((team) => (
                      <tr id={team.id} key={team.id}>
                        <td className="py-4 text-xl font-medium text-white">
                          <h2 className="dark:text-white ">{team.name}</h2>
                        </td>
                        <td className="px-4 py-4 text-xl">
                          <div className="flex items-center gap-x-6">
                            <button
                              className="text-black transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                              disabled={team.play}
                              onClick={() => removeTeam(team)}
                            >
                              <MdDelete size={30} color={team.play ? 'gray' : 'red'} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex items-center justify-center mt-10">
                  <button
                    onClick={() => play()}
                    disabled={match?.numTeams ? (match?.numTeams === teams.length ? false : true) : false}
                    className="flex items-center bg-[#5549C7]  border border-[#5549C7] rounded-lg shadow-md px-6 py-2 text-xl font-medium text-white dark:text-white hover:bg-[#4032B0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <FaPlay size={40} color="green" />
                    <span>Jugar</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <form onSubmit={handleSubmit}>
                    <div className="border border-[#7061F3] rounded-lg shadow-lg relative flex flex-col w-full bg-[#7061F3] outline-none focus:outline-none">
                      {/*header*/}
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Nombre aqui..."
                          className="w-full rounded-md border border-white bg-[#7061F3] py-5 px-8 text-xl text-white outline-none focus:border-white focus:shadow-md"
                        />
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-center p-6">
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                          <button
                            type="button"
                            className="px-8 py-4 text-xl font-medium text-white bg-transparent border border-white rounded-s-lg hover:bg-white hover:text-white focus:z-10 focus:ring-2 focus:ring-[#7061F3] focus:bg-white focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                            onClick={() => setShowModal(false)}
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="px-8 py-4 text-xl font-medium text-white bg-transparent border border-white rounded-e-lg hover:bg-white hover:text-white focus:z-10 focus:ring-2 focus:ring-[#7061F3] focus:bg-white focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                          >
                            Guardar
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Match;
