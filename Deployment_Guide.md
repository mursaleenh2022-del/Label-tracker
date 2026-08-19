# Complete Deployment Guide: Label Tracker Pro

I have fully prepared your codebase for production deployment! The backend is now equipped with a Dockerfile for Google Cloud, configured for PostgreSQL, and the frontend is wired to accept a dynamic cloud URL.

Here is your plain English, step-by-step guide to putting this live on the internet.

---

### Step 0: Upload to GitHub
Before starting, both Google Cloud and Netlify need to read your code.
1. Go to [GitHub.com](https://github.com) and create a new private repository.
2. Push this entire project folder (both `frontend` and `backend` folders) to that GitHub repository.

---

### Step 1: Set up the Database (PostgreSQL)
Google Cloud SQL can be notoriously difficult to connect to without advanced networking knowledge (VPC connectors). For a much smoother experience that gives you a standard Cloud Postgres database:
1. Go to **[Supabase.com](https://supabase.com)** or **[Neon.tech](https://neon.tech)** and create a free account.
2. Create a new PostgreSQL Project/Database.
3. Once created, look for your **Connection String** (it will look like `postgresql://user:password@host...`). 
4. **Copy this URL**. You will need it in a moment.

---

### Step 2: Deploy Backend to Google Cloud Run
1. Go to the **Google Cloud Console** and search for **Cloud Run**.
2. Click **Create Service**.
3. Choose **Continuously deploy new revisions from a source repository**.
4. Click **Set up with Cloud Build**, authenticate your GitHub account, and select your repository.
5. **CRITICAL SETTINGS:**
   * **Source Directory**: Type `/backend` (since your backend is in this subfolder).
   * **Build Type**: Select **Dockerfile**.
6. **Set up Secrets (Environment Variables):**
   * Scroll down and expand the **Container, Variables & Secrets** section.
   * Click the **Variables** tab and click **Add Variable**.
   * Add the following 3 variables:
     * Name: `DATABASE_URL` | Value: *(Paste your Postgres URL from Step 1)*
     * Name: `GEMINI_API_KEY` | Value: *(Paste your actual Gemini API Key)*
     * Name: `FRONTEND_URL` | Value: `https://your-future-netlify-app-name.netlify.app` *(You can update this later once you know your Netlify URL)*
7. Scroll to the bottom, ensure "Allow unauthenticated invocations" is checked (so the frontend can reach it), and click **Create**.
8. Wait 2-3 minutes. When it finishes, it will give you a **Service URL** at the top. **Copy this URL**.

---

### Step 3: Deploy Frontend to Netlify
1. Go to **[Netlify.com](https://netlify.com)** and log in.
2. Click **Add new site** > **Import an existing project**.
3. Select GitHub and pick your repository.
4. **CRITICAL SETTINGS:**
   * **Base directory**: `frontend`
   * **Build command**: `npm run build`
   * **Publish directory**: `frontend/dist`
5. **Set up Secrets (Environment Variables):**
   * Click **Add environment variables**.
   * Add a new variable:
     * Name: `VITE_API_URL` | Value: *(Paste your Google Cloud Run Service URL from Step 2)*
6. Click **Deploy Site**.

---

### Step 4: Final Connection (The Loop)
1. Netlify will take about 1 minute to build your frontend. Once done, it will give you a live green URL (e.g., `https://my-label-tracker.netlify.app`).
2. Go *back* to Google Cloud Run.
3. Click **Edit & Deploy New Revision**.
4. Go to the Variables tab and update `FRONTEND_URL` to be your exact new Netlify URL.
5. Click **Deploy**.

**You are done!** 
Your app is now live securely! Because we used Environment Variables in the dashboards, your passwords and API keys are heavily encrypted by Google and Netlify and will *never* be visible in your code.
