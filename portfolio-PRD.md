# 🌻 Designer Portfolio — Product Requirements Document

> **Project Type:** Personal Portfolio Website + Admin Dashboard  
> **For:** [Designer's Name] — Graphic Designer (Print & Social Media)  
> **Built by:** Raaj (via AI-assisted vibe coding)  
> **Last Updated:** July 2026  
> **Version:** 4.0 — Restructured to 4 public pages, homepage trimmed, contact page simplified

---

## 1. Project Overview

A personality-first portfolio website for a bold, colourful graphic designer who specialises in **pamphlets, carousels, thumbnails, and print/social media assets**. The site leads with *her* — her energy, her aesthetic, her vibe — before it leads with her work.

**The one job this site has:** Make a visitor feel like they've met a real, magnetic person within 5 seconds, and trust her with their brand.

**Target audience:** Small business owners, startups, creators, and hiring managers (targeting both freelance clients and full-time roles).

---

## 2. Design Philosophy

### Direction: "The Character"
The site opens with personality, not a portfolio grid. Work comes second. The person is the differentiator.

### Aesthetic: Bold, Warm, Alive
Think sunflower energy — unapologetically bright, warm, and full of life. Not chaotic, but confidently loud. Controlled maximalism. The site itself should feel like one of her designs.

### Tone of Voice
Casual, direct, warm. Sounds like a real human, not a LinkedIn profile. No corporate fluff.

---

## 3. Colour Palette

| Role | Name | Hex |
|---|---|---|
| **Primary** | Sunflower Yellow | `#FFD600` |
| **Accent 1** | Hot Coral | `#FF5C5C` |
| **Accent 2** | Cobalt Blue | `#1B5BFF` |
| **Accent 3** | Leaf Green | `#2ECC71` |
| **Background** | Warm Cream | `#FFFBF0` |
| **Surface** | Off White | `#F5F0E8` |
| **Text Primary** | Near Black | `#1A1A1A` |
| **Text Secondary** | Warm Grey | `#6B6560` |

### Usage Rules
- Yellow is the dominant personality colour — hero backgrounds, CTAs, highlights
- Coral and Blue are used for accents and hover states, never together in the same component
- Green is a tertiary accent — used sparingly (tags, badges, success states)
- Cream/Off-white backgrounds so colours pop without eye strain
- Never use pure `#FFFFFF` or `#000000` — keep it warm

---

## 4. Typography

| Role | Font | Usage |
|---|---|---|
| **Display / Hero** | Clash Display (Bold, ExtraBold) | Hero name, section headings |
| **Body** | Plus Jakarta Sans (Regular, Medium) | Paragraphs, descriptions |
| **Accent / Handwritten** | Caveat or Reenie Beanie | Labels, annotations, personality moments |
| **Mono (optional)** | JetBrains Mono | Small tags, metadata |

### Type Scale (approximate)
- Hero: `96–120px`, ExtraBold, tight letter-spacing
- H2: `48–64px`, Bold
- H3: `28–32px`, SemiBold
- Body: `16–18px`, Regular, `1.6` line-height
- Caption / Label: `12–14px`, Medium or Mono

---

## 5. Site Structure & Page Breakdown

The public site has **4 pages**. The homepage is a tight, curated intro — it previews everything and funnels visitors to the right dedicated page. No section tries to be exhaustive.

---

### Page 1 — Home (`/`)

**6 sections, fast-moving:**

**§1 Hero**
- Full viewport height, yellow background
- Her name in massive Clash Display
- One punchy one-liner
- Photo or illustrated avatar
- Animated doodle elements (squiggles, stars) in background
- Bouncy scroll indicator

**§2 About (Short)**
- 3 lines max — her voice, her vibe
- Scrolling personality ticker: `☀️ Sunflower girlie` · `🖨️ Print nerd` · `✦ Bold by default` · `☕ Oat latte enthusiast`
- "Open for work" pulsing badge (if toggled on in admin)
- Link: "More about me →" → `/about`

**§3 Featured Work**
- 3–4 hand-picked projects only (Featured flag in admin)
- Staggered card grid, hover reveals project name + type
- CTA: "See all my work →" → `/projects`

**§4 Services**
- 3–4 service cards, written in plain casual language
- Examples:
  - *"Social Media Packs — Carousels, reel covers, story templates. Your feed, but make it loud."*
  - *"Print Design — Pamphlets, flyers, posters. The kind people actually keep."*
  - *"Thumbnail Design — Click-worthy. Every time."*

**§5 Testimonials Preview**
- 1–2 quotes only, large pull-quote style
- Yellow `"` accent mark
- CTA: "Read more →" → `/about#testimonials`

**§6 Contact CTA Strip**
- Big warm line: *"Let's make something loud together."*
- Single button: "Get in touch" → `/contact`
- No form on homepage — just the link

---

### Page 2 — Projects (`/projects`)

Full portfolio grid — every published project.

- Filter tabs: **All / Carousels / Thumbnails / Print / Brand**
- Masonry or staggered grid layout
- Each card: cover image, project title, category badge
- Hover: colour overlay with client name (if available)
- Click → navigates to `/projects/[slug]`

**Sub-page: `/projects/[slug]`**
- Full image gallery (carousel or vertical scroll)
- Project title, category, client name
- Description
- "← Back to Projects" and "Next Project →" navigation

---

### Page 3 — About (`/about`)

The deeper story. Everything about her beyond the 3-line homepage blurb. **4 sections:**

**§1 Full Bio**
- Extended version of her story, written in her voice
- Candid photo

**§2 Certificates & Achievements**
- Card or timeline layout
- Each entry: certificate name, issuing organisation, year, type badge (Degree / Certification / Course / Award)
- Driven by Supabase `credentials` table

**§3 Academic Journey**
- Timeline of her education and professional milestones
- Same data source as credentials — just rendered as a timeline instead of cards

**§4 Testimonials (Full)**
- All published client testimonials
- Pull-quote style, with client photo (if available), name, role

**§5 Blog / Articles (Optional)**
- Cards linking out to external posts (Medium, Substack, LinkedIn articles — external URLs, not a built-in blog)
- If she has nothing yet, section is hidden until admin adds entries
- Each card: title, platform, short excerpt, date, "Read →" link

---

### Page 4 — Contact (`/contact`)

One job: give every way to reach her. No form.

- Big heading: *"Let's make something loud together."*
- Her **email** displayed plainly as a `mailto:` link — large, clickable
- **Social links** as large clickable icons with labels:
  - Instagram
  - Behance
  - LinkedIn
  - Any others (Twitter/X, Dribbble, etc.)
- Optional: "Currently open for work" badge (same toggle as homepage)
- Warm, inviting copy — *"Whether it's a quick question or a full project, I'd love to hear from you."*

---

## 6. Personality Moments & Micro-interactions

| Element | Behaviour |
|---|---|
| **Custom cursor** | Tiny sunflower 🌻 that follows the cursor on desktop |
| **Page load** | Logo or name animates in with a playful "pop" |
| **Hover on nav links** | Underline draws in with yellow |
| **Work card hover** | Slight tilt / rotate + colour overlay |
| **CTA button hover** | Fills from left to right with yellow |
| **Ticker strip** | Auto-scrolling, infinite loop, pauses on hover |
| **Secret easter egg** | Hidden somewhere (e.g. clicking the sunflower 5x triggers confetti) |
| **Colour mode toggle** | "🔆 Loud Mode" (default) vs "🌙 Calm Mode" (muted palette) |

---

## 7. Tech Stack

> ⚠️ **Stack Decision: Framer is OUT.** Adding a custom admin dashboard with full CRUD, auth, and image uploads requires a real full-stack setup. Framer CMS cannot do this. We're going **Next.js + Supabase + Cloudinary**.

### Full Architecture

```
┌─────────────────────────┐     ┌──────────────────────────┐
│   Public Portfolio      │     │     Admin Dashboard       │
│   (Next.js frontend)    │     │   /admin/* (protected)    │
│                         │     │                           │
│  Reads DB from          │     │  CRUD → Supabase DB       │
│  Supabase, images       │     │  Images → Cloudinary      │
│  served via Cloudinary  │     │  URLs saved in Supabase   │
└────────────┬────────────┘     └──────┬──────────┬─────────┘
             │                         │          │
             │                         ▼          ▼
             │                   ┌──────────┐  ┌────────────┐
             │                   │ Supabase │  │ Cloudinary │
             │                   │ Postgres │  │  (images)  │
             │                   │ Auth     │  │  CDN + opts│
             └──────────────────►│ RLS      │  └────────────┘
                                 └──────────┘
```

**How images flow:**
1. Admin uploads image in dashboard
2. Image uploads directly to **Cloudinary** → returns a URL
3. That URL is saved as a text field in **Supabase**
4. Public site fetches URL from Supabase, renders image from Cloudinary CDN
5. Cloudinary auto-serves WebP/AVIF + resizes via URL params — zero config needed

### Stack Table

| Layer | Tool | Reason |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | Raaj already knows it, SSR for fast public pages, API routes for admin |
| **Database** | Supabase (PostgreSQL) | Stores all content + image URLs, RLS for security |
| **Auth** | Supabase Auth | Magic link or email/password for admin, protects `/admin/*` |
| **Image Storage** | Cloudinary | CDN delivery, auto WebP/AVIF, resize-on-the-fly via URL params, generous free tier |
| **Styling** | Tailwind CSS | Fast, consistent, works great with the design system |
| **Animations** | Framer Motion | Micro-interactions, page transitions, ticker |
| **Fonts** | Fontshare + Google Fonts | Clash Display (Fontshare), Plus Jakarta Sans (Google) |
| **Icons** | Lucide React | Clean, tree-shakeable |
| **Deployment** | Vercel | Raaj's default, instant deploys, env vars support |
| **Analytics** | Umami (self-hosted on Vercel) | Privacy-friendly, free |
| **Forms (Contact)** | Native Next.js API route | POST to Supabase `contact_submissions` table |

### Environment Variables Needed
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=         # Server-side admin only, never exposed to browser

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME= # Used client-side for upload widget
CLOUDINARY_API_KEY=                # Server-side only
CLOUDINARY_API_SECRET=             # Server-side only, never expose
```

### Cloudinary Setup Notes
- Create an **unsigned upload preset** in Cloudinary dashboard → used by the admin upload widget (safe, no secret exposed)
- Organise uploads into folders: `/projects`, `/testimonials`, `/bio`
- Use Cloudinary's `next-cloudinary` package for the `<CldImage />` component — handles srcset, lazy load, and format auto
- Transformations via URL: append `f_auto,q_auto,w_800` for optimised delivery

---

## 8. Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| **Desktop** (`1280px+`) | Full layout, custom cursor, all animations |
| **Tablet** (`768–1279px`) | Simplified grid, smaller hero text, touch-friendly |
| **Mobile** (`< 768px`) | Single column, hero text scales down, cursor disabled, ticker still runs |

---

## 9. Performance & Accessibility

- All images: WebP format, lazy loaded
- Fonts: Preloaded, `font-display: swap`
- Animations: Respect `prefers-reduced-motion`
- Colour contrast: All text meets WCAG AA minimum
- Alt text: Required on all portfolio images
- Keyboard navigation: All interactive elements focusable

---

## 10. Copy Starters (to be refined with designer)

### Hero One-liner Options
1. *"I make things look so good, people actually stop scrolling."*
2. *"Bold design for brands that refuse to be boring."*
3. *"Your brand, but make it loud."*
4. *"Design that doesn't whisper."*

### About Blurb (draft)
> "Hey, I'm [Name] — a graphic designer who believes boring is the only real sin in design. I make carousels, thumbnails, pamphlets, and all the visual stuff that makes people stop, stare, and actually *engage*. Based in [City]. Open for work. Probably listening to a good playlist right now."

---

## 11. Admin Dashboard

### Overview
A protected section of the same Next.js app, accessible only to the designer. Lives at `/admin`. Built with a clean, minimal UI (no need to match the bold public site — clarity > aesthetics here).

### Auth Flow
1. Designer visits `/admin`
2. Redirected to `/admin/login` if no active session
3. Logs in with email + password (Supabase Auth)
4. Session stored in cookies — stays logged in
5. All `/admin/*` routes wrapped in a middleware auth check
6. Logout button in sidebar

### Admin Sidebar Navigation
```
🌻 [Her Name] Admin
─────────────────
📊 Dashboard
📁 Projects
👤 Bio & Profile
🎓 Credentials
💬 Testimonials
✍️  Blog Links
🛠️  Services
─────────────────
🚪 Logout
```

### Admin Pages — Detailed Spec

#### `/admin/projects`
- Table view of all projects (title, category, thumbnail preview, date added)
- "Add New Project" button → opens a form/modal
- Each row: Edit button, Delete button (with confirmation dialog)
- **Add / Edit form fields:**
  - Title (text)
  - Category (dropdown: Carousel / Thumbnail / Print / Brand / Other)
  - Description (textarea)
  - Client name (text, optional)
  - Images (multi-image upload → Cloudinary via unsigned upload preset)
  - Cover image selector (pick which uploaded image is the thumbnail)
  - Featured toggle (shows on homepage highlight)
  - Published toggle (draft vs live)

#### `/admin/bio`
- Single-page editor (no list, just one record)
- **Fields:**
  - Display name
  - Short bio (textarea, ~200 chars — used in hero)
  - Long bio (rich text or textarea — used in About section)
  - "Open for work" toggle (controls the pulsing badge on public site)
  - Profile photo upload
  - Location (text)
  - Social links: Instagram, Behance, LinkedIn, Email

#### `/admin/credentials`
- Table of academic credentials (degree, institution, year, description)
- Add / Edit / Delete
- **Fields:**
  - Credential title (e.g. "B.Des in Visual Communication")
  - Institution
  - Year (or year range)
  - Description (optional, short)
  - Type badge (Degree / Certification / Course / Award)

#### `/admin/testimonials`
- Card list of all testimonials
- Add / Edit / Delete / Reorder (drag or up/down arrows)
- **Fields:**
  - Client name
  - Client role & company (e.g. "Founder, Bloom Studio")
  - Quote (textarea)
  - Client photo (upload, optional)
  - Published toggle

#### `/admin/blogs`
- List of external blog/article links
- Add / Edit / Delete / Reorder
- **Fields:**
  - Article title
  - Platform (dropdown: Medium / LinkedIn / Substack / Other)
  - External URL
  - Short excerpt (optional)
  - Published date
  - Published toggle (hide until ready)

#### `/admin/services`
- List of service cards she offers
- Edit title, description, icon name
- Add / Delete / Reorder

### Admin UI Design
- Background: `#FAFAFA` (neutral, not the bold public palette)
- Sidebar: White with `#1A1A1A` text and `#FFD600` active indicator
- Buttons: Yellow primary, ghost secondary
- Keep it clean — she's using this to work, not to impress

---

## 12. Database Schema (Supabase / PostgreSQL)

```sql
-- Projects
create table projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  category    text not null,  -- 'carousel' | 'thumbnail' | 'print' | 'brand' | 'other'
  description text,
  client_name text,
  images      text[],         -- array of Cloudinary URLs
  cover_image text,           -- Cloudinary URL of thumbnail
  featured    boolean default false,
  published   boolean default true,
  created_at  timestamptz default now()
);

-- Bio (single row table — always upsert by id = 1)
create table bio (
  id            int primary key default 1,
  display_name  text,
  short_bio     text,
  long_bio      text,
  open_for_work boolean default true,
  photo_url     text,
  location      text,
  instagram     text,
  behance       text,
  linkedin      text,
  email         text
);

-- Credentials
create table credentials (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  institution text,
  year        text,
  description text,
  type        text,  -- 'degree' | 'certification' | 'course' | 'award'
  sort_order  int default 0,
  created_at  timestamptz default now()
);

-- Testimonials
create table testimonials (
  id          uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_role text,
  quote       text not null,
  photo_url   text,
  published   boolean default true,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

-- Services
create table services (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  icon        text,
  sort_order  int default 0
);

-- Blog / Article Links (external — no built-in blog)
create table blog_links (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  platform    text,           -- 'Medium' | 'LinkedIn' | 'Substack' | 'Other'
  url         text not null,
  excerpt     text,
  published_date date,
  published   boolean default true,
  sort_order  int default 0,
  created_at  timestamptz default now()
);
```

> **Note:** `contact_submissions` table removed — the Contact page no longer has a form. Email and socials are direct links only.

### Row Level Security (RLS) Rules
- **Public site** → can only `SELECT` from `projects`, `bio`, `credentials`, `testimonials`, `services` where `published = true`
- **Contact form** → can `INSERT` into `contact_submissions`, cannot read
- **Admin** → full access using `service_role_key`, never exposed to browser (server-side only)

---

## 13. Full Page Map

### 🌐 Public Site — 4 Pages

| Route | Page | Purpose | Key Sections |
|---|---|---|---|
| `/` | Home | Fast intro, funnels to other pages | Hero, About (short), Featured Work, Services, Testimonials preview, Contact CTA |
| `/projects` | Projects | Full portfolio grid | Filtered masonry grid of all published projects |
| `/projects/[slug]` | Project Detail | Individual project view | Full gallery, description, client, back/next nav |
| `/about` | About | Her full story | Bio, Certificates, Academic Journey, Testimonials, Blog links |
| `/contact` | Contact | Direct reach — no form | Email (mailto), Social media icons |

**Navigation bar links:** Home · Projects · About · Contact

---

### 🔐 Admin Dashboard — 11 Routes

| Route | Page | Purpose | Auth |
|---|---|---|---|
| `/admin/login` | Login | Email/password sign in | ❌ Public |
| `/admin` | Dashboard | Stats: projects, testimonials, unread contacts, open-for-work toggle | ✅ |
| `/admin/projects` | Projects List | View all, add new, delete | ✅ |
| `/admin/projects/new` | Add Project | Create new project with Cloudinary image upload | ✅ |
| `/admin/projects/[id]/edit` | Edit Project | Update existing project | ✅ |
| `/admin/bio` | Bio & Profile | Edit bio text, photo, socials, open-for-work toggle | ✅ |
| `/admin/credentials` | Credentials | Add/edit/delete certificates, degrees, awards | ✅ |
| `/admin/testimonials` | Testimonials | Add/edit/delete/reorder client testimonials | ✅ |
| `/admin/blogs` | Blog Links | Add/edit/delete external blog/article links | ✅ |
| `/admin/services` | Services | Edit service card copy and order | ✅ |
| `/admin/contact` | Contact Inbox | Read-only — removed (no form on public site) | — |

> **Note:** `/admin/contact` is removed since the Contact page no longer has a form. No submissions to manage.

---

### 🗂️ Full File Structure (Next.js App Router)

```
app/
├── (public)/
│   ├── layout.tsx                   → Public layout (Navbar + Footer)
│   ├── page.tsx                     → / (Home)
│   ├── projects/
│   │   ├── page.tsx                 → /projects
│   │   └── [slug]/
│   │       └── page.tsx             → /projects/[slug]
│   ├── about/
│   │   └── page.tsx                 → /about
│   └── contact/
│       └── page.tsx                 → /contact
│
├── admin/
│   ├── layout.tsx                   → Admin layout (Sidebar)
│   ├── login/
│   │   └── page.tsx                 → /admin/login
│   ├── page.tsx                     → /admin (dashboard)
│   ├── projects/
│   │   ├── page.tsx                 → /admin/projects
│   │   ├── new/
│   │   │   └── page.tsx             → /admin/projects/new
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx         → /admin/projects/[id]/edit
│   ├── bio/
│   │   └── page.tsx                 → /admin/bio
│   ├── credentials/
│   │   └── page.tsx                 → /admin/credentials
│   ├── testimonials/
│   │   └── page.tsx                 → /admin/testimonials
│   ├── blogs/
│   │   └── page.tsx                 → /admin/blogs
│   └── services/
│       └── page.tsx                 → /admin/services
│
middleware.ts                        → Protects all /admin/* except /admin/login
```

---

## 14. Open Questions (resolve before build)

- [ ] Designer's name and preferred handle
- [ ] Do we have a logo or should one be created?
- [ ] Photo or illustrated avatar — which does she prefer?
- [ ] List of projects to include at launch (aim for 6–10)
- [ ] Any existing brand colours she uses for herself?
- [ ] Testimonials available? (even DM screenshots work)
- [ ] Domain name sorted?
- [ ] Admin login email confirmed with designer

---

## 15. Launch Checklist

**Public Site**
- [ ] All portfolio images exported at 2x, WebP
- [ ] Mobile tested on real device
- [ ] Contact page email and all social links tested (mailto + external URLs open correctly)
- [ ] Blog links section hidden gracefully if no entries added yet
- [ ] Custom domain connected
- [ ] OG image set (for link previews on WhatsApp, LinkedIn etc.)
- [ ] Favicon = her logo or a sunflower
- [ ] Analytics connected
- [ ] "Open for work" status is accurate

**Admin Dashboard**
- [ ] Supabase project created, tables + RLS configured
- [ ] Admin login credentials set up and shared with designer securely
- [ ] `/admin` route confirmed blocked for unauthenticated users
- [ ] Cloudinary account created, upload preset configured, folders set up
- [ ] Image upload tested end-to-end (upload → Cloudinary → URL saved in Supabase → renders on public site)
- [ ] Designer walkthrough done — she can add a project end-to-end solo
- [ ] Contact submissions flowing into Supabase correctly
- [ ] Service role key NOT exposed in frontend (server-side only)

---

*PRD v4.0 — Restructured to 4 public pages. Homepage trimmed. About page added (credentials, academic journey, testimonials, blog links). Contact page simplified to email + socials only (no form). Blog links table + admin page added. Contact submissions removed.*
