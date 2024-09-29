"use client"
import { addMovie } from "@/app/actions"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function Form() {
    const [title, setTitle] = useState<string>(''); 
    const [descr, setDescr] = useState<string>(''); 
    const [casts, setCasts] = useState<string[]>([]); 
    const [genre, setGenre] = useState<string[]>([]); 
    const [release, setRelease] = useState<string>(''); 
    const [rating, setRating] = useState<string>(''); 
    const [tags, setTags] = useState<string[]>([]);
    const handleSubmit = () => {
        const data = new FormData()
        data.append("id","movie_"+title.replace(" ","_"))
        data.append("title", title); 
        data.append("descr", descr); 
        data.append("casts", casts.join(',')); 
        data.append("genre", genre.join(',')); 
        data.append("release", release); 
        data.append("rating", rating); 
        data.append("tags", tags.join(','))
        addMovie(data).then(data=>alert("Done"))
    }
  return (
    <Dialog>
      <DialogTrigger asChild className="block mx-auto">
        <Button variant="outline" className="text-white/80">Add movie</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4"> 
            <Label htmlFor="title" className="text-right"> Title </Label> 
            <Input id="title" defaultValue={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" /> 
        </div> 
        <div className="grid grid-cols-4 items-center gap-4"> 
            <Label htmlFor="descr" className="text-right"> Description </Label> 
            <Input id="descr" defaultValue={descr} onChange={(e) => setDescr(e.target.value)} className="col-span-3" /> 
        </div> 
        <div className="grid grid-cols-4 items-center gap-4"> 
            <Label htmlFor="casts" className="text-right"> Casts </Label> 
            <Input id="casts" defaultValue={casts.join(',')} onChange={(e) => setCasts(e.target.value.split(','))} className="col-span-3" /> 
        </div> 
        <div className="grid grid-cols-4 items-center gap-4"> 
            <Label htmlFor="genre" className="text-right"> Genre </Label> 
            <Input id="genre" defaultValue={genre.join(',')} onChange={(e) => setGenre(e.target.value.split(','))} className="col-span-3" /> 
        </div> 
        <div className="grid grid-cols-4 items-center gap-4"> 
            <Label htmlFor="release" className="text-right"> Release Date </Label> 
            <Input id="release" defaultValue={release} onChange={(e) => setRelease(e.target.value)} className="col-span-3" /> 
        </div> 
        <div className="grid grid-cols-4 items-center gap-4"> 
            <Label htmlFor="rating" className="text-right"> Rating </Label> 
            <Input id="rating" defaultValue={rating} onChange={(e) => setRating(e.target.value)} className="col-span-3" /> 
        </div> 
        <div className="grid grid-cols-4 items-center gap-4"> 
            <Label htmlFor="tags" className="text-right"> Tags </Label> 
            <Input id="tags" defaultValue={tags.join(',')} onChange={(e) => setTags(e.target.value.split(','))} className="col-span-3" /> </div>
        </div>
        <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
