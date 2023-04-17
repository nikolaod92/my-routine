import { PostgrestError } from '@supabase/supabase-js'
import { useCallback, useEffect, useState } from 'react'

const useFetchSupabase = <T>(
  supabaseCallback: (...args: any[]) => Promise<{
    data: T | null
    error: PostgrestError | Error | null
    count?: number | null
  }>,
  options?: {
    initialState?: T
    executeOnMount?: boolean
  }
) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<PostgrestError | Error | null>(null)
  const [data, setData] = useState<T | null>(options?.initialState ?? null)
  const [count, setCount] = useState<number | null | undefined>(null)

  const fetchData = useCallback(
    async (...args: any[]) => {
      setLoading(true)
      try {
        const {
          data: supabaseData,
          error: supabaseError,
          count: supabaseCount,
        } = await supabaseCallback(...args)
        if (supabaseError) {
          setError(supabaseError)
        } else {
          setData(supabaseData)
          setCount(supabaseCount)
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e)
        }
      } finally {
        setTimeout(() => setLoading(false), 500)
      }
    },
    [supabaseCallback]
  )
  useEffect(() => {
    if (options?.executeOnMount) fetchData()
  }, [fetchData, options?.executeOnMount])

  return { fetchData, loading, data, error, count }
}

export default useFetchSupabase
