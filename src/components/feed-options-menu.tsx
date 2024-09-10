import { RefreshCw } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import DeleteFeedButton from './delete-feed-button'

export default function FeedOptionsMenu({ feedName }: { feedName: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>⋮</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <RefreshCw className='mr-2 h-4 w-4' />
            <span>Refresh</span>
          </DropdownMenuItem>
          <DeleteFeedButton feedName={feedName} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
