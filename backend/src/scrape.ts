import express, { Request, Response } from 'express';
import puppeteer from 'puppeteer';

const router = express.Router()

router.post('/scrape', async (req: Request, res: Response) => {
  try {
  const userUrl = req.body.url

  if (!userUrl) {
    return res.json({
      success: false,
      error: 'Please provide a valid URL'
    });
  }

  // Open the browser
  const browser = await puppeteer.launch();

  // Open a new page
  const page = await browser.newPage();

  // Go to user's url
  await page.goto(userUrl)

  // Get the page title
  const title = await page.title();

  // Get the page content
  const content = await page.evaluate(() => {
    return document.body.innerText;
  });

 // Close the browser
  await browser.close();

  res.json({
    success:true,
    data: {
      title: title,
      content: content
    }
  });

} catch (error) {
    console.error('Scraping error:', error);
    res.json({
      success: false,
      error: 'Error while scraping'
    });
  }
});

export default router;
