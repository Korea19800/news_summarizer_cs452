# Final project for CS452

## 1. Initial ERD Sketch

![2a-sequence-diagram-2025-03-13-054049](https://github.com/user-attachments/assets/e2d1a8c9-5565-44d0-a272-afe4852a250f)

### Notes
- A USER can create many NEWS_SUMMARY entries.
- A NEWS_ARTICLE could have many corresponding NEWS_SUMMARY entries 

## 2. Rough System Design Sketch

### Flow Explanation
![2a-sequence-diagram-2025-03-13-054312](https://github.com/user-attachments/assets/7b6f07d2-797d-4404-a872-2feac24743ef)

- User's Browser (A) clicks “Get News.”
- Front-End Web App (B) sends a request to the backend.
- Backend (C) fetches real-time news from a third-party News API (D).
- Backend (C) sends the fetched text to OpenAI (E) for one-line summarization.
- Summaries may be temporarily stored in the Cache (F) for fast reads.
- Summaries are written to the Primary DB (G) for persistent storage.
- When the user requests “Show Summaries,” the backend reads from cache or DB and returns results to the front-end.


## 3. Project Milestones & Goals

### By 3/19
Goal: Have a basic, minimal working skeleton
A simple web page with a “Get News” button.
A backend endpoint that, when clicked, returns any hard-coded message (just to prove the frontend-backend flow works).
Optional: Set up a skeleton database schema (e.g., local Postgres).

### By 3/26
Goal: Integrate real News API data and store it
The “Get News” button fetches real news from your chosen news API.
The backend can store fetched article data (raw or partially processed) in your DB.
Display the fetched news back to the user in some simple UI list.

### By 4/2
Goal: Integrate OpenAI summarization
Take the fetched news data, run it through OpenAI to get one-line summaries.
Store those summaries in the database.
Show the newly summarized news to the user (read from DB).

### By 4/9
Goal: Add Caching + Basic Scalability
Introduce Redis (or similar) to cache results of either:
The news articles (to reduce API calls).
The summarized text (to speed up repeated reads).
Ensure your system can handle a decent number of read/write requests quickly (subsecond latency if possible).
Optional: Introduce concurrency handling, e.g., how to handle multiple users requesting the same news simultaneously.

### By 4/16
Goal: Polish and finalize
Add any final security measures (e.g., authentication, rate limits, etc.).
Improve error handling and logs.
Possibly demonstrate a minimal failover or high-availability approach (if relevant to your system).
Clean up your code/documentation so you can show the project end-to-end:
“Press the button -> fetch news -> summarize -> store -> retrieve -> display.”

<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
