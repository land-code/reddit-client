import FeedOptionsMenu from './feed-options-menu'

type FeedProps = {
  feedName: string
}

export default function Feed({ feedName }: FeedProps) {
  return (
    <li className='w-full max-w-3xl h-full'>
      <article className='flex flex-col p-4 gap-4 w-full h-full sm:p-8 sm:gap-8'>
        <header className='flex gap-4 items-center sm:gap-8'>
          <h2>{feedName}</h2>
          <FeedOptionsMenu feedName={feedName} />
        </header>
        <p>Feed content goes here</p>
      </article>
    </li>
  )
}
