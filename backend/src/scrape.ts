import express from 'express';
const router = express.Router()

router.post('/scrape', (req, res) => {
  res.send('Scrape complete')
})

export default router; 
