import { create } from 'zustand'
import { Feed } from './types/Feed'
import { persist } from 'zustand/middleware'

type FeedStore = {
  feeds: Feed[]
  addFeed: (feed: Feed) => void
  removeFeed: (feedName: string) => void
}

export const useFeedStore = create<FeedStore>()(
  persist(
    set => ({
      feeds: [],
      addFeed: feed =>
        set(state => {
          if (state.feeds.find(f => f.name === feed.name))
            throw new Error('Feed already exists')
          return { feeds: [...state.feeds, feed] }
        }),
      removeFeed: feedName =>
        set(state => ({
          feeds: state.feeds.filter(f => f.name !== feedName)
        }))
    }),
    { name: 'feed-store' }
  )
)
