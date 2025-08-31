# Content Update Checklist

This checklist will help us update the portfolio content section-by-section. Add your copy inline here, or reply with content and I’ll apply it directly.

Scope: The site is a portfolio (no Epic Management, no System Status, no Supabase DB). The /admin route has been disabled and Admin links removed from nav.

## 1) Homepage (Interactive Portfolio)
Sections to update:
- Hero
  - Brand line (pill): e.g., “Building the future of developer tools”
  - Title: “NatureQuest” or preferred
  - Rotating taglines (TypewriterCycle): provide 3–6 lines
  - Intro paragraph (1–2 sentences)
  - CTA buttons: primary label (and target section), secondary label (and target section)
- Projects
  - For each project (QuizMentor, DevMentor, Harvest.ai, Omni.ai):
    - Title
    - Tagline (short)
    - Description (1–2 sentences)
    - Key differentiators (3–5 bullets)
    - Status (Production/Beta/Active Development)
    - Metrics: 2–3 (e.g., Users, Accuracy, Processed)
    - Tech stack tags (list)
    - Live link (if any)
  - Roadmaps section title/subtitle (optional)
- About
  - Name, title, short bio
  - Social/contact links
  - Professional summary (2–4 paragraphs)
  - Work experience entries (title, company, period, description, 3–5 achievements)
  - Education & certifications
  - Skills lists (categories + tags) — can be trimmed
  - Key projects (name, description, tags)
  - Contact info block (email + links)
- Skills (Stack)
  - This renders ComprehensiveSkillsV2; if you want custom intro text, provide it
- Stats (optional section)
  - If you want different metrics labels/values, provide copy
- Book
  - Title, subtitle, description, bullets, CTAs (Pre-order / Read Sample), dates
- Blog
  - Article cards: titles, dates, excerpts, categories
- Contact
  - Header, subtitle, contact info (email, GitHub, LinkedIn, Twitter), availability note

## 2) Skills Showcase (/skills-showcase)
- Page title/subtitle
- Any tweaks to skill groups or per-skill descriptions
- Replace or trim lists where needed (e.g., languages, frontend, backend, cloud/devops, AI/ML, databases)

## 3) Storybook Docs (MDX)
- Component docs already set up with live Canvas/Source/Controls
- If you want copy changes in any component docs (e.g., Button, Card, Input), list them here

## 4) Visual/Branding
- Final gradient palette (primary/secondary)
- Logo or mark updates
- Background particle intensity (more/less) and motion preferences
- Dark-only or light/dark toggle preferences

## 5) Links/Contact
- Email to display
- GitHub org/profile
- LinkedIn URL(s)
- Twitter/X handle (optional)
- Availability messaging (e.g., consulting/freelance)

## 6) Out-of-scope Removal (done)
- /admin route disabled (404) and Admin nav links removed
- No System Status or Epic Management implemented

How to provide content
- Inline in this file under each section, or
- Paste content in chat grouped by section, or
- Provide a separate markdown doc. I’ll apply it to source.

Once you share copy, I’ll update the React components, MDX docs, and any labels/CTAs accordingly, and run build checks.

