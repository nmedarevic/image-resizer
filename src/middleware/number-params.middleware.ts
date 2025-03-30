import { RequestHandler } from "express";

export const getNumberParamMiddleware = (paramName: string): RequestHandler => (req, res, next) =>{
  const param = req.params[paramName];

  if (typeof param === "undefined") {
    next()
  }
  const parsed = Number(param) 

  if (parsed === 0 || isNaN(parsed)) {
    res.status(400)
    res.send(`Invalid ${paramName}`)
    return;
  }

  res.locals[paramName] = parsed;

  next()
}