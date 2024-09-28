import mongoose from "mongoose";

type ConnectionObject={
    isConnected?:number
}
const connection : ConnectionObject = {}

async function connect():Promise<void>{
    if(connection.isConnected){
        console.log("Already Connected");
        return
    }
    try {
        console.log("Connecting");
        const db = await mongoose.connect(process.env.MONGO_URI || "")
        connection.isConnected=db.connections[0].readyState
        console.log("Connected");
    } catch (error) {
        console.log("Failed: ",error);
        process.exit(1)
    }
}

export default connect