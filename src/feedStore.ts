import { create } from 'zustand'
import { Feed } from './types/Feed'
import { persist } from 'zustand/middleware'

type FeedStore = {
  actualPostId: string | null
  feeds: Feed[]
  addFeed: (feed: Feed) => void
  removeFeed: (feedName: string) => void
  setActualPostId: (postId: string) => void
}

export const useFeedStore = create<FeedStore>()(
  persist(
    set => ({
      feeds: [],
      actualPostId: null,
      addFeed: feed =>
        set(({ feeds, actualPostId }) => {
          if (feeds.find(f => f.name === feed.name))
            throw new Error('Feed already exists')
          return { feeds: [...feeds, feed], actualPostId }
        }),
      removeFeed: feedName =>
        set(({ feeds, actualPostId }) => ({
          feeds: feeds.filter(f => f.name !== feedName),
          actualPostId
        })),
      setActualPostId: postId =>
        set(({ feeds }) => ({
          feeds,
          actualPostId: postId
        }))
    }),
    { name: 'feed-store' }
  )
)
