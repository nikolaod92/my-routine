import { PostgrestError } from '@supabase/supabase-js'
import { useCallback, useEffect, useState } from 'react'

const useFetchSupabase = <T>(
  supabaseCallback: (...args: any[]) => Promise<{
    data: T | null
    error: PostgrestError | Error | null
  }>,
  options?: {
    executeOnMount: boolean
  }
) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<PostgrestError | Error | null>(null)
  const [data, setData] = useState<T | null>(null)

  const fetchData = useCallback(
    async (...args: any[]) => {
      setLoading(true)
      try {
        const { data: supabaseData, error: supabaseError } =
          await supabaseCallback(...args)
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
    },
    [supabaseCallback]
  )
  useEffect(() => {
    if (options?.executeOnMount) fetchData()
  }, [fetchData, options?.executeOnMount])

  return { fetchData, loading, data, error }
}

export default useFetchSupabase
