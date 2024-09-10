import { useEffect, useState } from 'react'
import FeedOptionsMenu from './feed-options-menu'
import { FeedData, FeedSchema } from '@/app/api/r/[feedName]/route'
import { ChevronUp } from 'lucide-react'

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

  useEffect(() => {
    const displayData = async () => {
      setState({ status: 'loading' })
      const data = await getFeed(feedName)
      if (data instanceof Error) {
        setState({ status: 'error', error: data })
        return
      }
      setFeed(data)
      setState({ status: 'success' })
    }
    displayData()
  }, [feedName])

  return (
    <li className='w-full max-w-lg h-full border-r-2'>
      <article className='flex flex-col py-4 gap-4 w-full h-full'>
        <header className='flex gap-4 items-center px-4 justify-between'>
          <h2>{feedName}</h2>
          <FeedOptionsMenu feedName={feedName} />
        </header>
        <main>
          {state.status === 'loading' && <p>Loading...</p>}
          {state.status === 'error' && (
            <p className='text-red-500'>Error: {state.error.message}</p>
          )}
          {feed && (
            <ul className='flex flex-col gap-4'>
              {feed.data.children
                .slice(0, 10)
                .map(({ data: { title, ups } }, index) => (
                  <li key={index} className='border-b-2 px-4 py-2'>
                    <article className='flex items-center gap-8'>
                      <div className='flex flex-col items-center'>
                        <ChevronUp size={16} />
                        {ups}
                      </div>
                      <h1>{title}</h1>
                    </article>
                  </li>
                ))}
            </ul>
          )}
        </main>
      </article>
    </li>
  )
}
