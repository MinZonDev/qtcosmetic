## PROJECT SPECIFICATION: COSMETIC SHOWCASE WEBSITE (MINIMALIST)

### 1. Tổng quan dự án

* **Mục tiêu:** Xây dựng website trưng bày mỹ phẩm nhập khẩu, phong cách tối giản, sang trọng.
* **Chức năng chính:** Hiển thị danh sách sản phẩm từ Database, xem chi tiết sản phẩm qua Modal và dẫn link về Facebook cá nhân để chốt đơn.
* **Ngân sách triển khai:** 0 VNĐ (Sử dụng các gói Free Tier).

### 2. Tech Stack yêu cầu

* **Frontend:** HTML5, Tailwind CSS (để giao diện đẹp và nhanh), JavaScript thuần (hoặc React/Next.js).
* **Backend/Database:** Supabase (PostgreSQL).
* **Deployment:** Vercel.

### 3. Cấu trúc Database (Supabase Table: `products`)

Yêu cầu tạo bảng với các trường sau:
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | int8 (Primary Key) | Mã định danh duy nhất. |
| `name` | text | Tên sản phẩm mỹ phẩm. |
| `brand` | text | Thương hiệu (ví dụ: La Roche-Posay, Kiehl's). |
| `price` | numeric | Giá bán. |
| `image_url` | text | Đường dẫn ảnh sản phẩm (lấy từ Supabase Storage hoặc link ngoài). |
| `description` | text | Mô tả chi tiết công dụng, thành phần. |
| `fb_link` | text | Link Messenger hoặc trang cá nhân Facebook (ví dụ: `https://m.me/yourname`). |
| `category` | text | Phân loại (Skincare, Makeup, Nước hoa). |

### 4. Yêu cầu chi tiết về giao diện (UI/UX)

* **Trang chủ:**
* Grid hiển thị sản phẩm (2 cột trên mobile, 4 cột trên desktop).
* Mỗi card sản phẩm gồm: Ảnh, Tên, Giá, và nút "Xem chi tiết".


* **Hiệu ứng:**
* Khi click vào sản phẩm: Hiện **Modal (Popup)** chứa đầy đủ thông tin chi tiết mà không làm load lại trang.
* Trong Modal có nút **"Liên hệ mua hàng"** màu nổi bật, click vào sẽ mở tab mới dẫn đến link Facebook.


* **Phong cách:** Sử dụng font chữ hiện đại (Montserrat/Inter), tone màu chủ đạo là Trắng/Be.

### 5. Luồng xử lý logic

1. Website gửi request đến Supabase API để fetch toàn bộ dữ liệu trong bảng `products`.
2. Render dữ liệu động ra giao diện.
3. Cài đặt biến môi trường (Environment Variables) cho `SUPABASE_URL` và `SUPABASE_KEY` để bảo mật.