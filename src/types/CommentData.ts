import type { CommentSchema } from '@/schemas/CommentSchema'
import type { z } from 'zod'

export type CommentData = z.infer<typeof CommentSchema>
