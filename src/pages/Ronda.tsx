import { FaPlay } from 'react-icons/fa6';
import { useMatchStore } from '../store/matchStore';
import { useEffect, useRef, useState } from 'react';
import { useQuestionStore } from '../store/questionsStore';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { GoIssueClosed } from 'react-icons/go';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IQuestion } from '../data/IQuestions';
import { TbClockCancel } from 'react-icons/tb';
import { IChoices } from '../data/IChoices';
import { useNavigate } from 'react-router-dom';
import { useTeamStore } from '../store/teamStore';
import { useRankingStore } from '../store/rankingStore';
import Roulette from '../compoenents/ui/Roulette';
import CorrectAudioMp3 from '../assets/audio/correct.mp3';
import IncorrectAudioMp3 from '../assets/audio/incorrect.mp3';
import BackgrounAudioMp3 from '../assets/audio/background.mp3';
import TimerAudioMp3 from '../assets/audio/timer.mp3';
import LoseTimerAudioMp3 from '../assets/audio/losetime.mp3';
import { FollowerPointerCard } from '../compoenents/ui/FollowingPointer';
import { AnimatedText } from '../compoenents/ui/TextAnimation';

function Ronda() {
  const navigate = useNavigate();
  const setSelectedQuestion = useQuestionStore((state) => state.setSelectedQuestion);
  const question = useQuestionStore((state) => state.selectedQuestion);
  const setSelectedTeam = useTeamStore((state) => state.setSelectedTeam);
  const selectedTeam = useTeamStore((state) => state.selectedTeam);
  const setRankingScore = useRankingStore((state) => state.setRankingScore);
  const match = useMatchStore((state) => state.match);
  const resetTeamPlay = useTeamStore((state) => state.resetTeamPlay);
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const setPlayTeam = useTeamStore((state) => state.setPlayTeam);
  const ranking = useRankingStore((state) => state.ranking);

  //Audio
  const correctAudio = new Audio(CorrectAudioMp3);
  const incorrectAudio = new Audio(IncorrectAudioMp3);
  const backgroundAudio = useRef(new Audio(BackgrounAudioMp3));
  const timerAudio = useRef(new Audio(TimerAudioMp3));
  const loseTimerAudio = new Audio(LoseTimerAudioMp3);

  let [selectedChoice, setSelectedChoice] = useState('');
  let [inGame, setInGame] = useState(true);
  let [numRonda, setNumRonda] = useState(1);
  let [newRonda, setNewRonda] = useState(true);
  let [timerActive, setTimerActive] = useState(false);
  let [lockChoices, setLockChoices] = useState(true);
  let [loadingChoices, setLoadingChoices] = useState(false);
  let [revealChoices, setRevealChoices] = useState(false);
  let [questionsForRonda, setQuestionsForRonda] = useState(0);
  const [key, setKey] = useState(0);
  let numeros = 1;
  let [showRoulette, setShowRouterlette] = useState(false);
  let [takeRoulette, setTakeRouterlette] = useState(false);

  const loadingTimer = (inf: IQuestion) => {
    setTimerActive(false);
    setLockChoices(false);
    setSelectedChoice('');
    updateQuestion(inf);
    setRevealChoices(true);
    setPlayTeam(selectedTeam!);
    timerAudio.current.pause();
    timerAudio.current.currentTime = 0;
    loseTimerAudio.play();
  };

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const sendAnswer = async (choice: IChoices) => {
    timerAudio.current.pause();
    timerAudio.current.currentTime = 0;
    setTimerActive(false);
    setLockChoices(false);
    setSelectedChoice(choice.answer);
    setLoadingChoices(true);
    await delay(3000);
    setLoadingChoices(false);
    setRevealChoices(true);
    setPlayTeam(selectedTeam!);
    if (choice.isCorrect) {
      correctAudio.play();
      setRankingScore!({ score: 10, teamId: selectedTeam?.id!, teamName: selectedTeam?.name });
      setTakeRouterlette(true);
    } else {
      incorrectAudio.play();
    }
  };

  const nextQuestion = async (inf: IQuestion) => {
    setTakeRouterlette(false);
    setQuestionsForRonda(++questionsForRonda);
    if (questionsForRonda >= match?.numTeams!) {
      setNumRonda(++numRonda);
      resetTeamPlay();
      setQuestionsForRonda(0);
      if (numRonda <= match?.numberQuestionForTeam!) {
        setNewRonda(true);
        await delay(1800);
        setNewRonda(false);
      }
    }
    if (numRonda > match?.numberQuestionForTeam!) {
      setInGame(false);
      setLockChoices(true);
      setRevealChoices(false);
    } else {
      setTimerActive(false);
      setKey((prevKey) => prevKey + 1);
      setLockChoices(true);
      setRevealChoices(false);
      setLoadingChoices(false);
      setSelectedChoice('');
      updateQuestion(inf);
      setSelectedQuestion();
      setSelectedTeam();
    }
  };

  const openRoulette = () => {
    setTakeRouterlette(false);
    setShowRouterlette(true);
  };

  const renderTime = ({ remainingTime }: any) => {
    if (remainingTime === 0) {
      return <TbClockCancel color="red" size={70} />;
    }

    return (
      <div className="flex flex-col items-center text-white">
        <div className="text-4xl">{remainingTime}</div>
      </div>
    );
  };

  const winnersPage = () => {
    backgroundAudio.current.pause();
    backgroundAudio.current.currentTime = 0;
    navigate('/Winners');
  };

  useEffect(() => {
    backgroundAudio.current.loop = true;
    backgroundAudio.current.volume = 0.2;
    backgroundAudio.current.play();
    setSelectedQuestion();
    setSelectedTeam();
    const delayTest = async () => {
      await delay(1800);
      setNewRonda(false);
    };
    delayTest();
  }, []);

  return (
    <div className="bg-[#594ECA] h-screen">
      <div className="flex px-4 py-2 bg-[#594ECA]">
        <div className="lg:block lg:w-3/12">
          <div className="row-span-3">
            <div className="shadow-md mt-6 rounded-lg  border border-[#5549C7]">
              <div className="py-6 px-10 border-b border-[#5549C7] bg-[#5549C7] flex items-center">
                <h2 className="pl-2 text-4xl font-semibold text-white">Posiciones</h2>
              </div>
              <ul className="divide-y divide-[#5549C7] bg-[#7061F3]">
                {match &&
                  ranking.map((team) => (
                    <li className="flex items-center py-4 px-8" key={team.id}>
                      <span className="text-white text-4xl font-medium mr-4">{numeros++}.</span>
                      <div className="flex-1">
                        <h3 className="text-5xl font-medium text-white">{team.teamName}</h3>
                        <p className="text-4xl text-white">{team.score} puntos</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="lg:w-10/12 p-5 rounded-lg lg:rounded-l-none bg-[#594ECA]">
          <FollowerPointerCard title={selectedTeam?.name}>
            <div className="flex justify-center">
              <div className="bg-[#5549C7] overflow-hidden container relative shadow-lg rounded-lg px-8">
                {inGame && question ? (
                  <div className="relative z-20">
                    <div className="mt-3 mb-6 flex justify-between ">
                      <div className="text-white text-4xl flex items-center">
                        <p>{selectedTeam?.name}</p>
                      </div>
                      <div>
                        {!timerActive && lockChoices ? (
                          <div className="flex items-center justify-center mt-10">
                            <button
                              onClick={() => {
                                setTimerActive(true);
                                timerAudio.current.play();
                              }}
                              className="flex items-center bg-[#5549C7] cursor-none border border-[#5549C7] rounded-lg shadow-md px-6 py-2 text-xl font-medium text-white dark:text-white hover:bg-[#4032B0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                              <FaPlay size={40} color="green" />
                            </button>
                          </div>
                        ) : (
                          <CountdownCircleTimer
                            key={key}
                            isPlaying={timerActive}
                            duration={match?.seconds!}
                            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                            colorsTime={[8, 6.66, 3.33, 0]}
                            size={100}
                            trailColor="#5549C7"
                            strokeWidth={10}
                            onComplete={() => loadingTimer(question)}
                          >
                            {renderTime}
                          </CountdownCircleTimer>
                        )}
                      </div>
                      <div className="text-white text-3xl flex">
                        <p>
                          {numRonda} / {match?.numberQuestionForTeam}
                        </p>
                      </div>
                    </div>

                    <>
                      <div className="rounded-lg bg-[#7061F3] p-3 neumorph-1 text-center font-bold text-white mt-2 text-5xl">
                        <div className="bg-[#7061F3] p-2">{question.question}</div>
                      </div>

                      {question.choices.map((choice, idx) => (
                        <div className="mt-4" key={idx} onClick={() => (lockChoices ? sendAnswer(choice) : '')}>
                          <div
                            className={`relative z-10 flex w-full items-center overflow-hidden rounded-xl border border-red p-[8px]`}
                          >
                            <div
                              className={`${loadingChoices && selectedChoice === choice.answer ? 'animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_30deg,transparent_120deg)]' : ''}`}
                            ></div>
                            <div
                              className={`relative z-20 flex w-full rounded-[0.60rem] p-2 ${revealChoices ? (selectedChoice === choice.answer ? (choice.isCorrect ? 'bg-green-600' : 'bg-red-800') : choice.isCorrect ? 'bg-green-600' : 'bg-[#594ECA]') : 'bg-[#594ECA]'}`}
                            >
                              {revealChoices && selectedChoice === choice.answer && choice.isCorrect ? (
                                <div className="bg-blue-700 p-2 transform rounded-md h-15 w-15 text-white text-3xl absolute right-3 top-5 shadow-md">
                                  <p className="transform text-3xl">+10</p>
                                </div>
                              ) : (
                                ''
                              )}

                              <div className="rounded-lg text-5xl flex p-2 text-white">
                                <div className="">
                                  {revealChoices ? (
                                    selectedChoice === choice.answer ? (
                                      choice.isCorrect ? (
                                        <GoIssueClosed size={60} />
                                      ) : (
                                        <IoIosCloseCircleOutline size={60} />
                                      )
                                    ) : (
                                      ''
                                    )
                                  ) : (
                                    ''
                                  )}
                                </div>

                                <div className="flex items-center pl-12">{choice.answer}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>

                    <div className="mt-8 text-right">
                      <button
                        className="bg-blue-500 cursor-none hover:bg-blue-700 text-white font-bold py-4 px-6 rounded"
                        onClick={() => nextQuestion(question)}
                        disabled={lockChoices}
                      >
                        Siguiente Pregunta
                      </button>
                      {takeRoulette ? (
                        <button
                          className="bg-green-600 cursor-none hover:bg-green-800 text-white font-bold py-4 px-6 ml-6 rounded"
                          onClick={() => openRoulette()}
                          disabled={lockChoices}
                        >
                          Ruleta
                        </button>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div className="relative isolate overflow-hidden  px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-4xl">
                      <figure className="mt-10">
                        <figcaption className="mt-10">
                          <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-none"
                              onClick={() => winnersPage()}
                            >
                              Ganadores
                            </button>
                          </div>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </FollowerPointerCard>
        </div>
      </div>
      {showRoulette ? (
        <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none bg-[#594ECA]">
          <Roulette closeRoulette={() => setShowRouterlette(false)} />
        </div>
      ) : null}
      {newRonda ? (
        <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none bg-[#594ECA]">
          <AnimatedText once text={`Ronda ${numRonda}`} el="h1" className="text-[350px] text-white" />
        </div>
      ) : null}
    </div>
  );
}

export default Ronda;
