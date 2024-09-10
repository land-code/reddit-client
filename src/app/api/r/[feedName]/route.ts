import { z } from 'zod'

const FeedName = z.string()

export const PostItemSchema = z.object({
  title: z.string(),
  url: z.string(),
  // selftext: z.string().nullable(),
  id: z.string(),
  ups: z.number()
})

export const FeedSchema = z.object({
  kind: z.string(),
  data: z.object({
    children: z.array(z.object({ data: PostItemSchema }))
  })
})

export type PostData = z.infer<typeof PostItemSchema>
export type FeedData = z.infer<typeof FeedSchema>

export const GET = async (
  req: Request,
  { params }: { params: { feedName: string } }
) => {
  const { feedName } = params
  const validateFeedName = FeedName.safeParse(feedName)
  if (!validateFeedName.success) {
    return new Response('Invalid feed name', { status: 400 })
  }
  const validatedFeedName = validateFeedName.data
  const response = await fetch(
    `https://www.reddit.com/r/${validatedFeedName}.json`
  )

  const data = await response.json()

  const validateFeed = FeedSchema.safeParse(data)
  if (!validateFeed.success) {
    console.log(validateFeed.error)
    return new Response('Invalid feed', { status: 400 })
  }

  return new Response(JSON.stringify(validateFeed.data), {
    status: 200
  })
}
