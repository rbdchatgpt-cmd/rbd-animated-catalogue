# RBD MACHINE TOOLS — PRODUCT COLLECTION 2026–27

This project has been converted from a multi-page company preview to a **product-only interactive digital catalogue**.

## Live catalogue
https://rbd-field-cinema-next.onrender.com/

## Catalogue pages
- `/`: 2026–27 interactive cover with RBD branding, a desktop Three.js farm environment, original RBD Power Reaper photograph, one primary EXPLORE OUR PRODUCTS action, and product discovery.
- `/products/`: searchable/filterable catalogue of all 14 RBD machinery categories.
- `/products/[slug]/`: cinematic product detail pages, model selector, original image gallery, authentic GLB-ready viewer, photo zoom, feature/specification panels, applications, documentary slots, original PDF, direct WhatsApp and quote form.
- `/compare/`: reference-model comparisons with clear warnings when variant specs are not verified.
- `/RBD-Catalogue-Web.pdf`: original catalogue download (stored in the public directory).

No company homepage, founder story, Shark Tank narrative, About Us, service, dealer-network, news or blog routes are included in this catalogue.

## Product categories
Power Reaper, Power Weeder, Mini Tiller, Brush Cutter, Chaff Cutter, Earth Auger, Chainsaw, Lawn Mower, Battery Sprayer, Manual Sprayer, Water Pump, Hedge Trimmer, Manual Seeder, Chowkidar Torch.

## Media authenticity
- Use only original RBD machine imagery, RBD-confirmed product pictures or manufacturer-owned listings. Never invent the machine shape, engine, components, or logo.
- Images show real RBD machines. Some manufacturer listings are hosted by retailers; ensure commercial reuse approvals where necessary.
- Product photographs can pan/zoom but are never presented as a genuine 360° model.
- A true GLB model works with OrbitControls when one is provided via `lib/media.js`. Until then, all product pages clearly label the original-photo fallback.
- Large product-film and field-working-video slots are ready for each product. Distinct media keys: `introVideo`, `workingVideo`, `model`, `photos`. Unprovided assets remain placeholders and never imply actual harvesting/drilling/spraying footage exists.
- The Three.js farm setting on desktop is an illustrative environment and is **not** physically simulated harvesting. Mobile and reduced-motion experiences use an efficient field illustration.

## Enquiry and quotations
Every product has:
1. GET PRODUCT DETAILS (specifications/overview)
2. WHATSAPP ENQUIRY (direct prefilled WhatsApp deep link)
3. REQUEST A QUOTE (preselected product/model form)

Quote form: name, mobile, city, product, model and message; explicit consent checkbox.
WhatsApp is functional after the customer presses Send in WhatsApp.
The secure API supports `quote` and keeps the state optional. It is only safe to report successful online submission after the database actually saves the record.

**Backend API**: https://rbd-field-cinema-api.onrender.com  
**Database**: Render Postgres `rbd-field-cinema-leads` — currently NOT linked to API until Render Blueprint approval. The API correctly returns HTTP 503 when DB storage is not connected; no false confirmation.

**Database plan:** https://dashboard.render.com/blueprint/exs-dc0l86uc6qcc73en5op0/sync/exe-dc0l876c6qcc73en5plg  
This proposal needs separate user approval before it is applied. Free DB expires December 21, 2026.

## Assets needed for final immersive version
- Original RBD 3D GLB/CAD model and part hotspots for each machine.
- Original RBD introduction MP4 and real agricultural working MP4 for each machine.
- Multi-angle machine product photos for authentic galleries.
- Model-wise approved technical specifications for every variant.
- A properly backed-up, consent-aware production CRM and enquiry storage system.

## Build and tests
- `npm install`
- `npm run build` exports static Next.js pages and runs `scripts/test-static.mjs`.
- The test checks 17 product-only routes, all 14 product pages, sitemap, robots, logo and original PDF.
- No in-browser iOS/Android/desktop visual QA has been certified.
- A dependency audit before production promotion is needed; the staging build previously reported 2 package vulnerabilities.

## Important
The source repository also contains the legacy `index.html` used by a **different Render site**. It remains untouched to preserve that old project, but it is **not part** of this Next.js catalogue build.

GitHub: https://github.com/rbdchatgpt-cmd/rbd-animated-catalogue  
Render staging: https://dashboard.render.com/static/srv-dc0l19mk1f9s739g4bb0
