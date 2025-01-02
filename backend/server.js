// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import userRouter from './routes/userRoute.js'

// // App Config
// const app = express()
// const port = process.env.PORT || 4000
// connectDB()
// connectCloudinary()

// // middlewares
// app.use(express.json())
// app.use(cors())

// // api endpoints
// app.use('/api/user',userRouter);

// app.get('/',(req,res)=>{
//     res.send("API Working")
// })

// app.listen(port, ()=> console.log('Server started on PORT : '+ port))


// In your Express server file (e.g., app.js or server.js)





import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import logRouter from './routes/logRoute.js'; 
import Log from './models/logModel.js';  

// App Config
const app = express();
app.use('/uploads', express.static('uploads'));
const port = process.env.PORT || 4000;

// DB & Cloudinary config
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());


// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/logs', logRouter);

// Fetch logs from MongoDB
app.get('/api/logs', async (req, res) => {
  try {
    const logs = await Log.find(); // Fetch all logs from the MongoDB database
    res.status(200).json({ logs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs" });
  }
});

app.get('/', (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log('Server started on PORT : ' + port));