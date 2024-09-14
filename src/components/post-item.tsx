import { PostData } from '@/app/api/r/[feedName]/route'
import { useFeedStore } from '@/feedStore'
import { ChevronUp } from 'lucide-react'

type PostItemProps = {
  post: PostData
}

export default function PostItem({ post }: PostItemProps) {
  const { title, ups, id } = post
  const { setActualPostId, actualPostId } = useFeedStore(
    ({ setActualPostId, actualPostId }) => ({
      setActualPostId,
      actualPostId
    })
  )
  return (
    <li>
      <button
        className={`w-full cursor-pointer border-b-2 px-4 py-2 text-start hover:bg-zinc-300 dark:hover:bg-zinc-800 ${actualPostId === id ? 'bg-zinc-300 dark:bg-zinc-800' : ''}`}
        onClick={() => setActualPostId(id)}
      >
        <article className='flex items-center gap-8'>
          <div className='flex flex-col items-center'>
            <ChevronUp size={16} />
            {ups}
          </div>
          <h1>{title}</h1>
        </article>
      </button>
    </li>
  )
}
