import { useFeedStore } from '@/feedStore'
import AddFeedButton from './add-feed-button'
import { useEffect, useState } from 'react'
import { CommentData } from '@/app/api/comments/[commentId]/route'
import Markdown from 'react-markdown'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success' }

export default function CurrentPost() {
  const [comment, setComment] = useState<CommentData | null>(null)
  const [state, setState] = useState<State>({ status: 'idle' })

  const { actualPostId } = useFeedStore(({ actualPostId }) => ({
    actualPostId
  }))

  useEffect(() => {
    const displayData = async () => {
      setState({ status: 'loading' })
      setComment(null)
      const response = await fetch(`/api/comments/${actualPostId}`)
      if (!response.ok) {
        setState({ status: 'error', error: new Error('Failed to load post') })
        return
      }
      const data = await response.json()
      setComment(data)
      setState({ status: 'success' })
    }
    displayData()
  }, [actualPostId])

  const firstCommentData = comment?.[0].data.children[0].data

  const postTitle = firstCommentData?.title
  const postDescription = firstCommentData?.selftext
  const postUrl = firstCommentData?.url

  const comments = comment?.[1].data.children?.slice(1)

  console.log(comments)

  return (
    <article className='flex flex-col gap-4'>
      <header className='flex flex-col gap-4'>
        <div className='flex gap-4 items-center'>
          <AddFeedButton />
          <h1>{postTitle}</h1>
        </div>
        <a
          href={postUrl}
          target='_blank'
          rel='noreferrer noopener'
          className='text-blue-500'
        >
          {postUrl}
        </a>
        <Markdown>{postDescription}</Markdown>
      </header>
      <main>
        <ul className='flex flex-col gap-4'>
          {comments?.map(({ data }, index) => (
            <li key={index}>
              <Card>
                <CardContent>
                  <CardHeader className='px-0'>
                    <CardTitle>Comment</CardTitle>
                  </CardHeader>
                  <Markdown>{data.body}</Markdown>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </main>

      {state.status === 'loading' && <p>Loading...</p>}
      {state.status === 'error' && <p>{state.error.message}</p>}
    </article>
  )
}
