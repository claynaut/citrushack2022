import useSWR from 'swr'

const fetcher = (...urls: string[]) => {
  const f = (url: string) => fetch(url).then(r => r.json())
  return Promise.all(urls.map(url => f(url)))
}

const useMultSWR = (urls: string[]) => {
  const { data, error } = useSWR(urls, fetcher)
  return {
    data: data,
    error: Boolean(error),
    loading: Boolean(!data && !error)
  }
}

export default useMultSWR