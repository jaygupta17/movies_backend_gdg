import { connect } from "@/db/connect"
import { movieModel } from "@/db/movie"
import { Movie } from "@/lib/data"
import { NextRequest } from "next/server"

export async function DELETE(_req:NextRequest,{params}:{params:{id:string}}) {
    await connect()
    try {
        const {id} = params
        const message =await movieModel.deleteOne({
            id:id
        }).exec()
        return Response.json({message})
    } catch (error) {
        return Response.json({error:error})
    }
}

export async function GET(_req:NextRequest,{params}:{params:{id:string}}) {
    await connect()
    try {
        const {id} = params
        const movie = await movieModel.findOne({
            id:id
        }).exec()
        return Response.json({movie})
    } catch (error) {
        return Response.json({error:error})
    }
}

export async function PATCH(req:NextRequest,{params}:{params:{id:string}}) {
    await connect()
    const {movie}:{movie:Movie} =await req.json()
    try {
        const {id} = params
        const message =await movieModel.updateOne({id:id},{
            $set:movie
        }).exec()
        return Response.json({message})
    } catch (error) {
        return Response.json({error:error})
    }
}
