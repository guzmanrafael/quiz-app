import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { useRankingStore } from '../../store/rankingStore';
import { useTeamStore } from '../../store/teamStore';

const data = [
  { option: '+5 puntos' },
  { option: '-5 puntos', style: { textColor: '#FFFFFF' } },
  { option: '+10 puntos' },
  { option: 'NADA' },
  { option: '+5 puntos' },
  { option: '-5 puntos', style: { textColor: '#FFFFFF' } },
  { option: 'NADA' },
  { option: '-5 puntos', style: { textColor: '#FFFFFF' } },
];

const backgroundColors = ['#008000', '#FF0000', '#FFD700', '#0000FF', '#008000', '#FF0000', '#0000FF', '#FF0000'];
const textColors = ['#0b3351'];
const outerBorderColor = '#eeeeee';
const outerBorderWidth = 10;
const innerBorderColor = '#30261a';
const innerBorderWidth = 0;
const innerRadius = 0;
const radiusLineColor = '#eeeeee';
const radiusLineWidth = 8;
const fontFamily = 'Nunito';
const fontWeight = 'bold';
const fontSize = 20;
const fontStyle = 'normal';
const textDistance = 60;
const spinDuration = 1.0;

function Roulette(props: any) {
  const selectedTeam = useTeamStore((state) => state.selectedTeam);
  const setRankingScore = useRankingStore((state) => state.setRankingScore);

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [play, setPlay] = useState(true);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setPlay(false);
    }
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
      <div className="mt-5">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={backgroundColors}
          textColors={textColors}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontStyle={fontStyle}
          outerBorderColor={outerBorderColor}
          outerBorderWidth={outerBorderWidth}
          innerRadius={innerRadius}
          innerBorderColor={innerBorderColor}
          innerBorderWidth={innerBorderWidth}
          radiusLineColor={radiusLineColor}
          radiusLineWidth={radiusLineWidth}
          spinDuration={spinDuration}
          startingOptionIndex={2}
          textDistance={textDistance}
          onStopSpinning={() => {
            setMustSpin(false);
            console.log('prizeNumber: ', prizeNumber);
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
