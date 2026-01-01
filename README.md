# Leath Bershka Storefront + Django Backend (Catalog API)

هذا المشروع عبارة عن **واجهة Next.js (Storefront)** مع **باك-إند Django + DRF** لإدارة المنتجات من لوحة تحكم `/admin` وتقديمها للواجهة عبر REST API.

الهدف:
- الواجهة تبقى كما هي (Grid + Cart + WhatsApp Checkout)
- المنتجات/الأقسام تُدار من Django Admin
- الصور تُرفع وتُخدم عبر `MEDIA_URL=/media/`

---

## 🧭 Project Structure

leath-bershka-clothis/
app/ # Next.js routes (App Router)
components/
sections/MenuSection.tsx # UI: products grid + sizes + add to cart (uses API now)
cart/CartProvider.tsx # cart state (localStorage) + WhatsApp checkout
lib/
api.ts # API client fetchers (categories/products)
siteConfig.ts # config (branding/footer/currency/etc)
public/
backend/
manage.py
requirements.txt
config/
settings.py
urls.py
catalog/
models.py
admin.py
serializers.py
views.py
urls.py
media/ # uploaded images (created at runtime)
db.sqlite3

markdown
Copy code

---

## ✅ What’s Implemented

### Backend (Django + DRF)
- **Category** model:
  - `slug` (unique, used for filtering)
  - `name_en`, `name_ar`
  - `sort_order`, `is_active`
- **Product** model:
  - UUID primary key
  - FK to category
  - `type` enum: `clothes` or `shoes`
  - `name_en`, `name_ar`
  - descriptions (optional)
  - `price`, `old_price` (optional)
  - `badge_en`, `badge_ar` (optional)
  - `image` upload to `/media/products/`
  - `is_active`, timestamps
- **Admin**:
  - filters/search/order
  - image preview in list
- **API**:
  - `GET /api/v1/categories/`
  - `GET /api/v1/products/?category=<slug>&type=<clothes|shoes>`
- **Media**:
  - `MEDIA_URL=/media/`
  - served in dev via `static()` when DEBUG=True
- **CORS**:
  - allow `http://localhost:3000`

### Frontend (Next.js)
- `MenuSection.tsx` retains same UI style
- fetches categories/products from Django API
- sizes handled in frontend only:
  - clothes: `S M L XL`
  - shoes: `36 -> 46`
- cart remains localStorage based + WhatsApp checkout

---

## 🚀 Running the Project (Development)

### 1) Backend (Django)
From `backend/`:

```bash
source venv/bin/activate
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 8000
Admin:

http://127.0.0.1:8000/admin/

API:

http://127.0.0.1:8000/api/v1/categories/

http://127.0.0.1:8000/api/v1/products/

2) Frontend (Next.js)
From project root:

Create .env.local:

env
Copy code
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
Run:

bash
Copy code
npm run dev
🖼️ Next.js Image Setup (Important)
Django images are served from:

http://127.0.0.1:8000/media/...

So we must allow this in next.config.ts:

ts
Copy code
images: {
  remotePatterns: [
    { protocol: "http", hostname: "127.0.0.1", port: "8000", pathname: "/media/**" },
    { protocol: "http", hostname: "localhost", port: "8000", pathname: "/media/**" },
  ],
}
After editing next.config.ts, restart Next:

bash
Copy code
npm run dev
🧩 API Contract (Frontend-friendly)
Categories
GET /api/v1/categories/

Example:

json
Copy code
[
  { "id": 1, "slug": "tshirts", "label": { "en": "T-Shirts", "ar": "تيشيرتات" } }
]
Products
GET /api/v1/products/?category=tshirts&type=clothes

Example:

json
Copy code
[
  {
    "id": "uuid",
    "type": "clothes",
    "name": { "en": "Tee One", "ar": "تيشيرت 1" },
    "description": { "en": "", "ar": "" },
    "priceFull": 50000.0,
    "oldPrice": 55000.0,
    "badge": { "en": "New", "ar": "جديد" },
    "image": "http://127.0.0.1:8000/media/products/tee.jpg"
  }
]
👕 Sizing Rules (Frontend Only)
We do not store selected size in DB.

In the UI:

If type=clothes => sizes: S, M, L, XL

If type=shoes => sizes: 36..46

Cart item id is made unique per size:

productId__SIZE
So same product with different sizes won’t merge.

🧪 Testing Checklist
Admin
 create category

 create product

 upload product image

 preview appears in product list

API
 categories endpoint returns list

 products endpoint returns by category slug

 images open in browser

Frontend
 categories show in UI

 products show per category

 choose size works

 add to cart works

 WhatsApp checkout message includes item + price + qty + size

🛠️ Troubleshooting
1) image is null in products response
You didn’t upload an image, or saved product without image

Ensure MEDIA_URL and MEDIA_ROOT set in Django settings

Ensure config/urls.py serves media when DEBUG=True

2) Next.js error: Image from host not allowed
Add Django host to remotePatterns in next.config.ts

Restart Next server

3) CORS errors in browser
Ensure django-cors-headers installed

Ensure middleware order includes:

"corsheaders.middleware.CorsMiddleware" near top

Ensure CORS_ALLOWED_ORIGINS has http://localhost:3000

4) Django root / returns 404
That’s expected. We only expose:

/admin/

/api/v1/

🔮 Future Enhancements (Optional)
Stock tracking

Orders table (store orders server-side)

Coupons/discount engine

JWT auth for write endpoints

PostgreSQL instead of SQLite

Media storage on S3/Cloud

Multi-tenant (per client/brand)

Notes for Developers
Keep API output frontend-friendly to minimize mapping in Next.js.

When changing API fields, update lib/api.ts and MenuSection.tsx.

Production serving of media should use a proper static/media server (Nginx) or cloud storage.

© SoftoDev

yaml
Copy code

---

إذا تحب، أقدر أيضًا أعمل **README منفصل داخل `backend/README.md`** يشرح الباك اند لوحده (models/admin/api/settings)، و README ثاني للفرونت — بس هذا الحالي شامل وكافي للتطوير المستقبلي.





