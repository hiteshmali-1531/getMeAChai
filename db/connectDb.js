import mongoose from "mongoose";


const connectDb = async () =>{
    try{
        const conn = await mongoose.connect("mongodb://localhost:27017/chai");
        console.log(`mongodb connected : ${conn.connection.host}`)
    }catch(errore){
        console.error(errore)
        process.exit(1);
    }
}

export default connectDb;