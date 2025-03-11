import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv"
import asyncHandler from "./middlewares/asyncHandler";
import errorHandler from "./middlewares/errorHandler";
import eveLopesRouter from "./routers/evelopesRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());




  app.use('/envelopes', eveLopesRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
