# Ecommerce Frontend

A Vue 3 ecommerce storefront built with Vite. The app includes product browsing, product details, authentication, cart, wishlist, checkout, order history, order details, and profile management.

## Tech Stack

- Vue 3
- Vite
- Vue Router
- Pinia
- Axios

## Requirements

- Node.js
- npm
- Backend API running locally or remotely

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file if your API is not running at the default URL:

```bash
VITE_API_URL=http://localhost:8000/api
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - start the Vite development server
- `npm run build` - create a production build in `dist`
- `npm run preview` - preview the production build locally

## Main Routes

- `/` - home and product listing
- `/login` - user login
- `/register` - user registration
- `/products/:id` - product details
- `/cart` - shopping cart
- `/wishlist` - saved products
- `/checkout` - checkout flow
- `/orders` - order history
- `/orders/:id` - order details
- `/profile` - user profile

Protected routes redirect to `/login` when no token is saved in `localStorage`.

## API Configuration

Axios is configured in `src/api/axios.js`.

Default API base URL:

```bash
http://localhost:8000/api
```

Override it with:

```bash
VITE_API_URL=https://your-api-domain.com/api
```

When a token exists in `localStorage`, requests include it as a Bearer token in the `Authorization` header.

## Project Structure

```text
src/
  api/          API request helpers
  assets/       images and styles
  components/   reusable UI components
  router/       application routes and guards
  stores/       Pinia stores
  utils/        shared helper functions
  views/        route-level pages
```
