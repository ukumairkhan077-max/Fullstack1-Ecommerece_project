# Rabbit Store — React + Vite E-Commerce

## Run in 3 commands

```bash
cd frontend
npm install
npm run dev
```

Then open: http://localhost:5173

## Routes

| URL | Page |
|---|---|
| / | Home page |
| /collection/men | Men's collection |
| /collection/women | Women's collection |
| /collection/topwear | Top wear collection |
| /collection/bottomwear | Bottom wear collection |
| /product/:sku | Product detail page |
| /login | Login page |
| /register | Register page |
| /checkout | Checkout — contact & delivery details |
| /checkout/payment | JazzCash / Easypaisa payment (demo) |
| /order-confirmation | Order confirmation / thank you page |
| /admin/login | Admin sign-in |
| /admin | Admin dashboard (revenue, orders, products) |
| /admin/users | User management (add/delete, change role) |
| /admin/products | Product management (edit/delete, backed by `src/services/product.js`) |
| /admin/products/new | Add a new product |
| /admin/products/edit/:id | Edit an existing product |
| /admin/orders | Order management (update status / mark delivered) |

## Tech Stack

- React 19
- React Router v7
- Vite 5
- Pure CSS (no Tailwind, no Bootstrap)

## Features

- Sidebar filters: Category, Gender, Color, Size, Brand, Price Range, Availability
- Real-time search by product name/brand
- Sort: Default, Price Low-High, Price High-Low, Newest, Popularity
- 12 products per page with pagination
- Breadcrumb navigation
- Discount badges and out-of-stock labels
- Hover animations on product cards
- Auto-filters when clicking MEN / WOMEN / TOP WEAR / BOTTOM WEAR in header
- Sliding cart drawer with quantity controls
- Full checkout flow: Checkout → JazzCash/Easypaisa Payment (demo) → Order Confirmation
- Admin dashboard: users, products, and orders management (see below)

## JazzCash / Easypaisa Payment

The checkout's payment step (`src/pages/checkout/PaymentPage.jsx`) lets the shopper
pick **JazzCash** or **Easypaisa**, enter a mobile wallet number, and pay. This is a
**demo/simulated integration** — no real gateway is contacted and no money moves.
A "Simulate Successful Payment" button is included for quick testing.

To go live with a real JazzCash or Easypaisa integration:
1. Register a merchant account with JazzCash (jazzcash.com.pk) or Easypaisa (easypaisa.com.pk)
2. Both gateways require **server-side** integration (merchant ID, integrity salt/hash,
   and a callback/webhook endpoint) — this project currently has no backend, so you'll
   need to add one (e.g. Node/Express) to securely sign and verify transactions
3. Replace the `handlePay` simulation in `PaymentPage.jsx` with a real API call to your
   backend, which in turn calls the JazzCash/Easypaisa merchant API

## Admin Dashboard

Click the **Admin** button in the header (or go to `/admin`) to reach the admin login.

**Demo credentials:** `admin@example.com` / `admin123`

The admin area includes:
- **Dashboard** — revenue, total orders, total products, and recent orders
- **Users** — add new users (name, email, password, role) and delete existing ones
- **Products** — edit or delete products from `src/services/product.js` (the single
  source of truth for the catalogue), or add new ones
- **Orders** — change an order's status or mark it delivered

This project has no backend/database, so admin auth and all admin CRUD changes
(products, users, orders) are stored in the browser via `localStorage`/`sessionStorage`
and are scoped to your browser only. Clearing site data resets everything back to the
seed data in `src/services/product.js`.
