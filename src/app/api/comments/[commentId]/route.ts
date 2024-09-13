import { CommendId, CommentSchema } from '@/schemas/CommentSchema'

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
