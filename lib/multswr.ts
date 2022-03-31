import useSWR from 'swr'

const fetcher = (...urls: string[]) => {
  const f = (url: string) => fetch(url).then(r => r.json())
  return Promise.all(urls.map(url => f(url)))
}

const useMultSWR = (urls: string[]) => {
  const { data, error } = useSWR(urls, fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry on 404.
      if (error.status === 404) return
  
      // Only retry up to 10 times.
      if (retryCount >= 10) return
  
      // Retry after 1.5 seconds.
      setTimeout(() => revalidate({ retryCount }), 1500)
    }
  })
  
  return {
    data: data,
    error: Boolean(error),
    loading: Boolean(!data && !error)
  }
}

export default useMultSWR