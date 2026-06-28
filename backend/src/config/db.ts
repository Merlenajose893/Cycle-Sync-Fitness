import mongoose from 'mongoose'
const connectDB=async () => {
    try {
      const mongoURI=process.env.MONGO_URI||"";
      await mongoose.connect(mongoURI) 
      console.log(`Mongo db connected ${mongoose.connection.host}`) 
    } catch (error:any) {
        console.error(`Error ${error.message}`);
        
    }
    
}
export  default connectDB;