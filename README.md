# Rabbit Store — MERN E-Commerce

A full MERN e-commerce project: a React + Vite storefront (with an admin
dashboard) backed by an Express + MongoDB + JWT API.

```
rabbit-store/
├── frontend/     React + Vite storefront & admin dashboard
├── backend/      Express + MongoDB + Mongoose + JWT API
└── .github/      GitHub Actions workflow to deploy the frontend to GitHub Pages
```

## Quick start (run both locally)

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` and fill in:
```
MONGO_URI=mongodb://127.0.0.1:27017/rabbit-store    # or a MongoDB Atlas URI
PORT=5000
JWT_SECRET=some-long-random-string
CLIENT_URL=http://localhost:5173
```

Then seed the database with sample products + a demo admin account, and start the server:
```bash
npm run seed     # inserts ~100 sample products + admin@example.com / admin123
npm run dev      # starts the API on http://localhost:5000 (with nodemon auto-reload)
```

### 2. Frontend

In a second terminal:
```bash
cd frontend
npm install
cp .env.example .env    # VITE_API_URL=http://localhost:5000/api (this is the default anyway)
npm run dev
```

Open **http://localhost:5173**.

> **No backend running?** The storefront still works — products, cart, and
> admin CRUD fall back to a local, browser-only demo mode (backed by
> `localStorage`) if the API isn't reachable. Once a real backend + Mongo
> connection is available, the app automatically switches to using it.

## Routes (frontend)

| URL | Page |
|---|---|
| / | Home page |
| /collection/men | Men's collection |
| /collection/women | Women's collection |
| /collection/topwear | Top wear collection |
| /collection/bottomwear | Bottom wear collection |
| /product/:id | Product detail page |
| /login | Customer login |
| /register | Customer registration |
| /checkout | Checkout — contact & delivery details |
| /checkout/payment | JazzCash / Easypaisa payment (demo) |
| /order-confirmation | Order confirmation / thank you page |
| /admin/login | Admin sign-in |
| /admin | Admin dashboard (revenue, orders, products) |
| /admin/users | User management (add/delete, change role) |
| /admin/products | Product management (add/edit/delete) |
| /admin/orders | Order management (update status / mark delivered) |

## API routes (backend)

| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/users/register` | Public | Create an account, returns a JWT |
| POST | `/api/users/login` | Public | Log in, returns a JWT (also merges any guest cart) |
| GET | `/api/users/profile` | Private | Get the logged-in user's own profile |
| GET | `/api/users` | Admin | List all users |
| POST | `/api/users` | Admin | Create a user (admin-side, can set role) |
| PUT | `/api/users/:id/role` | Admin | Change a user's role |
| DELETE | `/api/users/:id` | Admin | Delete a user |
| GET | `/api/products` | Public | List products (supports `?keyword=&category=&gender=&minPrice=&maxPrice=&sort=`) |
| GET | `/api/products/bestsellers` | Public | Highest-rated products |
| GET | `/api/products/new-arrivals` | Public | Most recently added products |
| GET | `/api/products/:id` | Public | Get a single product |
| POST | `/api/products` | Admin | Create a product |
| PUT | `/api/products/:id` | Admin | Update a product |
| DELETE | `/api/products/:id` | Admin | Delete a product |
| GET | `/api/cart?userId=` or `?guestId=` | Public | Get the current cart |
| POST | `/api/cart` | Public | Add an item to the cart |
| PUT | `/api/cart/:productId` | Public | Update a line item's quantity |
| DELETE | `/api/cart/:productId` | Public | Remove a line item |
| DELETE | `/api/cart/clear` | Public | Empty the cart |

**Guest cart merging:** every cart action from a not-logged-in shopper is
tracked against a `guestId` generated once per browser (see
`frontend/src/context/AuthContext.jsx` → `getGuestId()`). When that guest
registers or logs in, the backend (`backend/routes/userRoutes.js` →
`mergeGuestCart`) automatically folds the guest cart into their account
cart — no extra step needed on the frontend.

