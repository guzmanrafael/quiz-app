import Podium from '../compoenents/ui/Podium';
import podiumData from '../data/data';

function Winners() {
  return (
    <div>
      <Podium winners={podiumData} />
    </div>
  );
}

export default Winners;
