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
