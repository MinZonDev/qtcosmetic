/* ============================================
   QT COSMETIC — Review Page Logic
   Supabase Integration + Masonry Gallery
   ============================================ */

// =============================================
// ⚙️ CONFIGURATION (giống app.js)
// =============================================
const SUPABASE_URL = 'https://fyaaaobfrjqvhriikmca.supabase.co';     // e.g., https://xxxx.supabase.co
const SUPABASE_KEY = 'sb_publishable_NKL_VmjtNTtjkFyac5ycXg_pcotsVWS'; // e.g., eyJhbGciOiJIUzI1NiIs...

function isSupabaseConfigured() {
    return SUPABASE_URL.length > 0 && SUPABASE_KEY.length > 0;
}

// =============================================
// 📦 SAMPLE REVIEWS (Fallback khi chưa kết nối Supabase)
// =============================================
const SAMPLE_REVIEWS = [
    {
        id: 1,
        customer_name: 'Ngọc Anh',
        image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=600&fit=crop',
        product_name: 'Effaclar Duo(+) Gel Rửa Mặt',
        rating: 5,
        comment: 'Mình dùng được 2 tuần, da sạch hơn hẳn, mụn giảm rõ rệt. Sẽ mua lại!',
        created_at: '2026-03-10'
    },
    {
        id: 2,
        customer_name: 'Minh Tú',
        image_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=700&fit=crop',
        product_name: 'Rouge Allure Velvet Son Lì',
        rating: 5,
        comment: 'Màu đẹp, lên môi chuẩn, giữ màu cả ngày. Đóng gói cẩn thận, giao hàng nhanh.',
        created_at: '2026-03-08'
    },
    {
        id: 3,
        customer_name: 'Thu Hà',
        image_url: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500&h=500&fit=crop',
        product_name: 'Ultra Facial Cream',
        rating: 4,
        comment: 'Kem dưỡng ẩm tốt, dùng ban đêm da mềm mịn. Hơi đắt nhưng xứng đáng.',
        created_at: '2026-03-05'
    },
    {
        id: 4,
        customer_name: 'Phương Linh',
        image_url: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=500&h=650&fit=crop',
        product_name: 'J\'adore Eau de Parfum',
        rating: 5,
        comment: 'Mùi hương quyến rũ, thanh lịch. Xịt sáng tối vẫn còn thơm. Hàng chính hãng 100%!',
        created_at: '2026-03-01'
    },
    {
        id: 5,
        customer_name: 'Bảo Trâm',
        image_url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=550&fit=crop',
        product_name: 'Advanced Night Repair Serum',
        rating: 4,
        comment: 'Serum thẩm thấu nhanh, sáng ban ngay da được mờ vết thâm dần. Rất hài lòng!',
        created_at: '2026-02-25'
    },
    {
        id: 6,
        customer_name: 'Khánh Vy',
        image_url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=480&fit=crop',
        product_name: 'Lip Glow Oil Dầu Dưỡng Môi',
        rating: 5,
        comment: 'Dầu dưỡng môi siêu mềm, bóng tự nhiên. Dùng hàng ngày cả khi makeup hay không.',
        created_at: '2026-02-20'
    }
];

// =============================================
// ⭐ HELPERS
// =============================================

function renderStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// =============================================
// 🖼️ REVIEW CARDS
// =============================================

function createReviewCard(review, index) {
    const card = document.createElement('article');
    card.className = 'review-card';
    card.style.animationDelay = `${index * 0.08}s`;

    card.innerHTML = `
    <img
      class="review-card__image"
      src="${review.image_url}"
      alt="Review từ ${review.customer_name}"
      loading="lazy"
    />
    <div class="review-card__content">
      <div class="review-card__stars">${renderStars(review.rating)}</div>
      <h3 class="review-card__name">${review.customer_name}</h3>
      <p class="review-card__product">${review.product_name}</p>
      <p class="review-card__comment">${review.comment}</p>
    </div>
  `;

    card.addEventListener('click', () => openLightbox(review));

    return card;
}

function renderReviews(reviews) {
    const gallery = document.getElementById('review-gallery');
    const emptyState = document.getElementById('empty-state');

    gallery.innerHTML = '';

    if (!reviews || reviews.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    reviews.forEach((review, index) => {
        gallery.appendChild(createReviewCard(review, index));
    });
}

// =============================================
// 🔍 LIGHTBOX
// =============================================
const lightboxOverlay = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(review) {
    document.getElementById('lightbox-image').src = review.image_url;
    document.getElementById('lightbox-image').alt = `Review từ ${review.customer_name}`;
    document.getElementById('lightbox-stars').textContent = renderStars(review.rating);
    document.getElementById('lightbox-name').textContent = review.customer_name;
    document.getElementById('lightbox-product').textContent = review.product_name;
    document.getElementById('lightbox-comment').textContent = review.comment;
    document.getElementById('lightbox-date').textContent = formatDate(review.created_at);

    lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
}

function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// =============================================
// 🔌 SUPABASE FETCH
// =============================================

async function fetchReviews() {
    const loadingState = document.getElementById('loading-state');

    if (!isSupabaseConfigured()) {
        console.log('⚡ Chưa cấu hình Supabase. Dùng sample reviews.');

        await new Promise(resolve => setTimeout(resolve, 600));

        loadingState.classList.add('hidden');
        renderReviews(SAMPLE_REVIEWS);
        return;
    }

    try {
        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        const { data, error } = await client
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        loadingState.classList.add('hidden');
        renderReviews(data || []);

        console.log(`✅ Đã tải ${(data || []).length} reviews từ Supabase.`);
    } catch (err) {
        console.error('❌ Lỗi kết nối Supabase:', err.message);

        loadingState.classList.add('hidden');
        const emptyState = document.getElementById('empty-state');
        emptyState.querySelector('.empty-state__icon').textContent = '⚠️';
        emptyState.querySelector('.empty-state__text').textContent =
            'Không thể tải đánh giá. Vui lòng thử lại sau.';
        emptyState.classList.remove('hidden');
    }
}

// =============================================
// 🏁 INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    fetchReviews();
});
