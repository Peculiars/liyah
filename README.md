**Liyah (Stylique)**

This repository is a Next.js (App Router + TypeScript) portfolio/shop for commissioned pieces with an admin panel, Cloudinary uploads, and MongoDB storage.

**Tech stack:**
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **DB:** MongoDB (mongoose)
- **Auth:** next-auth (credentials provider)
- **Storage:** Cloudinary
- **Styling:** Tailwind / PostCSS

**Quick Start**

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file `.env.local` with the values below.

3. Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 to view the site.

Required environment variables
- `MONGODB_URI` — MongoDB connection string (used by [lib/mongodb.ts](lib/mongodb.ts#L1)).
- `NEXTAUTH_SECRET` — secret used by NextAuth ([lib/authOptions.ts](lib/authOptions.ts#L1)).
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — Cloudinary credentials ([lib/cloudinary.ts](lib/cloudinary.ts#L1)).

Optional / notes
- The admin seed script reads `MONGODB_URI` from `.env.local`; see [scripts/seedAdmin.ts](scripts/seedAdmin.ts#L1) for usage and defaults.

Seeding an initial admin user

Run the script once to create an initial admin account (change the defaults inside the file before running):

```bash
# with tsx
npx tsx scripts/seedAdmin.ts

# or with ts-node
npx ts-node --project tsconfig.json scripts/seedAdmin.ts
```

Scripts
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start the built app
- `npm run lint` — run ESLint

Project layout highlights
- App and pages: `app/`
- API routes: `app/api/` and `app/api/*`
- Admin panel: `app/(admin)/admin/` and `app/(admin)/admin/login`
- Server helpers and integrations: `lib/` (MongoDB, Cloudinary, auth)
- Data models: `models/`
- Seed script: [scripts/seedAdmin.ts](scripts/seedAdmin.ts#L1)

Deployment
- This project is compatible with Vercel; set the required environment variables in your deployment provider.

Security notes
- Keep `NEXTAUTH_SECRET` and Cloudinary API secrets out of source control. Use `.env.local` for local development and secure secret storage in production.

Contributing
- Open issues or PRs. For code style, follow existing TypeScript and ESLint rules.

Questions or next steps
- Want me to add a sample `.env.local.example` or commit these changes? I can add that next.

