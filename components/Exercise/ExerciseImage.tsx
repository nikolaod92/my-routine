import Image from 'next/image'

function ExerciseImage({ src, alt }: { src: string | null; alt: string }) {
  return src ? (
    <div className="bg-white h-full w-full flex items-center justify-center">
      <Image className="p-4" src={src} alt={alt} width={160} height={160} />
    </div>
  ) : null
}

export default ExerciseImage
