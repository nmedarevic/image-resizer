import { Router } from 'express';
import sharp from 'sharp'
import { Readable } from 'stream';

const router = Router();

router.get('/resize/:width/:height/:urlEncodedUrl', async (req, res, next) => {
  const { width, height, urlEncodedUrl } = req.params;
  console.log('\n\n', req.params, '\n\n');

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