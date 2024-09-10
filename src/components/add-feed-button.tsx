import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function AddFeedButton () {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="Add feed">+</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:text-white">
        <DialogHeader>
          <DialogTitle>Add feed</DialogTitle>
          <DialogDescription>
            Add a new feed to your dashboard by entering the subreddit name below. For example, &quotr/programming&quot or &quotr/technology&quot.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Add feed</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}