import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

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
            Add a new feed to your dashboard by entering the subreddit name below. For example, &quot;r/programming&quot; or &quot;r/technology&quot;.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="r/programming"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add feed</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}