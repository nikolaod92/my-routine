import ExerciseGrid from '@/components/CreateExerciseForm/ExerciseGrid'
import { createServerClient } from '@/utils/supabase-server'
import Image from 'next/image'

export const revalidate = 60

export default async function Routine({ params }: any) {
  const supabase = createServerClient()

  const { data } = await supabase
    .from('exercises_on_day')
    .select(
      `sets, reps, day_of_week, 
    exercise (
      name,
      gif,
      target
    ), 
    routine (
      name,
      description
    )`
    )
    .eq('routine_id', params.id)

  if (data)
    return (
      <div className="p-1">
        <h1 className="font-bold text-2xl">{data[0]?.routine?.name}</h1>
        <h1 className="font-light text-lg">{data[0]?.routine?.description}</h1>
        <div className="btn-group mt-2">
          <button className="btn btn-sm">M</button>
          <button className="btn btn-sm capitalize btn-active">Tu</button>
          <button className="btn btn-sm">W</button>
          <button className="btn btn-sm capitalize">Th</button>
          <button className="btn btn-sm">F</button>
          <button className="btn btn-sm capitalize">Sa</button>
          <button className="btn btn-sm capitalize">Su</button>
        </div>
        <ExerciseGrid>
          {data?.map((ex) => (
            <div className="card bg-base-100 shadow-md">
              <p className="badge badge-xs badge-primary rounded-xl p-2 m-2 font-semibold uppercase">
                {ex?.exercise?.target}
              </p>
              <Image
                className="p-4 mx-auto"
                src={ex?.exercise?.gif}
                alt="Shoes"
                width={160}
                height={160}
              />
              <div className="card-body p-4  pt-2 justify-between">
                <h2 className="text-center font-semibold text-sm capitalize line-clamp-2">
                  {ex?.exercise?.name}
                </h2>
                <div className="flex space-x-2 justify-center items-center  self-center">
                  <p className="text-xs text-end font-light">Sets</p>
                  <p className="badge badge-sm badge-primary font-bold">
                    {ex.sets}
                  </p>
                  <p className="text-xs text-end font-light">Reps</p>
                  <p className="badge badge-sm badge-primary font-bold">
                    {ex.reps}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </ExerciseGrid>
      </div>
    )
}
