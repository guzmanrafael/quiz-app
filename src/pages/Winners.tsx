import { useEffect, useState } from 'react';
import ConfettiExplosion, { ConfettiProps } from 'react-confetti-explosion';
import { useRankingStore } from '../store/rankingStore';
import { useNavigate } from 'react-router-dom';
import FirstMedal from '../assets/image/first.png';
import SecondMedal from '../assets/image/second.png';
import ThirdMedal from '../assets/image/medal.png';

function Winners() {
  const ranking = useRankingStore((state) => state.ranking);
  let [lockChoices, setLockChoices] = useState(true);
  let [inGame, setInGame] = useState(true);
  const navigate = useNavigate();
  const [isExploding, setIsExploding] = useState(false);
  const largeProps: ConfettiProps = {
    force: 0.8,
    duration: 3000,
    particleCount: 300,
    width: 1600,
    colors: ['#041E43', '#1471BF', '#5BB4DC', '#FC027B', '#66D805'],
  };

  const reset = () => {
    console.log(lockChoices);
    console.log(inGame);
    setLockChoices(true);
    setInGame(true);
    navigate('/match');
  };

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    const delayTest = async () => {
      await delay(800);
      setIsExploding(true);
    };
    delayTest();
  }, []);

  return (
    <div className="bg-[#594ECA] h-screen">
      <div className="flex flex-col">
        <div>
          <div className="grid grid-cols-6">
            <div>{isExploding ? <ConfettiExplosion {...largeProps} /> : null}</div>
            <div className="col-span-4">
              <div className="flex flex-wrap -mx-3 mb-5 mt-5">
                <div className="w-full max-w-full px-3 mb-6  mx-auto">
                  <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                    <div className="bg-[#5549C7] relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                      <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                        <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-white">
                          <span className="mr-3 font-semibold text-white">Lista de posiciones</span>
                        </h3>
                      </div>

                      <div className="flex-auto block py-6 pt-3 px-9 bg-[#5B4FCC]">
                        <div className="overflow-x-auto">
                          <table className="w-full my-0 align-middle text-white border-neutral-200">
                            <thead className="align-bottom">
                              <tr className="text-4xl text-secondary-dark">
                                <th className="pb-3 text-start min-w-[175px]"></th>
                                <th className="pb-3 text-start min-w-[175px]">EQUIPO</th>
                                <th className="pb-3 text-center min-w-[100px]">PUNTOS</th>
                              </tr>
                            </thead>
                            <tbody>
                              {ranking.map((rank, index) => (
                                <tr id={rank.id} key={rank.id} className="border-b border-dashed last:border-b-0">
                                  <td className="p-3 pl-0">
                                    <div className="flex items-center">
                                      <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                        <img
                                          src={index === 0 ? FirstMedal : index === 1 ? SecondMedal : ThirdMedal}
                                          className="w-[70px] h-[70px] inline-block shrink-0 rounded-2xl"
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 pl-0">
                                    <div className="flex items-center">
                                      <div className="flex flex-col justify-start">
                                        <p className="mb-1 transition-colors duration-200 ease-in-out text-4xl text-secondary-inverse hover:text-primary">
                                          {rank.teamName}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 pr-0 text-center">
                                    <span className="text-light-inverse text-4xl">{rank.score}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>{isExploding ? <ConfettiExplosion {...largeProps} /> : null}</div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center space-x-3 text-base">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              onClick={() => reset()}
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Winners;
