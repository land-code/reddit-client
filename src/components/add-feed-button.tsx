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

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success' }

export default function AddFeedButton() {
  const [state, setState] = useState<State>({ status: 'idle' })
  const { addFeed } = useFeedStore(({ addFeed }) => ({ addFeed }))
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
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
  }
  return (
    <Dialog>
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
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input
                name='name'
                id='name'
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
