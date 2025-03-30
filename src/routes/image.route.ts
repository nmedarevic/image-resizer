import { Router } from 'express';
import sharp from 'sharp'
import { Readable } from 'stream';
import {getNumberParamMiddleware} from "../middleware/number-params.middleware"
import {getUrlDecodeMiddleware} from "../middleware/url-decode.middleware"

const router = Router();

const widthMiddleware = getNumberParamMiddleware("width")
const heightMiddleware = getNumberParamMiddleware("height")
const urlMiddleware = getUrlDecodeMiddleware("urlEncodedUrl")

router.get('/resize/:width/:height/:urlEncodedUrl', heightMiddleware, widthMiddleware, urlMiddleware, async (req, res, next) => {
  const { width, height, urlEncodedUrl } = res.locals;
  
  const imageResponse = await fetch(urlEncodedUrl)
  const imageArrayBuffer = await imageResponse.arrayBuffer();
  const buffer = Buffer.from(imageArrayBuffer)

  const stream = await sharp(buffer)
  .resize(width, height)
  .toBuffer()
  
  const readable = new Readable({
    read: () => {}
  })
  readable.push(stream)
  readable.push(null)
 
  readable.pipe(res)
})

export default router;