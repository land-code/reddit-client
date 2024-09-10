import { create } from 'zustand'
import { Feed } from './types/Feed'

type FeedStore = {
  feeds: Feed[]
  addFeed: (feed: Feed) => void
}

export const useFeedStore = create<FeedStore>(set => ({
  feeds: [],
  addFeed: feed =>
    set(state => {
      if (state.feeds.find(f => f.name === feed.name))
        throw new Error('Feed already exists')
      return { feeds: [...state.feeds, feed] }
    })
}))
