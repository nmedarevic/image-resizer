import { RequestHandler } from "express";

export const getUrlDecodeMiddleware = (paramName: string): RequestHandler => (req, res, next) =>{
  const param = req.params[paramName];

  if (param === "" || typeof param === "undefined") {
    return next()
  }

  const url = decodeURIComponent(param)

  res.locals[paramName] = url;

  next()
}