'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useFeedStore } from '@/feedStore'
import { DialogState } from '@/types/DialogState'

export default function AddFeedButton() {
  const [state, setState] = useState<DialogState>({ status: 'close' })
  const { addFeed } = useFeedStore(({ addFeed }) => ({ addFeed }))
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = formData.get('feed-name')
    if (typeof name !== 'string' || !name) {
      setState({ status: 'error', error: new Error('Name is required') })
      return
    }
    if (!name.startsWith('r/')) {
      setState({
        status: 'error',
        error: new Error('Name must start with "r/"')
      })
      return
    }
    setState({ status: 'loading' })
    try {
      addFeed({
        name: name
      })
    } catch (error) {
      if (error instanceof Error) {
        setState({ status: 'error', error })
        return
      }
      setState({ status: 'error', error: new Error('An error occurred') })
      return
    }
    setState({ status: 'close' })
  }
  return (
    <Dialog
      open={state.status !== 'close'}
      onOpenChange={open => setState({ status: open ? 'idle' : 'close' })}
    >
      <DialogTrigger asChild>
        <Button title='Add feed'>+</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add feed</DialogTitle>
          <DialogDescription>
            Add a new feed to your dashboard by entering the subreddit name
            below. For example, &quot;r/programming&quot; or
            &quot;r/technology&quot;.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='feed-name' className='text-right'>
                Feed name
              </Label>
              <Input
                name='feed-name'
                id='feed-name'
                defaultValue='r/programming'
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            {state.status === 'error' && (
              <p className='text-red-500'>{state.error.message}</p>
            )}
            <Button type='submit'>Add feed</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
