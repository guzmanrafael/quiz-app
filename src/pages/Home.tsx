import { quizData } from '../data/Quiz';
import { RiArrowLeftCircleLine, RiArrowRightCircleLine } from 'react-icons/ri';
import { CardGame } from '../compoenents/ui/CardGame';

function Home() {
  return (
    <div>
      {/* Slide Quiz */}
      <div className="mt-3 mb-6 flex items-center justify-between">
        <h5 className="text-black text-2xl">Juegos de Preguntas</h5>
        <div className="text-gray-400 text-3xl flex items-center gap-4">
          <RiArrowLeftCircleLine className="cursor-pointer" />
          <RiArrowRightCircleLine className="cursor-pointer text-black" />
        </div>
      </div>
      {/* Quiz */}
      <div>
        <CardGame items={quizData} />
      </div>
    </div>
  );
}

export default Home;
