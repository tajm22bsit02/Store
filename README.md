# StoreHub (Next.js + TypeScript)

A full-featured e-commerce store starter built with Next.js App Router, React, TypeScript, Tailwind CSS, Prisma schema, NextAuth integration, Stripe-ready checkout, and Zustand state management.

## Features

- Product catalog, detail pages, keyword search, filtering, and sorting
- Shopping cart with quantity updates and persistent localStorage state
- Wishlist support
- Authentication flows (login/register) + NextAuth credentials route
- Profile and address management
- Order history and tracking UI
- Stripe-compatible checkout API + order confirmation + invoice file generation
- Admin dashboard for product/order/inventory/user management and sales analytics
- Contact/support form and newsletter subscription endpoints

## Tech Stack

- Next.js 16 (compatible with Next.js 14+ requirements)
- React + TypeScript
- Tailwind CSS
- Prisma ORM schema
- NextAuth.js
- Stripe SDK
- Zustand

## Project Structure

- `/app` App Router pages
- `/components` UI components
- `/lib` utilities, state, validation, data
- `/pages/api` API routes
- `/prisma` database schema
- `/public` static assets
- `/styles` shared styling helpers

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Optional Environment Variables

```bash
NEXTAUTH_SECRET=your_secret
STRIPE_SECRET_KEY=sk_test_xxx
DATABASE_URL="file:./dev.db"
```
