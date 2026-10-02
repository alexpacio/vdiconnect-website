# vdiconnect.it

Product website for VDIConnect by Netter srl, built with [Astro](https://astro.build) and React islands.

## Pages

| Route | Content |
|---|---|
| `/` | Hero, why VDIConnect, performance, encoding, displays, use cases, private overlay network, platforms, comparison teaser, pricing |
| `/use-cases/` | Seven industries with challenge, solution and business case, plus cross-industry scenarios |
| `/compare/` | VDIConnect against Parsec, Citrix and Microsoft RDP |
| `/pricing/` | €4.99 per VDI per month, checkout calculator (React), FAQ |
| `/download/` | Free client downloads, Linux notify form, 30-day server trial registration (React) |
| `/legal/*` | Placeholder legal pages |

The only client-side JavaScript is the three React islands: `PricingCalculator`, `TrialForm` and `NotifyForm`.

## Development

```sh
npm install
cp .env.example .env   # then fill in the values
npm run dev            # http://localhost:4321
npm run check          # type-check Astro and React files
npm run build          # static site in dist/
npm run preview
```

## Configuration

All settings are public environment variables, listed in `.env.example`.

- **Price**: `PRICE_PER_VDI` in `src/data/site.ts` drives every price, business case and the calculator.
- **Card payments**: create a Stripe Payment Link for each billing period, with customer-adjustable quantity, Stripe Tax and tax ID collection enabled. Set `PUBLIC_STRIPE_LINK_MONTHLY` / `PUBLIC_STRIPE_LINK_YEARLY`.
- **PayPal**: create one subscription plan per billing period and set `PUBLIC_PAYPAL_LINK_MONTHLY` / `PUBLIC_PAYPAL_LINK_YEARLY`.
- **Trial and notify forms**: point `PUBLIC_TRIAL_FORM_ENDPOINT` and `PUBLIC_NOTIFY_FORM_ENDPOINT` at any free form service that accepts a standard form POST and answers JSON (Formspree, Getform, Basin and similar). The forms send `_subject` and a `_gotcha` honeypot field, which Formspree understands. Sending the server download link and the 30-day trial key to the registrant is done outside the site (form-service autoresponder, webhook or manual).
- **Client downloads**: `PUBLIC_CLIENT_WINDOWS_URL`, `PUBLIC_CLIENT_MACOS_URL`.

Buttons whose link is not configured render disabled.

## Content rules

- Do not name internal components or libraries (transport, FEC, codec implementations, overlay network product); describe capabilities instead.
- Do not quote latency figures until they are measured end to end.
- Linux client is "coming soon".
- Photos in `public/images` come from Unsplash (Unsplash License). The Netter logo is Netter srl's own asset.

## Placeholders to fill

`[REGISTERED ADDRESS]`, `[VAT NUMBER]`, `[VERSION]`, `[DATE]`, release notes and installation guide links, and the legal texts.
