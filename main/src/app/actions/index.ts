"use server"
import { Movie } from '@/lib/data';
import { base_url } from '@/lib/utils';
import { Redis } from '@upstash/redis'
import axios from "axios";
import { redirect } from 'next/navigation';

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
})

export const getMovieById = async (data:FormData)=>{
    try {
        const cache =await redis.get(data.get("id") as string)
        console.log("Fetching from redis");
        if(cache) {
            console.log(cache);
            return {data:cache}
        }
        const movie =await axios.get(base_url+"/api/movies/"+data.get("id"))
        if (movie.data.movie) {
            console.log(movie.data.movie);
            console.log("Uploading to redis");
            await redis.set(data.get("id") as string,JSON.stringify(movie.data.movie))
            console.log("Uploaded");
            return {data:movie.data.movie}
        }
        return{not_found:true}
    } catch (error) {
        console.log(error);
        return {error:true}
    }
}

export const getMovies = async (data:FormData) => {
    try {
        const cache =await redis.get(data.get("genre") as string)
        console.log("Fetching from redis");
        if(cache) {
            return {data:cache}
        }
        const movies = await axios.get(base_url+"/api/movies?genre="+data.get("genre")||"")
        if (movies.data.movies.length) {
            console.log("Uploading to redis");
            await redis.set(data.get("genre") as string,movies.data.movies,{ex:60})
            console.log("Uploaded");
            return {data:movies.data.movies}
        }
        return{not_found:true}
    } catch (error) {
        console.log("Error");
        return {error:true}
    }
}

export const addMovie = async (data:FormData) => {
    try {
        const title = data.get("title"); 
        const descr = data.get("descr"); 
        const casts = data.get("casts") as string || ""; 
        const genre = data.get("genre") as string || ""
        const release = data.get("release"); 
        const rating = data.get("rating"); 
        const tags = data.get("tags") as string || "";
        const id = data.get("id")
        const obj = {movies:[
            {
                id,title,descr,release,rating,casts:casts.split(','),genre:genre.split(','),tags:tags.split(',')
            }
        ]}
        const res = await axios.post(base_url+"/api/movies",JSON.stringify(obj))
        await redis.set(data.get("id") as string,JSON.stringify(res.data.movies[0]))
    } catch (error) {
        console.log(error);
    }
}

export const updateMovie = async (data:FormData) => {
    try {
        const title = data.get("title"); 
        const descr = data.get("descr"); 
        const casts = data.get("casts") as string || ""; 
        const genre = data.get("genre") as string || ""
        const release = data.get("release"); 
        const rating = data.get("rating"); 
        const tags = data.get("tags") as string || "";
        const id = data.get("id")
        const movie=
            {
                id,title,descr,release,rating,casts:casts.split(','),genre:genre.split(','),tags:tags.split(',')
            }
    
        const res = await axios.patch(base_url+"/api/movies/"+id,JSON.stringify({movie}))
        console.log(res.data);
        if(res.data.message.acknowledged){
            await redis.set(data.get("id") as string,JSON.stringify(movie))
            return {success:true}
        }
        return {success:false}
    } catch (error) {
        console.log(error);
        return{error:true}
    }
}


export const deleteMovie =async (data:FormData) => {
    try {
        const id = data.get("id") 
        const res = await axios.delete(base_url+"/api/movies/"+id)
        console.log(res.data);
        if(res.data.message.acknowledged){
            const res = await redis.del(id as string)
            console.log(res);
            return {success:true}
        }
        return {success:false}
    } catch (error) {
        console.log(error);
        return {error:true}
    }
}