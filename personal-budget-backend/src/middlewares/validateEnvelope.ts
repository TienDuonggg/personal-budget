import { Request, Response, NextFunction } from "express";

// Middleware kiểm tra dữ liệu đầu vào
const validateEnvelope = (req: Request, res: Response, next: NextFunction) => {
  const { name, balance } = req.body;
  
  if (!name || balance === undefined || typeof balance !== "number") {
    throw res.status(400).json({ message: "Thiếu name hoặc balance" });
  }

  next();
};

export default validateEnvelope;