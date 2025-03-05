import { Request, Response, NextFunction } from "express";

const errorHandler =   (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("❌ Lỗi:", err.message)

  const statusCode = err.status || 500
  const message =  { message: "Lỗi server" }

  res.status(statusCode).json(message)

}


export default errorHandler;