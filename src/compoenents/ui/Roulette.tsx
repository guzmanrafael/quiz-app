import { useRef, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { useRankingStore } from '../../store/rankingStore';
import { useTeamStore } from '../../store/teamStore';
import RouletteSpinAudioMp3 from '../../assets/audio/roulettespin.mp3';
import WinRouletteAudioMp3 from '../../assets/audio/win_roulette.mp3';
import LoseRouletteAudioMp3 from '../../assets/audio/lose_roulette.mp3';

const data = [
  { option: '+5 puntos' },
  { option: '-5 puntos', style: { textColor: '#FFFFFF' } },
  { option: '+10 puntos' },
  { option: 'NADA', style: { textColor: '#FFFFFF' } },
  { option: '+5 puntos' },
  { option: '-5 puntos', style: { textColor: '#FFFFFF' } },
  { option: 'NADA', style: { textColor: '#FFFFFF' } },
  { option: '-5 puntos', style: { textColor: '#FFFFFF' } },
];

const backgroundColors = ['#008000', '#FF0000', '#FFD700', '#0000FF', '#008000', '#FF0000', '#0000FF', '#FF0000'];
const fontSize = 30;
const textDistance = 60;
const spinDuration = 1.0;

function Roulette(props: any) {
  const selectedTeam = useTeamStore((state) => state.selectedTeam);
  const setRankingScore = useRankingStore((state) => state.setRankingScore);

  const rouletteAudio = useRef(new Audio(RouletteSpinAudioMp3));
  const winAudio = new Audio(WinRouletteAudioMp3);
  const loseAudio = new Audio(LoseRouletteAudioMp3);

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [play, setPlay] = useState(true);

  const handleSpinClick = async () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setPlay(false);
      await delay(980);
      rouletteAudio.current.loop = true;
      rouletteAudio.current.play();
    }
  };

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const exit = () => {
    let score = 0;
    setPlay(true);
    if (prizeNumber === 0 || prizeNumber === 4) score = 5;
    if (prizeNumber === 1 || prizeNumber === 5 || prizeNumber === 7) score = -5;
    if (prizeNumber === 2) score = 10;
    setRankingScore!({ score: score, teamId: selectedTeam?.id!, teamName: selectedTeam?.name });
    props.closeRoulette();
  };

  return (
    <div className="grid items-center justify-center">
      <div className="mt-5 wheel">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={backgroundColors}
          fontSize={fontSize}
          spinDuration={spinDuration}
          startingOptionIndex={2}
          textDistance={textDistance}
          onStopSpinning={() => {
            if (prizeNumber === 0 || prizeNumber === 4 || prizeNumber === 2) {
              winAudio.play();
            } else {
              loseAudio.play();
            }
            rouletteAudio.current.pause();
            rouletteAudio.current.currentTime = 0;
            setMustSpin(false);
          }}
        />
      </div>
      {play ? (
        <button
          className="mt-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={handleSpinClick}
        >
          GIRAR
        </button>
      ) : (
        <button
          className="mt-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={() => exit()}
        >
          SALIR
        </button>
      )}
    </div>
  );
}

export default Roulette;
