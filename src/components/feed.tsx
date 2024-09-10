import { useCallback, useEffect, useState } from 'react'
import FeedOptionsMenu from './feed-options-menu'
import { FeedData, FeedSchema } from '@/app/api/r/[feedName]/route'
import PostItem from './post-item'

type FeedProps = {
  feedName: string
}

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success' }

async function getFeed(feedName: string) {
  try {
    const response = await fetch(`/api/${feedName}`)
    const json = await response.json()
    return FeedSchema.parse(json)
  } catch (error) {
    return new Error('An error occurred')
  }
}
export default function Feed({ feedName }: FeedProps) {
  const [feed, setFeed] = useState<FeedData | null>(null)
  const [state, setState] = useState<State>({ status: 'idle' })

  const displayData = useCallback(async () => {
    setState({ status: 'loading' })
    setFeed(null)
    const data = await getFeed(feedName)
    if (data instanceof Error) {
      setState({ status: 'error', error: data })
      return
    }
    setFeed(data)
    setState({ status: 'success' })
  }, [feedName])

  useEffect(() => {
    displayData()
  }, [feedName, displayData])

  return (
    <li className='w-full max-w-lg h-full border-r-2'>
      <article className='flex flex-col py-4 gap-4 w-full h-full'>
        <header className='flex gap-4 items-center px-4 justify-between'>
          <h2>{feedName}</h2>
          <FeedOptionsMenu feedName={feedName} onRefresh={displayData} />
        </header>
        <main>
          {state.status === 'loading' && <p>Loading...</p>}
          {state.status === 'error' && (
            <p className='text-red-500'>Error: {state.error.message}</p>
          )}
          {feed && (
            <ul className='flex flex-col'>
              {feed.data.children
                .slice(0, 10)
                .map(({ data }, index) => (
                  <PostItem post={data} key={index} />
                ))}
            </ul>
          )}
        </main>
      </article>
    </li>
  )
}
