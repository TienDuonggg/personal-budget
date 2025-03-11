
import express, { Request, Response, NextFunction } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import validateEnvelope from "../middlewares/validateEnvelope";
import Envelope from "../models";


const eveLopesRouter = express.Router();

eveLopesRouter.get("/", asyncHandler(async (req : Request, res: Response) => {
    const envelopes = await Envelope.find()
    
  res.json(envelopes);
}));

eveLopesRouter.post("/",validateEnvelope,  asyncHandler ( async (req : Request, res: Response) => {
    const {name, balance} = req.body
   
    const newEnvelopes = new Envelope({name, balance
    })
    await newEnvelopes.save()
  
  res.status(201).json(newEnvelopes);
}));

eveLopesRouter.put("/transfer/:from/:to",  asyncHandler ( async (req : Request, res: Response) => {
  try {

    const {from, to} = req.params
    const { amount} = req.body
  
    const fromEvelope = await Envelope.findById(from)
    
    
    if(!fromEvelope || fromEvelope.balance == null) {
      return res.status(404).json({ message: "Phong bì nguồn không tồn tại" }); 
    }
    const toEvelope = await Envelope.findById(to)
  
    if(!toEvelope || toEvelope.balance == null) {
      return res.status(404).json({ message: "Phong bì đích không tồn tại" }); 
    }
  
  
    if(fromEvelope.balance < amount){
      return res.status(400).json({ message: "Không đủ tiền trong phong bì nguồn" });
  
  
    }
  
    fromEvelope.balance -= amount
    toEvelope.balance += amount
    
  
   await fromEvelope.save()
   await toEvelope.save()
   return res.json({
      message: "Chuyển tiền thành công",
      from: {id: from, balance: fromEvelope.balance },
      to: {id: to, balance: toEvelope.balance }
      
      
    })
  }

  catch (error) {
    console.error("Lỗi chuyển tiền:", error);
    return res.status(500).json({ message: "Lỗi server khi chuyển tiền" });
  }

}));


eveLopesRouter.get("/:id", asyncHandler ( async (req : Request, res: Response) => {
  const {id} = req.params


  const envelopeId = await Envelope.findById(id)
  if(!envelopeId){
   return res.status(404).json({ message: "Envelope không tồn tại" })
  }
  
  return   res.status(201).json(envelopeId);
}));


eveLopesRouter.put("/:id", validateEnvelope,  asyncHandler ( async (req : Request, res: Response) => {
    const {id} = req.params
    const {name, balance} = req.body
    const updatedEnvelope = await Envelope.findByIdAndUpdate(id, {name, balance}, {new: true})

    if(!updatedEnvelope){
      return res.status(404).json({ message: "Envelope không tồn tại" });
    }
    return res.json(updatedEnvelope);
}));


eveLopesRouter.delete("/:id", asyncHandler ( async (req : Request, res: Response) => {
  const {id} = req.params
  const deletedEnvelope = await Envelope.findByIdAndDelete(id)
  if(!deletedEnvelope){
   return { status: 404, message: "Envelope không tồn tại" }
  }
  return res.json({ message: "Đã xóa phong bì thành công", envelope: deletedEnvelope });
}));

export default eveLopesRouter;