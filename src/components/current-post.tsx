import { useFeedStore } from '@/feedStore'
import AddFeedButton from './add-feed-button'
import { useEffect, useState } from 'react'
import { CommentData } from '@/types/CommentData'
import Markdown from 'react-markdown'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

import markdownStyles from '@/markdown-styles.module.css'
import { State } from '@/types/State'

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
        <div className='sticky top-0 flex items-center gap-4 bg-transparent p-4 backdrop-blur-md'>
          <AddFeedButton />
          <h1>{postTitle}</h1>
        </div>
        <a
          href={postUrl}
          target='_blank'
          rel='noreferrer noopener'
          className='px-4 text-blue-500'
        >
          {postUrl}
        </a>
        <Markdown className={`${markdownStyles.reactMarkDown} px-4`}>
          {postDescription}
        </Markdown>
      </header>
      <main className='p-4'>
        <ul className='flex flex-col gap-4'>
          {comments?.map(({ data }, index) => {
            const date = data.created_utc
              ? new Date(data.created_utc * 1000)
              : null
            const lastUpdated = date ? date.toLocaleString() : null
            return (
              <li key={index}>
                <Card>
                  <CardContent>
                    <CardHeader className='flex-row items-center gap-2 space-y-0 px-0 pb-0 text-zinc-400'>
                      <CardTitle className='text-lg font-normal text-zinc-400'>
                        {data.author}
                      </CardTitle>
                      <span>·</span>
                      <p className='mt-0 p-0 text-sm'>{lastUpdated}</p>
                    </CardHeader>
                    <Markdown className={markdownStyles.reactMarkDown}>
                      {data.body}
                    </Markdown>
                  </CardContent>
                </Card>
              </li>
            )
          })}
        </ul>

        {state.status === 'loading' && <p>Loading...</p>}
        {state.status === 'error' && <p>{state.error.message}</p>}
      </main>
    </article>
  )
}
