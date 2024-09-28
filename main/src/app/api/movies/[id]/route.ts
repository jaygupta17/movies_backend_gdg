import { Movie,movies } from "@/lib/data"
import { NextRequest } from "next/server"

export async function GET(req:NextRequest) {
    try {
        const {movie}:{movie:Movie}=await req.json()
        return Response.json({movie})
    } catch (error) {
        return Response.json({error:error})
    }
}
