# 🚀 Hướng Dẫn Setup & Deploy

## 1. Tạo Supabase Project (Free Tier)

### Bước 1: Đăng ký Supabase
1. Truy cập [supabase.com](https://supabase.com) → **Start your project**
2. Đăng nhập bằng GitHub
3. Tạo **New Project** → đặt tên, chọn region `Southeast Asia (Singapore)`

### Bước 2: Tạo bảng `products`
Vào **SQL Editor** → chạy script sau:

```sql
-- Tạo bảng products
CREATE TABLE products (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        TEXT NOT NULL,
  brand       TEXT NOT NULL,
  price       NUMERIC NOT NULL,
  image_url   TEXT NOT NULL,
  description TEXT,
  fb_link     TEXT NOT NULL DEFAULT 'https://m.me/yourpage',
  category    TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'in_stock' CHECK (status IN ('in_stock', 'out_of_stock', 'incoming', 'pre_order'))
);

-- Tạo bảng reviews
CREATE TABLE reviews (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_name TEXT NOT NULL,
  image_url     TEXT NOT NULL,
  product_name  TEXT NOT NULL,
  rating        INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment       TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Bật Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Cho phép anonymous đọc (public website)
CREATE POLICY "Allow public read products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow public read reviews" ON reviews
  FOR SELECT USING (true);
```

### Bước 3: Thêm dữ liệu mẫu (tuỳ chọn)

```sql
INSERT INTO products (name, brand, price, image_url, description, fb_link, category, status) VALUES
  ('Effaclar Duo(+) Gel Rửa Mặt', 'La Roche-Posay', 520000, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=700&fit=crop', 'Gel rửa mặt tạo bọt dịu nhẹ, làm sạch sâu lỗ chân lông.', 'https://m.me/yourpage', 'Skincare', 'in_stock'),
  ('Ultra Facial Cream', 'Kiehl''s', 890000, 'https://images.unsplash.com/photo-1570194065650-d99fb4a38691?w=600&h=700&fit=crop', 'Kem dưỡng ẩm 24h cho mọi loại da.', 'https://m.me/yourpage', 'Skincare', 'in_stock'),
  ('Rouge Allure Velvet Son Lì', 'Chanel', 1250000, 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=700&fit=crop', 'Son lì mịn như nhung với sắc tố cao.', 'https://m.me/yourpage', 'Makeup', 'out_of_stock'),
  ('J''adore Eau de Parfum', 'Dior', 3200000, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=700&fit=crop', 'Nước hoa nữ huyền thoại với hương hoa cỏ quyến rũ.', 'https://m.me/yourpage', 'Nước hoa', 'in_stock');
```

### Bước 4: Lấy API Keys
Vào **Settings → API** → copy:
- **Project URL** (ví dụ: `https://xxxx.supabase.co`)
- **anon public key** (ví dụ: `eyJhbGciOiJIUzI1NiIs...`)

---

## 2. Kết nối với Code

### Cách A: Local Development (test nhanh)
Mở file `app.js` và `review.js`, thay 2 dòng đầu:

```js
const SUPABASE_URL = 'https://xxxx.supabase.co';      // ← thay bằng URL thật
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIs...';       // ← thay bằng anon key thật
```

Mở `index.html` bằng **Live Server** (VS Code extension) hoặc double-click.

### Cách B: Production (Vercel — khuyến nghị)
Dùng **Environment Variables** để bảo mật → xem mục 3.

---

## 3. Deploy lên Vercel (Free)

### Bước 1: Push code lên GitHub
```bash
cd d:\PROJECT\cosmetic
git init
git add .
git commit -m "Initial commit: Luxe Beauty showcase"
git remote add origin https://github.com/YOUR_USERNAME/cosmetic.git
git push -u origin main
```

### Bước 2: Import vào Vercel
1. Truy cập [vercel.com](https://vercel.com) → **Add New → Project**
2. Import repo GitHub vừa tạo
3. **Framework Preset**: chọn `Other`
4. **Environment Variables** → thêm:
   - `SUPABASE_URL` = `https://xxxx.supabase.co`
   - `SUPABASE_KEY` = `eyJhbGciOiJIUzI1NiIs...`
5. Click **Deploy** ✅

### Bước 3: Cập nhật code để đọc ENV
> **Lưu ý quan trọng:** Vì đây là static site (HTML/JS thuần), browser **không thể** đọc server-side ENV variables trực tiếp.

**Có 2 cách xử lý:**

**Cách 1 — Đơn giản (chấp nhận được với anon key):**
Hardcode trực tiếp `SUPABASE_URL` và `SUPABASE_KEY` trong `app.js`. Supabase `anon key` được thiết kế để dùng ở client-side, nên **không** phải là rủi ro bảo mật — miễn là bạn đã bật RLS đúng cách.

**Cách 2 — Nâng cao (dùng Vercel Serverless Function):**
Tạo file `api/products.js` để proxy request qua server:
```js
// api/products.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  const { data, error } = await supabase.from('products').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}
```

---

## 4. Cập nhật sản phẩm

Dùng **Supabase Dashboard → Table Editor** để thêm/sửa/xóa sản phẩm. Website sẽ tự động hiển thị dữ liệu mới khi reload.

---

## Tóm tắt kiến trúc

```
Browser ──→ Vercel (Static HTML/CSS/JS)
                │
                ├── Supabase JS SDK (CDN)
                │
                └──→ Supabase PostgreSQL API
                        │
                        ├── products table (RLS enabled)
                        └── reviews table  (RLS enabled)
```
