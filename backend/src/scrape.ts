import express from 'express';
import puppeteer from 'puppeteer';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

dotenv.config();
const router = express.Router();

async function summarizeText(text: string): Promise<string> {
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: text.substring(0, 1024),
          parameters: {
            max_length: 150,
            min_length: 50,
            do_sample: false,
          },
        }),
      }
    );


    const result = await response.json() as any;
    if (result[0]?.summary_text) {
      return result[0].summary_text;
    } else {
      return 'Summary could not be generated.';
    }
  } catch (error) {
    console.error('Summarisation error:', error);
    return 'Summary unavailable due to error.';
  }
}

// @ts-ignore
router.post('/scrape', async (req, res) => {
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
  const htmlContent = await page.content();

 // Close the browser
  await browser.close();

  const dom = new JSDOM(htmlContent, { url: userUrl });

  const document = dom.window.document;

  const reader = new Readability(document);
  const article = reader.parse();

  let content = '';
    let extractedTitle = title;
    let metadata = {};

  if (article) {
      content = article.textContent || '';
      extractedTitle = article.title || title;
      metadata = {
        byline: article.byline,
        excerpt: article.excerpt,
        length: article.length,
        siteName: article.siteName,
        publishedTime: article.publishedTime
      };
    } else {
      content = document.body.textContent || '';
    }

  dom.window.close();

  const summary = await summarizeText(content);

  res.json({
    success:true,
    data: {
      title: extractedTitle,
      content: content,
      summary: summary
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
