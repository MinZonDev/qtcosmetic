/* ============================================
   QT COSMETIC — Application Logic
   Supabase Integration + Dynamic Rendering
   ============================================ */

// =============================================
// ⚙️ CONFIGURATION
// =============================================
const SUPABASE_URL = 'https://fyaaaobfrjqvhriikmca.supabase.co';     // e.g., https://xxxx.supabase.co
const SUPABASE_KEY = 'sb_publishable_NKL_VmjtNTtjkFyac5ycXg_pcotsVWS'; // e.g., eyJhbGciOiJIUzI1NiIs...

// Pagination
const ITEMS_PER_PAGE = 8;

/** Kiểm tra Supabase đã được cấu hình chưa */
function isSupabaseConfigured() {
    return SUPABASE_URL.length > 0 && SUPABASE_KEY.length > 0;
}

// =============================================
// 📦 SAMPLE DATA (Fallback khi chưa kết nối Supabase)
// =============================================
const SAMPLE_PRODUCTS = [
    {
        id: 1,
        name: 'Effaclar Duo(+) Gel Rửa Mặt Tạo Bọt',
        brand: 'La Roche-Posay',
        price: 520000,
        image_url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=700&fit=crop',
        description: 'Gel rửa mặt tạo bọt dịu nhẹ, làm sạch sâu lỗ chân lông, kiểm soát dầu nhờn. Phù hợp da dầu mụn, da nhạy cảm. Thành phần chính: Niacinamide, Zinc PCA, Thermal Spring Water.',
        fb_link: 'https://m.me/yourpage',
        category: 'Skincare',
        status: 'in_stock'
    },
    {
        id: 2,
        name: 'Ultra Facial Cream Kem Dưỡng Ẩm',
        brand: "Kiehl's",
        price: 890000,
        image_url: 'https://images.unsplash.com/photo-1570194065650-d99fb4a38691?w=600&h=700&fit=crop',
        description: 'Kem dưỡng ẩm 24h cho mọi loại da. Kết cấu mỏng nhẹ, thẩm thấu nhanh, không gây bết dính. Thành phần: Squalane, Glacial Glycoprotein, Olive Fruit Oil.',
        fb_link: 'https://m.me/yourpage',
        category: 'Skincare',
        status: 'in_stock'
    },
    {
        id: 3,
        name: 'Rouge Allure Velvet Son Lì',
        brand: 'Chanel',
        price: 1250000,
        image_url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=700&fit=crop',
        description: 'Son lì mịn như nhung với sắc tố cao, lên màu chuẩn từ lần đầu. Chất son mỏng nhẹ, dưỡng ẩm tốt, không gây khô. Bảng màu đa dạng từ nude đến đỏ cổ điển.',
        fb_link: 'https://m.me/yourpage',
        category: 'Makeup',
        status: 'out_of_stock'
    },
    {
        id: 4,
        name: 'J\'adore Eau de Parfum Nước Hoa Nữ',
        brand: 'Dior',
        price: 3200000,
        image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=700&fit=crop',
        description: 'Nước hoa nữ huyền thoại với hương hoa cỏ quyến rũ. Top notes: Magnolia, Pear. Heart: Rose, Jasmine. Base: Woody, Musk. Độ lưu hương 8-12 tiếng.',
        fb_link: 'https://m.me/yourpage',
        category: 'Nước hoa',
        status: 'in_stock'
    },
    {
        id: 5,
        name: 'Advanced Night Repair Serum',
        brand: 'Estée Lauder',
        price: 2450000,
        image_url: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=700&fit=crop',
        description: 'Serum phục hồi da ban đêm số 1 thế giới. Công nghệ Chronolux™ Power Signal giúp giảm nếp nhăn, làm đều màu da, tăng cường độ ẩm. Thích hợp mọi loại da, mọi độ tuổi.',
        fb_link: 'https://m.me/yourpage',
        category: 'Skincare',
        status: 'incoming'
    },
    {
        id: 6,
        name: 'Lip Glow Oil Dầu Dưỡng Môi',
        brand: 'Dior',
        price: 980000,
        image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=700&fit=crop',
        description: 'Dầu dưỡng môi Cherry Oil với hiệu ứng bóng glossy tự nhiên. Nuôi dưỡng, làm mềm và tạo sắc hồng tươi tắn cho đôi môi. Thành phần thiên nhiên, an toàn.',
        fb_link: 'https://m.me/yourpage',
        category: 'Makeup',
        status: 'in_stock'
    },
    {
        id: 7,
        name: 'Aqua Allegoria Nước Hoa Unisex',
        brand: 'Guerlain',
        price: 2800000,
        image_url: 'https://images.unsplash.com/photo-1594035910387-fea081ac89c5?w=600&h=700&fit=crop',
        description: 'Nước hoa unisex với hương thảo mộc tươi mát, thanh lịch. Top: Bergamot, Green Notes. Heart: Neroli, White Tea. Base: White Musk, Cedarwood. Lý tưởng cho mùa hè.',
        fb_link: 'https://m.me/yourpage',
        category: 'Nước hoa',
        status: 'pre_order'
    },
    {
        id: 8,
        name: 'Sunscreen UV Aqua Rich Gel Chống Nắng',
        brand: 'Bioré',
        price: 280000,
        image_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=700&fit=crop',
        description: 'Gel chống nắng SPF50+ PA++++ siêu nhẹ, thấm nhanh, không bết dính. Công thức Micro Defense cho lớp bảo vệ mỏng nhẹ. Phù hợp dùng hàng ngày, kể cả dưới makeup.',
        fb_link: 'https://m.me/yourpage',
        category: 'Skincare',
        status: 'in_stock'
    },
    {
        id: 9,
        name: 'Toner Klairs Supple Preparation',
        brand: "Dear, Klairs",
        price: 420000,
        image_url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=700&fit=crop',
        description: 'Toner cấp ẩm sâu, làm dịu da nhạy cảm, cân bằng độ pH. Không cồn, không hương liệu. Thành phần: Hyaluronic Acid, Centella Asiatica, Beta-Glucan.',
        fb_link: 'https://m.me/yourpage',
        category: 'Skincare',
        status: 'in_stock'
    },
    {
        id: 10,
        name: 'Phấn Nước Cushion Matte',
        brand: 'Laneige',
        price: 750000,
        image_url: 'https://images.unsplash.com/photo-1631214500115-598fc2cb8ada?w=600&h=700&fit=crop',
        description: 'Cushion lì mịn, kiềm dầu 24h, che phủ tốt mà vẫn nhẹ da. SPF50+ PA+++ bảo vệ da khỏi tia UV. Finish semi-matte tự nhiên.',
        fb_link: 'https://m.me/yourpage',
        category: 'Makeup',
        status: 'incoming'
    }
];

