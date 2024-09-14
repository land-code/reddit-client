import { z } from 'zod'

export const CommendId = z.string()

export const CommentSchema = z.array(
  z.object({
    data: z.object({
      children: z.array(
        z.object({
          data: z.object({
            title: z.string().optional(),
            selftext: z.string().optional(),
            body: z.string().optional(),
            url: z.string().optional(),
            author: z.string().optional(),
            created_utc: z.number().optional()
          })
        })
      )
    })
  })
)
