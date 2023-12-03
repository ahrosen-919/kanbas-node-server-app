import "dotenv/config";
import express from 'express';
import Hello from "./hello.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
import session from "express-session";

const app = express()
app.use(cors({
   credentials: true,
   origin: "http://localhost:3000",
 })
);
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
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