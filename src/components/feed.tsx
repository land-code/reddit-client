import { useCallback, useEffect, useState } from 'react'
import FeedOptionsMenu from './feed-options-menu'
import { FeedSchema } from '@/schemas/FeedSchema'
import PostItem from './post-item'
import { FeedData } from '@/types/PostSchema'
import { State } from '@/types/State'

type FeedProps = {
  feedName: string
}

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
    <li className='h-full w-full max-w-lg border-r-2'>
      <article className='flex h-full w-full flex-col gap-4 py-4'>
        <header className='flex items-center justify-between gap-4 px-4'>
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
              {feed.data.children.slice(0, 10).map(({ data }, index) => (
                <PostItem post={data} key={index} />
              ))}
            </ul>
          )}
        </main>
      </article>
    </li>
  )
}
