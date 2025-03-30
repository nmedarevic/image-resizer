import { Router } from 'express';

const router = Router();

router.get('/resize/:width/:height/:url', async (req, res, next) => {

  next();
})

export default router;