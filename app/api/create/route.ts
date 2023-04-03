import { routineSchema } from '@/lib/vaildators'
import { createServerClient } from '@/utils/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const data = await request.json()
  const { routineInfo, exercises } = data

  const routineValidationResponse = routineSchema.safeParse(routineInfo)

  if (!routineValidationResponse.success)
    return NextResponse.json(routineValidationResponse.error, { status: 400 })

  const { data: routine, error } = await supabase
    .from('routine')
    .insert({
      name: routineInfo.name,
      description: routineInfo.description,
      author_id: session!.user.id,
    })
    .select()

  if (error)
    return NextResponse.json(error, {
      status: 500,
    })

  const exerciseArray = exercises.map((ex: any) => {
    const { name, ...rest } = ex
    return {
      ...rest,
      routine_id: routine[0].id,
    }
  })

  const { error: exerciseError } = await supabase
    .from('exercises_on_day')
    .insert(exerciseArray)

  if (exerciseError)
    return NextResponse.json(error, {
      status: 500,
    })

  return NextResponse.json(routine, {
    status: 200,
  })
}
