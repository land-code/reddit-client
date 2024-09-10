'use client'

import CurrentPost from '@/components/current-post'
import Feed from '@/components/feed'
import { useFeedStore } from '@/feedStore'

export default function Home() {
  const { feeds } = useFeedStore(({ feeds }) => ({ feeds }))
  return (
    <div className='flex min-h-screen'>
      <ul className='flex flex-1 border-r-2'>
        {feeds.map(({ name }) => (
          <Feed key={name} feedName={name} />
        ))}
      </ul>
      <aside className='h-full w-[600px] p-4 sm:p-8'>
        <CurrentPost />
      </aside>
    </div>
  )
}
