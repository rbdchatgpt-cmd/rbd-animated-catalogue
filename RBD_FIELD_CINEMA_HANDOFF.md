# RBD FIELD CINEMA — Implementation & Production Handoff

**Website preview:** https://rbd-field-cinema-next.onrender.com/  
**Frontend:** Next.js 15 static export, React 19, Framer Motion, GSAP, React Three Fiber / Drei.  
**Existing PDF site retained:** https://rbd-animated-catalogue.onrender.com/  
**Official company website unchanged:** https://www.rbdmachine.com

## Implemented and deployed in staging

- Premium forest-green, near-black, cream/white and metallic-gold responsive design.
- RBD company logo from the supplied catalogue cover. Original machine photos are not redesigned.
- Full primary navigation: Home, Products, Our Journey, About RBD, Dealers, Support, Contact.
- Search modal (Ctrl/⌘+K), product/model/application search and a 14-category mega menu.
- Fourteen static product routes, model choosers, specifications labelled by reference model, galleries, applications, CTA, and downloadable original PDF.
- Product comparison page for up to three categories with reference-source caveats.
- Photo zoom with original branding; verified GLB-ready Three.js and OrbitControls path. **No fake 360° models.**
- Cinematic scroll and field concepts; no claim that the animated field is real operation footage.
- Eight differentiated application themes and RBD-authorised video slots.
- Interactive six-chapter RBD founder / Shark Tank documentary timeline.
- Honest muted autoplay video player, playback controls and reduced-motion support.
- Structured mobile layouts and mobile menu, route sitemap, robots and per-product metadata.
- Enquiry form: customer name, 10-digit Indian mobile, state, city, product, interested model, message, type, and explicit consent.
- Enquiry types: callback, dealer, FPO/bulk and general; working WhatsApp deep link to +91 9694949030, with no fake "sent" message.
- Secure Node/Express API on Render: `https://rbd-field-cinema-api.onrender.com`, rate limits, input validation, CORS and parameterised PostgreSQL queries.
- Build checks: `npm run build` performs official product photo source checks, static export, and tests for 22 routes, 14 product pages, sitemap and robots.

## Database: requires approval before callback submission works

A free PostgreSQL instance named `rbd-field-cinema-leads` exists in Singapore.

The backend currently responds with HTTP 503 to form submissions until private `DATABASE_URL` is connected. This is deliberate — no success is reported without confirmed storage.

The Render Blueprint proposal connects the existing API to the existing database using a private Render resource reference (no credential in the public GitHub repository).

**Blueprint dashboard:** https://dashboard.render.com/blueprint/exs-dc0l86uc6qcc73en5op0/sync/exe-dc0l876c6qcc73en5plg

The proposal is **planned, not applied**. Render explicitly requires user approval to change infrastructure. After approval, deploy the API, confirm `/health` reports `databaseConnected: true`, then submit and read back a test enquiry in the private database.

**WARNING:** The free PostgreSQL database is scheduled to expire on **21 December 2026**. Upgrade to a persistent supported plan and adopt a retention, backup and privacy policy before collecting customer leads at scale. No paid upgrade has been performed.

## Original video and 3D assets

Media registry: `lib/media.js`. Assets currently intentionally `null` until approved RBD files are supplied.

Expected content:
- Cinematic golden-wheat / actual Power Reaper harvest film: `hero.video`.
- Brand film: `brandFilm.video`.
- Six documentary clips: intro, founders, workshop, pitch, investors and growth.
- Product-level working MP4, approved GLB/GLTF model, multi-angle photos for each category.
- Approved photos of the founders, team, company factory and customer stories.

**No stock or third-party Shark Tank videos** have been used. The static fallback is visually labelled. The authentic GLB machine is never fabricated from a different model.

To publish via Cloudinary or an authorised CDN:
1. Upload owned assets to the CDN.
2. Set `NEXT_PUBLIC_MEDIA_BASE_URL` on the Render static site.
3. Enter the **approved relative filenames** in `lib/media.js`.
4. Redeploy and verify video poster, load, mobile playback and 3D interaction.

Only approved original product imagery should be used. The build-time official photo sync attempts to load images from RBD product pages; if no verifiable source can be extracted, a clear placeholder remains.

## Remaining production checklist

- Approve private database link; test and monitor genuine callback storage.
- Consider upgrading the free DB before 21 December 2026.
- Upload original approved RBD Shark Tank and field MP4s, with mobile H.264/fallback files.
- Upload correct CAD/GLB/photogrammetry meshes and verified component maps.
- Add remaining validated original product images; verify all specifications by model.
- Supply consented farmer testimonials and authenticated awards for publication.
- Configure production privacy notice, data retention and backups.
- Run an external visual/browser QA pass on iOS Safari, Android Chrome, Firefox and desktop Chrome. The static route build test is **not** equivalent to device/browser testing.
- Run `npm audit` and resolve dependency warnings before final production cutover.
- Do not replace the official `www.rbdmachine.com` domain until RBD has approved content, lead storage and QA.

## Source and deployment references

GitHub: https://github.com/rbdchatgpt-cmd/rbd-animated-catalogue  
Frontend Render: https://dashboard.render.com/static/srv-dc0l19mk1f9s739g4bb0  
API Render: https://dashboard.render.com/web/srv-dc0l6c17lnhs7390pf90  
Database Render: https://dashboard.render.com/d/dpg-dc0l55h42hec73bop8s0-a

