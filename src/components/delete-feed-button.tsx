'use client'

import { Delete } from 'lucide-react'
import { DropdownMenuItem } from './ui/dropdown-menu'
import { useFeedStore } from '@/feedStore'

export default function DeleteFeedButton({ feedName }: { feedName: string }) {
  const { removeFeed } = useFeedStore(({ removeFeed }) => ({ removeFeed }))
  const onDelete = () => {
    removeFeed(feedName)
  }
  return (
    <DropdownMenuItem onClick={onDelete}>
      <Delete className='mr-2 h-4 w-4' />
      <span>Delete</span>
    </DropdownMenuItem>
  )
}
