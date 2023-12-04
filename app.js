import "dotenv/config";
import express from 'express';
import Hello from "./hello.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import mongoose from "mongoose";
// mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
import session from "express-session";

// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(cors({
   credentials: true,
   origin: process.env.FRONTEND_URL
 })
);


const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

// mongodb+srv://rosenbergai:<password>@cluster0.vqwjhxl.mongodb.net/?retryWrites=true&w=majority

app.use(
  session(sessionOptions)
);


app.use(express.json());
UserRoutes(app);
Hello(app);
Lab5(app);
ModuleRoutes(app);
CourseRoutes(app)
app.listen(4000);