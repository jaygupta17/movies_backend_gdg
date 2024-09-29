"use client"
import { addMovie, updateMovie } from "@/app/actions"
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
import { Movie } from "@/lib/data"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

export function Form({title,descr,tags,casts,genre,rating,release,id}:Movie) {
    const [Etitle, setTitle] = useState<string>(title || ""); 
    const [Edescr, setDescr] = useState<string>(descr || ""); 
    const [Ecasts, setCasts] = useState<string[]>(casts); 
    const [Egenre, setGenre] = useState<string[]>(genre); 
    const [Erelease, setRelease] = useState<string>(release); 
    const [Erating, setRating] = useState<string>(rating); 
    const [Etags, setTags] = useState<string[]>(tags);
    const [isPending,startTransition] = useTransition()
    const router = useRouter()
    const handleSubmit = () => {
        const data = new FormData()
        const isEmpty = (!Etitle || !Edescr || !Ecasts.length || !Egenre.length || !Erelease || !Erating || !Etags.length)
        if(isEmpty) return alert("Fields are required")
        data.append("id",id)
        data.append("title", Etitle); 
        data.append("descr", Edescr); 
        data.append("casts", Ecasts.join(',')); 
        data.append("genre", Egenre.join(',')); 
        data.append("release", Erelease); 
        data.append("rating", Erating); 
        data.append("tags", Etags.join(','))
        startTransition(()=>{
          updateMovie(data).then(data=>{
            if(data.error || !data.success) return alert("error")
            alert("Updated")
            router.refresh()
            return
        })
        })
    }
  return (
    <Dialog>
      <DialogTrigger asChild className="block mx-auto">
        <Button variant="outline" className="text-white/80">Edit Movie</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Movie</DialogTitle>
          <DialogDescription>
            Make changes to your Movie Details
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4"> 
            <Label htmlFor="title" className="text-right"> Title </Label> 
            <Input id="title" defaultValue={Etitle} onChange={(e) => setTitle(e.target.value)} className="col-span-3" /> 
        </div> 
        <div className="grid grid-cols-4 items-center gap-4"> 
            <Label htmlFor="descr" className="text-right"> Description </Label> 
            <Input id="descr" defaultValue={Edescr} onChange={(e) => setDescr(e.target.value)} className="col-span-3" /> 
        </div> 
        <div className="grid grid-cols-4 items-center gap-4"> 
            <Label htmlFor="casts" className="text-right"> Casts </Label> 
            <Input id="casts" defaultValue={Ecasts ? Ecasts.join(',') : ""} onChange={(e) => setCasts(e.target.value.split(','))} className="col-span-3" /> 
        </div> 
        <div className="grid grid-cols-4 items-center gap-4"> 
            <Label htmlFor="genre" className="text-right"> Genre </Label> 
            <Input id="genre" defaultValue={Egenre? Egenre.join(','): ""} onChange={(e) => setGenre(e.target.value.split(','))} className="col-span-3" /> 
        </div> 
        <div className="grid grid-cols-4 items-center gap-4"> 
            <Label htmlFor="release" className="text-right"> Release Date </Label> 
            <Input id="release" defaultValue={Erelease} onChange={(e) => setRelease(e.target.value)} className="col-span-3" /> 
        </div> 
        <div className="grid grid-cols-4 items-center gap-4"> 
            <Label htmlFor="rating" className="text-right"> Rating </Label> 
            <Input id="rating" defaultValue={Erating} onChange={(e) => setRating(e.target.value)} className="col-span-3" /> 
        </div> 
        <div className="grid grid-cols-4 items-center gap-4"> 
            <Label htmlFor="tags" className="text-right"> Tags </Label> 
            <Input id="tags" defaultValue={Etags? Etags.join(',') : ""} onChange={(e) => setTags(e.target.value.split(','))} className="col-span-3" /> </div>
        </div>
        <DialogFooter>
            <Button disabled={isPending} type="submit" onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
