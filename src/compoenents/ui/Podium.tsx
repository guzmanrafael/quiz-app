import PodiumStep from './PodiumStep';
export default function Podium({ winners }) {
  const podium = [8, 6, 4, 2, 0, 1, 3, 5, 7, 9]
    .reduce((podiumOrder, position) => [...podiumOrder, winners[position]], [])
    .filter(Boolean);

  return (
    <div
      style={{
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        borderBottom: '1px solid #e5e7eb',
        display: 'grid',
        gap: '.5rem',
        gridAutoFlow: 'column dense',
        justifyContent: 'center',
        justifyItems: 'center',
        height: 400,
        marginTop: '2rem',
      }}
    >
      {podium.map((winner) => (
        <PodiumStep key={winner.id} podium={podium} winner={winner} />
      ))}
    </div>
  );
}
