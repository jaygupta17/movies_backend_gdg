"use client"

import { getMovies } from "@/actions"
import { filterMovies, Movie } from "@/lib/data"
import { useEffect, useState,useTransition } from "react"
import MovieFeed from "./movie-card"

export const Feed = () => {
    const [search,setSearch] = useState<string>("")
    const [genre,setGenre] = useState<string>("")
    const [year,setYear] = useState<string>()
    const [movies,setMovies] = useState<Movie[]>()
    const [filteredMovies,setFilteredMovies] = useState<Movie[]>()
    const [isPending,startTransition] = useTransition()
    const fetchMovies = () => {
        const data = new FormData()
        data.append("genre",genre)
        startTransition(()=>{
            getMovies(data).then(data=>{
                if (data.not_found) {
                    return setMovies(undefined)
                }
                setFilteredMovies(filterMovies(data.data,search,year))
            })
        })
    }
    useEffect(()=>{
        fetchMovies()
    },[search,genre,year])

    return(
        <div className="min-h-[100svh] p-3">
            <div className="p-5 grid grid-rows-2 gap-y-2 md:grid-rows-1 md:gap-x-3 md:grid-cols-7">
                <input placeholder="Search..." className="w-full px-4 md:col-span-6 py-3 text-white/80 outline-none bg-white/5 hover:bg-white/10 rounded-lg text-xl" type="text" onChange={(e)=>setSearch(e.target.value)} defaultValue={search}/>
                <select defaultValue={""} className="md:col-span-1 px-3 focus:bg-neutral-800 rounded-lg text-white/90 bg-white/5 hover:bg-white/10" onChange={e=>setGenre(e.target.value)}>
                    <option className="bg-white/5 hover:bg-white/10" value={""}>Genre</option>
                    <option className="bg-white/5 hover:bg-white/10" value="crime">Crime</option>
                    <option className="bg-white/5 hover:bg-white/10" value="drama">Drama</option>
                    <option className="bg-white/5 hover:bg-white/10" value="romance">Romance</option>
                    <option className="bg-white/5 hover:bg-white/10" value="western">Western</option>
                    <option className="bg-white/5 hover:bg-white/10" value="history">History</option>
                    <option className="bg-white/5 hover:bg-white/10" value="action">Action</option>
                    <option className="bg-white/5 hover:bg-white/10" value="sci-fi">Sci-Fi</option>
                </select>
            </div>
            <div className="min-h-[90svh] flex justify-center items-center">
                {!isPending ? filteredMovies?.length ? <MovieFeed movies={filteredMovies}/> : "Not Found!! Fetching..." :"Loading..."}
            </div>
        </div>
    )
}