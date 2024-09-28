import { Movie, movies } from "@/lib/data";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest) {
    const params  = req.nextUrl.searchParams
    const genre = params.getAll("genre") || ""
    const searchParams = params.get("search") || ""
    const casts = params.getAll("cast") || ""
    const production = params.getAll("prod") || ""
    const tags = params.getAll("tags") || ""

    try {
        const filter = (movie:Movie) => {
            const bySearch = movie.title.toLocaleLowerCase().replaceAll(" ","_").includes(searchParams) || movie.descr.toLocaleLowerCase().replaceAll(" ","_").includes(searchParams) || movie.casts.join("").toLocaleLowerCase().replaceAll(" ","_").includes(searchParams)
            return bySearch
        }
        const filterredMovies = movies.filter(movie=>filter(movie))
        return filterredMovies.length ? Response.json({movies:filterredMovies,success:true}) : Response.json({error:"Movie Not found"})
    } catch (error) {
        return Response.json({error:error})
    }
}

export async function POST(req:NextRequest) {
    try {
        const {movie}:{movie:Movie}=await req.json()
        return Response.json({movie})
    } catch (error) {
        return Response.json({error:error})
    }
}
