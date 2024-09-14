import { FeedSchema, PostItemSchema } from '@/schemas/FeedSchema'
import { z } from 'zod'

export type PostItemData = z.infer<typeof PostItemSchema>
export type FeedData = z.infer<typeof FeedSchema>
