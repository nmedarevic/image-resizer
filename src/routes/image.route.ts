import { Router } from 'express';
import sharp from 'sharp'
import { Readable } from 'stream';

const router = Router();

router.get('/resize/:width/:height/:urlEncodedUrl', async (req, res, next) => {
  const { width, height, urlEncodedUrl } = req.params;
  console.log('\n\n', req.params, '\n\n');

  const parsedWidth = Number(width) 
  const parsedHeight = Number(height) 

  console.log('\n\n', parsedWidth, '\n\n');
  console.log('\n\n', parsedHeight, '\n\n');
  
  if (parsedWidth === 0 || isNaN(parsedWidth)) {
    res.status(400)
    res.send("Invalid width")
    return;
  }

  if (parsedHeight === 0 || isNaN(parsedHeight)) {
    res.status(400)
    res.send("Invalid height")
    return;
  }

  const url = decodeURIComponent(urlEncodedUrl)

  const imageResponse = await fetch(url)
  const imageArrayBuffer = await imageResponse.arrayBuffer();
  const buffer = Buffer.from(imageArrayBuffer)

  const stream = await sharp(buffer)
  .resize(200, 200)
  .toBuffer()
  
  const readable = new Readable({
    read: () => {}
  })
  readable.push(stream)
  readable.push(null)
 
  readable.pipe(res)
})

export default router;