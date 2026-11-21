# RBD Lead API

Public health check: GET /health
Send enquiries: POST /api/enquiries

This server **does not claim lead success without writing to Postgres**.
Requests are validated and rate-limited. No raw personal information is printed to logs.

Required environment:
- DATABASE_URL: Render Postgres internal connection string, configured privately in the Render dashboard.
- ALLOWED_ORIGINS: https://rbd-field-cinema-next.onrender.com
- DB_SSL: false when both services use Render internal networking

Do not put DATABASE_URL in public GitHub, NEXT_PUBLIC_* variables, or web pages.

This project currently has a 30-day free Render Postgres instance, which expires without upgrade.
Production deployment requires paid persistent storage, backup/retention policies, privacy notice,
abuse protection and end-to-end email/CRM notification testing.

Example POST (masked data only):
{"name":"Test Buyer","mobile":"9999999999","state":"Rajasthan","city":"Jaipur",
 "product":"Power Reaper","model":"10 HP","message":"Call back please",
 "enquiryType":"callback","consent":true,"website":""}
