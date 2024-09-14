import { z } from 'zod'

export const FeedNameSchema = z.string().startsWith('r/')
