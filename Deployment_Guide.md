# Complete Free-Tier Deployment Guide: Label Tracker Pro

This guide has been specifically updated to use **Render** (free backend), **Neon** (free non-expiring Postgres database), and **Netlify** (free frontend). This completely avoids credit cards while keeping your app securely on the cloud.

---

### Step 0: Upload to GitHub
1. Go to [GitHub.com](https://github.com) and create a new private repository.
2. Push this entire project folder (both `frontend` and `backend` folders) to that GitHub repository.
*(Note: I have already automatically pushed the code for you in our last step! You can skip this.)*

---

### Step 1: Set up the Database (Neon)
Neon is a fantastic serverless Postgres database that has a generous free tier and does *not* expire after 90 days.
1. Go to **[Neon.tech](https://neon.tech)** and create a free account.
2. Click **New Project** and name it `label-tracker-db`.
3. Once created, you will see a connection string that looks like:
   `postgresql://neondb_owner:xxxxxxxxx@ep-cool-snowflake-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require`
4. **Copy this URL**. You will need it for the backend.

---

### Step 2: Deploy Backend to Render (Free Tier)
1. Go to **[Render.com](https://render.com)** and create a free account.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub account and select the `Label-tracker` repository.
4. **CRITICAL SETTINGS:**
   * **Root Directory**: `backend`
   * **Environment**: `Node`
   * **Build Command**: `npm install && npx prisma generate && npm run build`
   * **Start Command**: `npm start`
   * **Instance Type**: Free
5. **Set up Environment Variables:**
   * Scroll down to the **Environment Variables** section and click **Add Environment Variable**. Add these three:
     * Key: `DATABASE_URL` | Value: *(Paste your Neon Postgres URL from Step 1)*
     * Key: `GEMINI_API_KEY` | Value: *(Paste your Gemini API Key)*
     * Key: `FRONTEND_URL` | Value: `https://your-future-netlify-app-name.netlify.app` *(You will update this in Step 4)*
6. Click **Create Web Service**. 
7. It will take a few minutes to build. Once done, copy the URL at the top left (e.g., `https://label-tracker-backend.onrender.com`).

---

### Step 3: Deploy Frontend to Netlify
1. Go to **[Netlify.com](https://netlify.com)** and log in.
2. Click **Add new site** > **Import an existing project**.
3. Select GitHub and pick the `Label-tracker` repository.
4. **CRITICAL SETTINGS:**
   * **Base directory**: `frontend`
   * **Build command**: `npm run build`
   * **Publish directory**: `frontend/dist`
5. **Set up Environment Variables:**
   * Click **Add environment variables**.
   * Add a new variable:
     * Key: `VITE_API_URL` | Value: *(Paste your Render URL from Step 2)*
6. Click **Deploy Site**.

---

### Step 4: Final Connection & Keep-Alive (Fixing Render Sleep)
Render's free tier automatically goes to sleep if no one accesses it for 15 minutes. This would cause your daily automatic reports to fail if they trigger while the server is asleep. 

To fix this securely:
1. Netlify will finish building your frontend in about 1 minute. Get your live URL (e.g., `https://my-label-tracker.netlify.app`).
2. Go *back* to your Render dashboard.
3. Click the **Environment** tab, update `FRONTEND_URL` to be your exact Netlify URL, and hit Save.
4. **Keep-Alive & Cron Job**: Go to **[cron-job.org](https://cron-job.org)** (a free automated pinging service).
   * Create an account and click **Create Cronjob**.
   * **URL**: Paste your Render Backend URL followed by your report endpoint (e.g., `https://label-tracker-backend.onrender.com/api/reports/daily`)
   * **Execution schedule**: Set it to run exactly when you want your daily report to generate (e.g., Every day at 5:00 PM).
   * *(Optional Keep-Alive)*: If you want the backend to *never* sleep so it's always fast when you open the app, create a second cron job that pings your base URL (`https://label-tracker-backend.onrender.com`) every 10 minutes.

**You are fully deployed!** Everything is hosted for free indefinitely, and cron-job.org will guarantee your backend wakes up and triggers the daily report exactly when you need it.
