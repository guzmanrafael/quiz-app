import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../../utils/cn';
import { useNavigate } from 'react-router-dom';
import { useMatchStore } from '../../store/matchStore';
import { useQuestionStore } from '../../store/questionsStore';
import { QuestionsData } from '../../data/Questions';
import { GeneralQuestionsData } from '../../data/GeneralQuestions';

export const CardGame = ({
  items,
  className,
}: {
  items: {
    id: number;
    title: string;
    numberOfQuestions: number;
    description: string;
  }[];
  className?: string;
}) => {
  const navigate = useNavigate();
  const setMatch = useMatchStore((state) => state.setMatch);
  const setQuestions = useQuestionStore((state) => state.setQuestions);
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  let [numTeams, setNumTeams] = useState(4);
  let [seconds, setSeconds] = useState(20);

  const select = (item: {
    id: number;
    title: string;
    numberOfQuestions: number;
    description: string;
  }) => {
    if (item.id === 1) {
      setQuestions(QuestionsData);
      setMatch(seconds, numTeams, Math.floor(QuestionsData.length / numTeams));
      navigate('/match');
    } else {
      setQuestions(GeneralQuestionsData);
      setMatch(seconds, numTeams, Math.floor(GeneralQuestionsData.length / numTeams));
      navigate('/match');
    }
  };

  return (
    <div
      className={cn('grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 py-2', className)}
    >
      {items.map((item, idx) => (
        <div
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          key={idx}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-[#3F33B0] dark:bg-[#3F33B0]/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div>
              <div className="w-full flex flex-col items-center">
                <div className="flex flex-col items-center py-6 space-y-3">
                  <h2 className="text-white text-xl font-semibold items-center">{item.title}</h2>
                  <span className="text-lg text-white">{item.description}</span>
                  <span className="text-lg text-white ">{item.numberOfQuestions} preguntas</span>
                </div>
                <div className="w-3/4 flex flex-col">
                  <div className="max-w-xs mx-auto">
                    <div className="relative flex items-center max-w-[11rem]">
                      <button
                        type="button"
                        id="decrement-button"
                        disabled={numTeams === 2}
                        onClick={() => setNumTeams(numTeams - 1)}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg
                          className="w-3 h-3 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={numTeams}
                      />
                      <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
                        <span>Equipos</span>
                      </div>
                      <button
                        type="button"
                        disabled={numTeams >= item.numberOfQuestions}
                        onClick={() => setNumTeams(numTeams + 1)}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg
                          className="w-3 h-3 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="max-w-xs mx-auto mt-4">
                    <div className="relative flex items-center max-w-[11rem]">
                      <button
                        type="button"
                        id="decrement-button"
                        disabled={seconds === 5}
                        onClick={() => setSeconds(seconds - 5)}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg
                          className="w-3 h-3 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={seconds}
                      />
                      <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
                        <span>Tiempo / seg</span>
                      </div>
                      <button
                        type="button"
                        disabled={seconds === 60}
                        onClick={() => setSeconds(seconds + 5)}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg
                          className="w-3 h-3 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <button
                    className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
                    onClick={() => select(item)}
                  >
                    Seleccionar
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        'rounded-2xl h-full w-full p-4 overflow-hidden bg-[#3F33B0] border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20',
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <h4 className={cn('text-zinc-100 font-bold tracking-wide mt-4', className)}>{children}</h4>;
};
export const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <p className={cn('mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm', className)}>{children}</p>;
};