// =============================================
// 🚀 APPLICATION
// =============================================

/** Cấu hình hiển thị trạng thái sản phẩm */
const STATUS_CONFIG = {
    in_stock: { label: 'Còn hàng', color: '#2ECC71', bg: 'rgba(46,204,113,0.12)', icon: '●' },
    out_of_stock: { label: 'Hết hàng', color: '#E74C3C', bg: 'rgba(231,76,60,0.12)', icon: '●' },
    incoming: { label: 'Hàng sắp về', color: '#F39C12', bg: 'rgba(243,156,18,0.12)', icon: '◐' },
    pre_order: { label: 'Đặt trước', color: '#3498DB', bg: 'rgba(52,152,219,0.12)', icon: '◎' }
};

function getStatusConfig(status) {
    return STATUS_CONFIG[status] || STATUS_CONFIG.in_stock;
}

/** Format giá sang định dạng VNĐ */
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0
    }).format(price);
}

/** Tạo HTML cho 1 product card */
function createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Xem chi tiết ${product.name}`);

    const sc = getStatusConfig(product.status);
    const isOutOfStock = product.status === 'out_of_stock';

    card.innerHTML = `
    <div class="product-card__image-wrapper${isOutOfStock ? ' product-card__image-wrapper--oos' : ''}">
      <img
        class="product-card__image"
        src="${product.image_url}"
        alt="${product.name}"
        loading="lazy"
      />
      <span class="product-card__badge">${product.category}</span>
      <span class="product-card__status" style="background:${sc.bg};color:${sc.color}">
        ${sc.icon} ${sc.label}
      </span>
    </div>
    <div class="product-card__info">
      <p class="product-card__brand">${product.brand}</p>
      <h3 class="product-card__name">${product.name}</h3>
      <div class="product-card__bottom">
        <span class="product-card__price">${formatPrice(product.price)}</span>
        <span class="product-card__cta">${isOutOfStock ? 'Xem thêm' : 'Xem chi tiết'}</span>
      </div>
    </div>
  `;

    // Click & Keyboard events
    card.addEventListener('click', () => openModal(product));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(product);
        }
    });

    return card;
}

// =============================================
// 📄 PAGINATION
// =============================================
let currentPage = 0;
let filteredProducts = [];

function getPageProducts() {
    const start = 0;
    const end = (currentPage + 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, end);
}

function renderPage() {
    const grid = document.getElementById('product-grid');
    const emptyState = document.getElementById('empty-state');
    const loadMoreContainer = document.getElementById('load-more-container');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const collapseBtn = document.getElementById('collapse-btn');

    grid.innerHTML = '';

    if (!filteredProducts || filteredProducts.length === 0) {
        emptyState.classList.remove('hidden');
        loadMoreContainer.classList.add('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    const pageProducts = getPageProducts();
    pageProducts.forEach((product) => {
        grid.appendChild(createProductCard(product));
    });

    // Show/hide Load More & Collapse buttons
    const totalShown = pageProducts.length;
    const totalAvailable = filteredProducts.length;
    const isExpanded = currentPage > 0;

    if (totalShown < totalAvailable || isExpanded) {
        loadMoreContainer.classList.remove('hidden');
        document.getElementById('product-count').textContent = `Đang hiển thị ${totalShown} / ${totalAvailable} sản phẩm`;

        // Load More: ẩn khi đã hiện hết
        loadMoreBtn.classList.toggle('hidden', totalShown >= totalAvailable);
        // Thu gọn: chỉ hiện khi đang mở rộng
        collapseBtn.classList.toggle('hidden', !isExpanded);
    } else {
        loadMoreContainer.classList.add('hidden');
    }
}

function loadMore() {
    currentPage++;
    renderPage();

    // Scroll nhẹ xuống để thấy sản phẩm mới
    const grid = document.getElementById('product-grid');
    const cards = grid.querySelectorAll('.product-card');
    const firstNewCard = cards[currentPage * ITEMS_PER_PAGE];
    if (firstNewCard) {
        firstNewCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function collapseProducts() {
    currentPage = 0;
    renderPage();
    // Scroll lên đầu grid
    document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetPagination(products) {
    currentPage = 0;
    filteredProducts = products;
    renderPage();
}

// =============================================
// 🪟 MODAL
// =============================================
const modalOverlay = document.getElementById('product-modal');
const modalClose = document.getElementById('modal-close');

function openModal(product) {
    document.getElementById('modal-image').src = product.image_url;
    document.getElementById('modal-image').alt = product.name;
    document.getElementById('modal-category').textContent = product.category;
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-brand').textContent = product.brand;
    document.getElementById('modal-price').textContent = formatPrice(product.price);
    document.getElementById('modal-description').textContent = product.description;
    document.getElementById('modal-cta').href = product.fb_link;

    // Status badge trong modal
    const sc = getStatusConfig(product.status);
    const modalStatus = document.getElementById('modal-status');
    modalStatus.textContent = `${sc.icon} ${sc.label}`;
    modalStatus.style.background = sc.bg;
    modalStatus.style.color = sc.color;

    // Ẩn/hiện CTA dựa trên trạng thái
    const cta = document.getElementById('modal-cta');
    if (product.status === 'out_of_stock') {
        cta.textContent = '🔔 Thông báo khi có hàng';
        cta.classList.add('modal__cta--secondary');
    } else {
        cta.textContent = '💬 Liên hệ mua hàng';
        cta.classList.remove('modal__cta--secondary');
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus trap
    modalClose.focus();
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Close on X button
modalClose.addEventListener('click', closeModal);

// Close on overlay click
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// =============================================
// 🏷️ CATEGORY FILTER (Dynamic)
// =============================================
let allProducts = [];
let activeCategory = 'all';

/** Render filter buttons từ danh sách categories thực tế */
function renderCategoryFilters(products) {
    const filterContainer = document.getElementById('category-filters');
    // Lấy unique categories từ dữ liệu
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

    filterContainer.innerHTML = '';

    // Nút "Tất cả" luôn có
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.dataset.category = 'all';
    allBtn.textContent = 'Tất cả';
    filterContainer.appendChild(allBtn);

    // Render từng category
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.category = cat;
        btn.textContent = cat;
        filterContainer.appendChild(btn);
    });
}

function setupFilters() {
    const filterContainer = document.getElementById('category-filters');

    filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        // Update active state
        filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter & render with pagination reset
        activeCategory = btn.dataset.category;
        const filtered = activeCategory === 'all'
            ? allProducts
            : allProducts.filter(p => p.category === activeCategory);

        resetPagination(filtered);
    });
}

// =============================================
// 🔌 SUPABASE FETCH
// =============================================

/** Fetch products từ Supabase, fallback sang sample data CHỈ khi chưa cấu hình */
async function fetchProducts() {
    const loadingState = document.getElementById('loading-state');

    // Chưa cấu hình Supabase → dùng sample data (chỉ cho local dev)
    if (!isSupabaseConfigured()) {
        console.log('⚡ Chưa cấu hình Supabase. Dùng sample data cho local preview.');

        await new Promise(resolve => setTimeout(resolve, 800));

        allProducts = SAMPLE_PRODUCTS;
        loadingState.classList.add('hidden');
        renderCategoryFilters(allProducts);
        resetPagination(allProducts);
        return;
    }

    // Đã cấu hình → fetch từ Supabase, KHÔNG fallback sample khi lỗi
    try {
        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        const { data, error } = await client.from('products').select('*').order('id', { ascending: true });

        if (error) throw error;

        allProducts = data || [];
        loadingState.classList.add('hidden');
        renderCategoryFilters(allProducts);
        resetPagination(allProducts);

        console.log(`✅ Đã tải ${allProducts.length} sản phẩm từ Supabase.`);
    } catch (err) {
        console.error('❌ Lỗi kết nối Supabase:', err.message);

        loadingState.classList.add('hidden');
        // Hiện error state thay vì fallback sample data
        const emptyState = document.getElementById('empty-state');
        document.getElementById('empty-state').querySelector('.empty-state__icon').textContent = '⚠️';
        document.getElementById('empty-state').querySelector('.empty-state__text').textContent =
            'Không thể kết nối đến cơ sở dữ liệu. Vui lòng thử lại sau.';
        emptyState.classList.remove('hidden');
    }
}

// =============================================
// 🏁 INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    setupFilters();
    fetchProducts();

    // Load More & Collapse buttons
    document.getElementById('load-more-btn').addEventListener('click', loadMore);
    document.getElementById('collapse-btn').addEventListener('click', collapseProducts);
});
