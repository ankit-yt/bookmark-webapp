
# 📑 Smart Bookmark App

A modern, real-time bookmark management application built with **Next.js (App Router)** and **Supabase**. This app features secure Google OAuth authentication, Row Level Security (RLS), and instant cross-tab synchronization.

---

## 🚀 Live Demo

**Live URL:** [Add your Vercel deployment link here]

---

## ✨ Features

### 🔐 Authentication
* **Google OAuth:** Seamless login via Supabase Auth.
* **Server-Side Validation:** Secure session checks on the server.
* **Protected Routes:** Dashboard access is restricted to authenticated users.
* **Secure Logout:** Full session invalidation on sign-out.

### 🔖 Bookmark Management
* **Quick Add:** Easily save titles and URLs.
* **Auto-Formatting:** Smart URL handling (ensures `https://` prefix).
* **Optimistic UI:** Instant visual feedback before server confirmation.
* **Seamless Deletion:** Clean removal of saved links.

### 🛡️ Data Privacy & Security
* **Row Level Security (RLS):** Database-level protection ensuring users only see their own data.
* **Scoped Access:** Filtering by `user_id` at the database level.

### 🔄 Real-Time Updates
* **Supabase Realtime:** Instant updates across multiple browser tabs.
* **Efficient Filtering:** Real-time subscriptions are scoped specifically to the logged-in user.

### 🎨 UI/UX
* **Modern Interface:** Clean, SaaS-style aesthetic using Tailwind CSS.
* **Fully Responsive:** Optimized for mobile, tablet, and desktop.
* **Interactive Components:** Modal-based creation and smooth micro-interactions.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14+ (App Router)](https://nextjs.org/) |
| **Backend/DB** | [Supabase](https://supabase.com/) (PostgreSQL + Realtime) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📂 Project Structure

```text
app/
  ├── page.tsx               # Landing Page
  ├── dashboard/             # Main App Interface
  └── auth/callback/         # OAuth Callback Handler

components/
  └── dashboard/
      ├── DashboardLayout.tsx
      ├── BookmarkProvider.tsx # Real-time Context
      ├── BookmarkGrid.tsx
      ├── AddBookmarkModal.tsx
      └── ...

lib/
  ├── supabase-browser.ts    # Client-side Supabase init
  └── supabase-server.ts     # Server-side Supabase init

```

---

## ⚙️ Database Schema & Security

### Table: `bookmarks`

```sql
create table bookmarks (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  url text not null,
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc', now())
);

```

### Row Level Security (RLS)

We use the following policy logic to ensure data isolation:

> **Condition:** `auth.uid() = user_id`

---

## 🛠️ Local Development Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd smart-bookmark-app

```


2. **Install dependencies**
```bash
npm install

```


3. **Configure Environment Variables**
Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

```


4. **Run development server**
```bash
npm run dev

```



---

## 🔮 Future Roadmap

* [ ] **Search & Filtering:** Find bookmarks by keywords.
* [ ] **Tagging System:** Categorize links for better organization.
* [ ] **Dark Mode:** Support for system preferences.
* [ ] **Drag-and-Drop:** Custom reordering of bookmark cards.
* [ ] **Toast Notifications:** Enhanced feedback for CRUD operations.

---


```