'use client'

import AddFeedButton from "@/components/add-feed-button";
import { useFeedStore } from "@/feedStore";

export default function Home() {
  const {feeds} = useFeedStore(({feeds}) => ({feeds}))
  console.log(feeds)
  return (
    <div><AddFeedButton />{feeds.map(feed => <p key={feed.name}>{feed.name}</p>)}</div>
  );
}
