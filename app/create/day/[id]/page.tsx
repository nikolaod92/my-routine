import Link from 'next/link'
import BodyPartProvider from '@/components/ExerciseSelect/BodyPartProvider'
import ExerciseDayNavigation from '@/components/ExerciseSelect/ExerciseDayNavigation'
import SelectedExerciseDisplay from '@/components/ExerciseSelect/SelectedExerciseDisplay'

export default function Day({ params }: { params: { id: string } }) {
  // const [exercises] = useStore((state) => [state.exercises])
  // const router = useRouter()
  // const a = await supabase.from('routine').insert({
  //   name: 'Hello',
  //   description: 'Hello',
  //   authorId: '888d9003-2c81-4f90-b03d-7e5f615e3d22',
  // })
  // console.log(a)

  // const a = await supabase
  //   .from('day')
  //   .insert({
  //     dayOfWeek: 'MON',
  //     routineId: '1473bb4b-1ff9-4569-9b23-fc23693c014c',
  //   })
  // console.log(a, a.data)

  // const a = await supabase.from('exercises_on_day').insert({
  //   dayId: 1,
  //   exerciseId: 6,
  //   reps: 4,
  //   sets: 5,
  //   weight: 100,
  //   name: 'What',
  // })

  // console.log(a, a.data)

  return (
    <div>
      <ExerciseDayNavigation />
      <p>Choose exercises for day {params.id}</p>
      <SelectedExerciseDisplay day={params.id} />
      {/* @ts-expect-error Server Component */}
      <BodyPartProvider />
      <Link className="btn btn-success" href="/create/review">
        Review
      </Link>
    </div>
  )
}