## Tech Stack

**Frontend:** React 19, React Router v7, Vite 5, plain CSS
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT (jsonwebtoken), bcryptjs, CORS

## Features

- Sidebar filters: Category, Gender, Color, Size, Brand, Price Range, Availability
- Real-time search by product name/brand, sorting, pagination, breadcrumbs
- Discount badges, out-of-stock labels, hover animations
- Sliding cart drawer with quantity controls — works for guests and logged-in users
- Full checkout flow: Checkout → JazzCash/Easypaisa Payment (demo) → Order Confirmation
- Real authentication: register/login with JWT, hashed passwords (bcrypt)
- Admin dashboard: dashboard stats, user management, product management (CRUD),
  order management — all backed by the real API when one is available
- Fully responsive (mobile, tablet, desktop) — see the header, collection
  filters, cart drawer, checkout, and admin dashboard, which all adapt with a
  mobile drawer/hamburger pattern

## JazzCash / Easypaisa Payment

The checkout's payment step (`frontend/src/pages/checkout/PaymentPage.jsx`) lets the
shopper pick **JazzCash** or **Easypaisa**, enter a mobile wallet number, and pay. This
is a **demo/simulated integration** — no real gateway is contacted and no money moves.
A "Simulate Successful Payment" button is included for quick testing.

To go live with a real JazzCash or Easypaisa integration, you'd add a route to
`backend/routes/` that calls the JazzCash/Easypaisa merchant API server-side (both
require a merchant ID + integrity salt/hash you should never expose to the browser),
and swap the `handlePay` simulation in `PaymentPage.jsx` for a call to that new route.

## Admin Dashboard

Click the **Admin** button in the header (or go to `/admin`).

**Demo admin (after running `npm run seed` in `backend/`):** `admin@example.com` / `admin123`

- **Dashboard** — revenue, total orders, total products, recent orders
- **Users** — add users, change roles, delete users (real API, admin-only)
- **Products** — add, edit, delete products (real API, admin-only) — this is the
  same catalogue the storefront reads from
- **Orders** — change status / mark delivered (currently a frontend-only demo — there's
  no Order model/route in the backend yet; orders live in the browser via `localStorage`)

If no backend is reachable, all of the above still works using the same
browser-only demo mode the project originally shipped with.

## Deploying

### Frontend → GitHub Pages
A workflow at `.github/workflows/deploy.yml` builds `frontend/` and deploys
it automatically on every push to `main`. To enable it:
1. Push this repo to GitHub
2. Go to **Settings → Pages → Source** and choose **"GitHub Actions"**
   (not "Deploy from a branch")
3. Your site will be live at `https://<username>.github.io/<repo-name>/`

> `frontend/vite.config.js` sets `base: '/Fullstack1-Ecommerece_project/'` to
> match this repo's name — if you rename the repo or fork it, update that
> value to match, or asset paths will 404 and the page will render blank.

GitHub Pages only hosts static files — it can't run the Express backend. Point
your deployed frontend at a backend hosted elsewhere (e.g. Render, Railway,
Fly.io) by setting `VITE_API_URL` as a build-time environment variable/secret
in the GitHub Actions workflow, or the frontend will simply fall back to its
local demo mode in production.

### Backend → any Node host (Render, Railway, Fly.io, etc.)
1. Set the `MONGO_URI`, `JWT_SECRET`, `PORT`, and `CLIENT_URL` environment
   variables on your host (use a MongoDB Atlas connection string in production)
2. Deploy the `backend/` folder — start command: `npm start`
3. Run `npm run seed` once (via your host's shell/console) to populate sample data

## Environment variables

**backend/.env**
```
MONGO_URI=      # MongoDB connection string
PORT=5000
JWT_SECRET=     # any long random string
CLIENT_URL=     # your frontend's URL, for CORS
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
```
