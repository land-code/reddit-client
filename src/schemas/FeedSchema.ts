import { z } from 'zod'

export const FeedName = z.string()

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
