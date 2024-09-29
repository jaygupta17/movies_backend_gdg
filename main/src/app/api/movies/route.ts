import { connect } from "@/db/connect";
import { movieModel } from "@/db/movie";
import { Movie } from "@/lib/data";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest) {
    await connect()
    const params  = req.nextUrl.searchParams
    const genre = params.get("genre") || ""
    const year = params.get("year") || "0"
    try {
        const movies =await movieModel.find({
                genre:{
                    $regex:new RegExp(`^${genre.toLowerCase()}`,'i')
                },
        }).exec()
        return Response.json({success:"true",movies})
    } catch (error) {
        console.log(error);
        return Response.json({error})
    }
}

export async function POST(req:NextRequest) {
    await connect()
    try {
        const {movies}:{movies:Movie[]}=await req.json()
        const res =await movieModel.insertMany(movies)
        return Response.json({movies})
    } catch (error) {
        return Response.json({error})
    }
}



















//Use later
// const filter = (movie:Movie) => {
        //     const bySearch = movie.title.toLocaleLowerCase().replaceAll(" ","_").includes(searchParams) || movie.descr.toLocaleLowerCase().replaceAll(" ","_").includes(searchParams) || movie.casts.join("").toLocaleLowerCase().replaceAll(" ","_").includes(searchParams)
        //     const byYear = movie.release.getFullYear().toString() === year
        //     const byGenre = movie.genre.some(x=>genre.includes(x.toLocaleLowerCase()))
        //     const byTag = movie.tags.some(x=>tags.includes(x.toLocaleLowerCase()))
        //     return {bySearch,byYear,byGenre}
        // }
        // const filterredMovies = movies.filter(movie=>{
        //     const {bySearch,byYear,byGenre} = filter(movie)
        //     if(genre.length){
        //         if(year){
        //             if (searchParams) {
        //                 return byYear && byGenre && bySearch
        //             }
        //             return byYear && byGenre
        //         }
        //         if(searchParams) return byGenre && bySearch
        //         return byGenre
        //     }
        //     if(year){
        //         if(searchParams) return byYear && bySearch
        //         return byYear
        //     }
        //     return bySearch
        // })
        // return filterredMovies.length? Response.json({movies:filterredMovies,success:true}) : Response.json({error:"Movie Not found"})