
import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from "path"

import postRoutes from './routes/blogs.js';
import userRouter from "./routes/user.js";
import passwordRouter from "./routes/password.js"

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use("/images", express.static(path.join(process.cwd() + "/images")));

app.use('/blogs', postRoutes);
app.use("/user", userRouter);
app.use("/reset-password", passwordRouter);

const CONNECTION_URL = 'mongodb+srv://peerapong:peerapong123@cluster0.xnoei.mongodb.net/blogApp?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);