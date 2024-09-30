"use client"
import { useEffect, useState, useTransition } from "react"
import { deleteMovie, getMovieById } from "@/actions"
import { Form } from "@/components/edit-form"
import { Movie } from "@/lib/data"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function page({params}:{params:{id:string}}) {
    const [movie,setMovie] = useState<Movie>()
    const [isPending,startTransition] = useTransition()
    const router = useRouter()
    const {id} = params
    const fetchDetails = () => {
        const data = new FormData()
        data.append("id",id) 
        startTransition(()=>{
            getMovieById(data).then(res=>{
                if(res.not_found || res.error) return router.push("/")
                setMovie(res.data)
            })
        })
    }
    useEffect(()=>{
        fetchDetails()
    },[id])
    return(
        <div className="min-h-[100svh] p-3">
            {movie ? <Form id={movie?.id} title={movie?.title} descr={movie?.descr} tags={movie?.tags} rating={movie?.rating} release={movie?.release} genre={movie?.genre} casts={movie?.casts} /> :""}
            <div className="min-h-[90svh] flex justify-center items-center">
                {!isPending ? movie ? <Card key={movie.id} className="overflow-hidden group hover:bg-white/5 dark transition-all duration-300 hover:shadow-lg hover:-translate-y-1 md:h-[60%] h-[50%] md:w-[60%] w-[90%]">
                <div className="aspect-video group-hover:backdrop-blur-[10px] relative">
                {/* <img
                    src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(movie.title)}`}
                    alt={movie.title}
                    className="object-cover w-full h-full"
                /> */}
                <div className="hidden h-full w-full text-center text-sm font-normal justify-center items-center   group-hover:flex">{movie.descr}</div>
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
                <Button className="w-full" onClick={()=>{
                    const data = new FormData()
                    data.append("id",movie.id)
                    deleteMovie(data).then(res=>{
                        if(res.success){
                            alert("Movie Deleted from Database, It will be deleted from cache in 1 minute")
                            return router.push("/")
                        }
                        if(!res.success) return alert("Failed to delete")
                        return alert("Error")
                    })
                }}>Delete</Button>
                </CardFooter>
            </Card> : <h3 className="font-semibold text-lg mb-2">Not found</h3> : <h3 className="font-semibold text-lg mb-2">Loading...</h3> }
            </div>
        </div>
    )
}