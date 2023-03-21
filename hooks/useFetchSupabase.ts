import { useState, useEffect } from 'react'

const useFetchSupabase = (supaCall) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    async function getData() {
      setLoading(true)
      try {
        const { data, error } = await supaCall()
        if (error) {
          setError(error)
        } else {
          setData(data)
        }
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [supaCall])

  return { loading, data, error }
}

export default useFetchSupabase
