import mongoose, { Model, models, Schema } from "mongoose"

interface Movie extends Document{
    id:string,
    title:string;
    descr:string;
    casts:string[];
    genre:string[];
    tags:string[];
    rating:string;
    release:Date;
}
const movieSchema = new Schema({ 
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true }, 
    descr: { type: String, required: true }, 
    casts: [{ type: String, required: true }], 
    genre: [{ type: String, required: true }], 
    tags: [{ type: String, required: true }], 
    rating: { type: String, required: true }, 
    release: { type: Date, required: true } 
}); 

export const movieModel : Model<Movie>=models.movies || mongoose.model<Movie>('movies', movieSchema);
