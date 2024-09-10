import { z } from 'zod'

const CommendId = z.string()

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

export type CommentData = z.infer<typeof CommentSchema>

export const GET = async (
  req: Request,
  { params }: { params: { commentId: string } }
) => {
  const { commentId } = params

  const validateCommentId = CommendId.safeParse(commentId)
  if (!validateCommentId.success) {
    return new Response('Invalid comment id', { status: 400 })
  }
  const validatedCommentId = validateCommentId.data

  const response = await fetch(
    `https://www.reddit.com/comments/${validatedCommentId}.json`
  )
  const data = await response.json()

  const validateComment = CommentSchema.safeParse(data)
  if (!validateComment.success) {
    console.error(validateComment.error)
    return new Response('Invalid comment', { status: 400 })
  }

  return new Response(JSON.stringify(validateComment.data), {
    status: 200
  })
}
