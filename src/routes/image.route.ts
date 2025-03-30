import { Router } from 'express';
import sharp from 'sharp'
import { Readable } from 'stream';

const router = Router();

router.get('/resize/:width/:height/:urlEncodedUrl', async (req, res, next) => {
  const { width, height, urlEncodedUrl } = req.params;
  console.log('\n\n', req.params, '\n\n');

  const url = decodeURIComponent(urlEncodedUrl)
console.log('\n\n', url, '\n\n');
  const imageResponse = await fetch(url)
  const imageArrayBuffer = await imageResponse.arrayBuffer();
  const buffer = Buffer.from(imageArrayBuffer)

  const stream = await sharp()
  .resize(200, 200)
  .composite([{
    input: buffer
  }])
  .toBuffer()

  const readable = new Readable()
  readable._read = () => {} // _read is required but you can noop it
  readable.push(stream)
  readable.push(null)

  readable.pipe(res)
})

export default router;