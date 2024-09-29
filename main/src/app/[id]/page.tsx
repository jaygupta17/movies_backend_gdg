"use client"
import { useEffect, useState } from "react"
import { getMovieById } from "../actions"
import { Form } from "@/components/edit-form"
import { Movie } from "@/lib/data"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function page({params}:{params:{id:string}}) {
    const [movie,setMovie] = useState<Movie>()
    const {id} = params
    const fetchDetails = () => {
        const data = new FormData()
        data.append("id",id) 
        getMovieById(data).then(res=>{
            if(res.not_found || res.error) return alert("Failed to fetch")
            setMovie(res.data)
        })
    }
    useEffect(()=>{
        fetchDetails()
    },[])
    return(
        <div className="min-h-[100svh] p-3">
            {movie ? <Form id={movie?.id} title={movie?.title} descr={movie?.descr} tags={movie?.tags} rating={movie?.rating} release={movie?.release} genre={movie?.genre} casts={movie?.casts} /> :""}
            <div className="min-h-[90svh]">
                {movie ? <Card key={movie.id} className="overflow-hidden group hover:bg-white/5 dark transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="aspect-video group-hover:backdrop-blur-[10px] relative">
                {/* <img
                    src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(movie.title)}`}
                    alt={movie.title}
                    className="object-cover w-full h-full"
                /> */}
                <div className="hidden absolute z-3 w-full px-2 top-[35%] left-[50%] translate-x-[-50%] text-center text-sm font-normal  group-hover:flex">{movie.descr}</div>
                </div>
                <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 text-yellow-400 fill-yellow-400`}
                    />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{movie.rating}</span>
                </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                <Button className="w-full">View</Button>
                </CardFooter>
            </Card> : <h3 className="font-semibold text-lg mb-2">Not found</h3> }
            </div>
        </div>
    )
}