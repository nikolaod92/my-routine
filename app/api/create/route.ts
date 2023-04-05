import { ExerciseOnDay } from '@/lib/database.types'
import {
  insertExerciseSchema,
  RoutineInfo,
  routineSchema,
} from '@/lib/validators'
import { createServerClient } from '@/utils/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

type RequestType = {
  routineInfo: RoutineInfo
  exercises: ExerciseOnDay[]
}

export async function POST(request: NextRequest) {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const requestData: RequestType = await request.json()
  const { routineInfo, exercises } = requestData

  const routineValidationResponse = routineSchema.safeParse(routineInfo)

  if (!routineValidationResponse.success)
    return NextResponse.json(routineValidationResponse.error, { status: 400 })

  const { data, error } = await supabase
    .from('routine')
    .insert({
      name: routineInfo.name,
      description: routineInfo.description,
      author_id: session!.user.id,
    })
    .select('id')

  if (error)
    return NextResponse.json(error, {
      status: 400,
    })

  const exercisesToInsert = exercises.map((ex) => {
    const { name, ...rest } = ex
    return {
      ...rest,
      routine_id: data[0].id,
    }
  })

  const exercisesValidationResponse =
    insertExerciseSchema.safeParse(exercisesToInsert)

  if (!exercisesValidationResponse.success)
    return NextResponse.json(exercisesValidationResponse.error, { status: 400 })

  const { error: exerciseError } = await supabase
    .from('exercises_on_day')
    .insert(exercisesToInsert)

  if (exerciseError)
    return NextResponse.json(exerciseError, {
      status: 400,
    })

  return NextResponse.json(data, {
    status: 200,
  })
}
