import { motion } from 'framer-motion';
export default function PodiumStep({ podium, winner }: any) {
  const offset = podium.length - winner.position;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        placeContent: 'center',
      }}
    >
      <motion.div
        style={{
          alignSelf: 'center',
          marginBottom: '.50rem',
        }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delay: 0.5 + (offset + 2),
              duration: 0.65,
            },
          },
        }}
      >
        <p className="text-5xl">{winner.name}</p>
      </motion.div>
      <motion.div
        style={{
          backgroundColor: 'rgba(219,39,119,1)',
          borderColor: 'rgba(190,24,93,1)',
          borderTopLeftRadius: '.30rem',
          borderTopRightRadius: '.30rem',
          display: 'flex',
          filter: `opacity(${0.1 + offset / podium.length})`,
          marginBottom: -1,
          placeContent: 'center',
          width: '20rem',
        }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { height: 0, opacity: 0 },
          visible: {
            height: 280 * (offset / podium.length),
            opacity: 1,
            transition: {
              delay: 0.5 + offset,
              duration: 2,
              ease: 'backInOut',
            },
          },
        }}
      >
        <span style={{ alignSelf: 'flex-end', color: 'white' }} className="text-5xl">
          {winner.position + 1}
        </span>
      </motion.div>
    </div>
  );
}
