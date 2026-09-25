# HandyShack Export B2B Ordering Portal

A prototype wholesale ordering portal for an export business, built with Next.js 14 and TypeScript. The repo also includes a matching Shopify theme (Liquid) for the storefront.

International wholesale buyers order by the pallet, not the unit. They need minimum order quantities, volume price tiers, several currencies, and a way to pass on shipping terms. A standard consumer checkout supports none of that. This prototype tests that flow end to end.

## What it does

- **Catalog with volume pricing.** Each product has a minimum order and price tiers (for example $2.10 per unit at 1,000, $1.90 at 10,000). The cart applies the right tier automatically.
- **Multi-currency totals.** Order totals appear in USD and other currencies.
- **Bulk order page.** Enter quantities for several SKUs at once.
- **Wholesale account flow.** A request-account page for new buyers, and a login that unlocks wholesale pricing.
- **Export-aware checkout.** Captures company, country, and notes on incoterms (standard trade shipping terms), destination port and labeling.
- **Order tracking.** Each order gets an ID and a status timeline: placed → received → bidding → awarded → confirmed → shipped.
- **Shopify theme.** `layout/`, `sections/`, `snippets/`, `templates/` and `config/` hold a Liquid theme with the same pages (hero, collections, product, cart, request account) for running the storefront on Shopify.

## Tech

Next.js 14 (App Router) · React 18 · TypeScript · Shopify Liquid

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Prototype limits

This is a product prototype, not production code.

- **Login is a stub.** It sets a cookie that marks the visitor as a wholesale buyer. There are no real accounts or passwords.
- **Orders are saved to a local file** (`data/orders.jsonl`), not a database.
- **Exchange rates are fixed** in `lib/currency.ts`.
- **Products are sample data** in `data/products.ts`.

A production version would need real authentication, a database, live exchange rates, and payment or invoicing.
