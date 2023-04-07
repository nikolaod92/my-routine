import { motion } from 'framer-motion'
import Image from 'next/image'

function ExerciseImage({ src, alt }: { src: string | null; alt: string }) {
  return src ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: [10, 0] }}
      exit={{ opacity: 0, x: 10 }}
      className="bg-white  w-full flex flex-1 items-center justify-center"
    >
      <Image className="p-4" src={src} alt={alt} width={160} height={160} />
    </motion.div>
  ) : null
}

export default ExerciseImage
