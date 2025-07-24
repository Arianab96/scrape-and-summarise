# Scrape and summarise 📝

## Demo

<a href="https://www.loom.com/share/255653b15d714da4a5cf49b8c74ead2c">
  <img src="https://cdn.loom.com/sessions/thumbnails/255653b15d714da4a5cf49b8c74ead2c-e242390ca53fae5f-full-play.gif" width="600" alt="Demo Video">
</a>

*Click the image above to watch the full demo*

## Overview 

This is a full-stack web application that allows users to extract content from any URL and generates summaries using AI. 

## How it's made 

<ins> Tech Used </ins>

* Angular
* Node.js
* Express.js
* TypeScript
* Puppeteer
* Hugging Face API

The app consists of an Angular frontend and a Node.js/Express backend. Users paste a URL into the form, and the backend scrapes the page content using Puppeteer. The scraped text is then sent to the Hugging Face Inference API, which uses the BART model to generate a summary of the content. The results, which include the page title, a content preview and the AI-generated summary, are displayed in the browser. 

## Optimisations

Implement caching mechanism to store previously scraped content and avoid re-scraping the same URLs. Add rate limiting to prevent API abuse and manage costs. Implement batch processing for multiple URLs simultaneously. Add support for different AI models based on content type (news vs academic vs social media). Create a Chrome extension version for one-click summarization while browsing. Implement content classification to automatically adjust summarization parameters. Add user accounts to save scraping history. 

## Learnings

Separating route handlers into dedicated files (scrape.ts) keeps the main server file (index.ts) clean and focused on configuration, making the codebase more maintainable and easier to test individual features. AI API integration requires careful consideration of rate limits and token usage, especially on free tiers, making content length optimization crucial.
