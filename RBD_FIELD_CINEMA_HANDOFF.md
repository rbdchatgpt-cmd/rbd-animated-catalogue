# RBD Field Cinema — Next.js Preview

A premium digital product-catalogue **preview**, deployed separately from www.rbdmachine.com and the original animated PDF site.

## What's implemented
- Next.js static export with React 19, React Three Fiber / Three.js demonstration plinth, GSAP scroll transitions, Framer Motion transitions.
- Forest-green / premium-black / white / metallic-gold responsive UI.
- RBD logo cropped from the supplied PDF cover (no logo redraw).
- 14 product categories, individual SEO-friendly product routes and technical specifications grounded in the supplied catalogue and public RBD machine pages.
- Product model chooser, component guide, photo gallery, 3D demonstration placeholder and media placeholder.
- Company journey, verified 2020 establishment and 2025 Shark Tank India S4 appearance.
- Enquiry form collecting name, phone, state, city, product, model, message and consent; opens WhatsApp to +91 9694949030.
- Optional HTTPS CRM endpoint support; static preview stores no lead data.
- Accessibility: reduced-motion, keyboard focus, semantic headings, lazy image loading.

## Important: outstanding assets (NOT complete)
1. Accurate 360° machine models: **none available yet**. A Three.js display plinth is provided but the machine remains an original flat photograph. Do NOT market this as 360° machine scanning.
2. Power Reaper working/harvesting footage: **no original approved MP4 supplied**. The hero is an animated visual concept.
3. Shark Tank original footage: **not supplied**. The story section is a text documentary placeholder; no YouTube embeds or third-party clips are used.
4. Field operation clips for other categories: **not supplied**. Fallback photos are clearly labelled.
5. Original front angles for some categories: not yet available; marked.
6. Amazon Bestseller/Awards and farmer-connect counters: not displayed as factual metrics until primary evidence is supplied.
7. CRM webhook: not connected; WhatsApp flow works, customer presses Send.
8. A real manufacturing/farmer testimonial library: not supplied.

## Media hosting: Cloudinary or authorised CDN
Set at Render build time:
- NEXT_PUBLIC_MEDIA_BASE_URL=https://res.cloudinary.com/<cloud_name>/video/upload/<your_folder>
- NEXT_PUBLIC_ENQUIRY_ENDPOINT=https://<authorised_secure_backend>/api/enquiries (optional)

Published filenames expected:
- hero-reaper.mp4
- rbd-brand-film.mp4
- shark-tank-owned-footage.mp4
- power-reaper.mp4
- power-weeder.mp4
- ...<product-slug>.mp4

Video should be H.264 MP4 with faststart, an appropriate mobile bitrate and poster fallback.
Example:
ffmpeg -i source.mp4 -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k product.mp4

Cloudinary account, upload credentials, presets and user-owned assets are required to publish actual files.

## Content rules
- Real RBD product photos only; no invented 3D geometry or altered machine branding.
- Never attribute a reference model's specification to another model.
- No third-party Shark Tank clips; obtain a documented licence if footage belongs to the broadcaster.
- Avoid advertising unverifiable sales figures or regulatory claims.

## Deployment
- Production build: npm install && npm run build
- Next.js: output='export' produces /out
- Render static-site publish directory: out
- GitHub: rbdchatgpt-cmd/rbd-animated-catalogue
- Preview: https://rbd-field-cinema-next.onrender.com
- Old catalogue remains: https://rbd-animated-catalogue.onrender.com

## Before replacing the main domain
- Upload and QA original media; correct 3D models.
- Audit dependency vulnerabilities and upgrade as needed.
- Test all interactive functions on iOS Safari, Android Chrome, desktop Chrome and Firefox.
- Configure an authorised backend CRM with spam protection and rate limiting; validate consent/privacy policy.
- Confirm original image files are served from an owned and cacheable asset host.
- Validate current model specs, support locations, certifications and awards with RBD.
