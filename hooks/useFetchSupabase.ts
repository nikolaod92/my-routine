import { PostgrestError } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

const useFetchSupabase = <T>(
  supabaseCallback: () => Promise<{
    data: T | null
    error: PostgrestError | Error | null
  }>
) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<PostgrestError | Error | null>(null)
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    async function getData() {
      setLoading(true)
      try {
        const { data: supabaseData, error: supabaseError } =
          await supabaseCallback()
        if (supabaseError) {
          setError(supabaseError)
        } else {
          setData(supabaseData)
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e)
        }
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [supabaseCallback])

  return { loading, data, error }
}

export default useFetchSupabase
