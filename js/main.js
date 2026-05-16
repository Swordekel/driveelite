// ── CAR DATA ──
const cars = [
  { id: 1, name: "Toyota Avanza", trim: "1.5 G CVT", tag: "suv_mpv", tl: "MPV", hp: "106", zero: "12.5s", trans: "CVT", seats: "7", price: "450.000", pn: 450000, img: "pictcar/TOYOTA%20AVANZA.jpeg", hot: true, rat: 4.8, revs: 142 },
  { id: 2, name: "Daihatsu Xenia", trim: "1.5 R CVT", tag: "suv_mpv", tl: "MPV", hp: "106", zero: "12.5s", trans: "CVT", seats: "7", price: "450.000", pn: 450000, img: "pictcar/DAIHATSU%20XENIA.jpeg", hot: false, rat: 4.7, revs: 89 },
  { id: 3, name: "Toyota Innova Reborn", trim: "2.4 V Diesel", tag: "suv_mpv", tl: "MPV", hp: "149", zero: "11.2s", trans: "Auto", seats: "7", price: "700.000", pn: 700000, img: "pictcar/TOYOTA%20INNOVA%20REBORN.jpeg", hot: true, rat: 4.9, revs: 215 },
  { id: 4, name: "Toyota Innova Zenix", trim: "2.0 Q Hybrid", tag: "suv_mpv", tl: "MPV", hp: "186", zero: "9.5s", trans: "e-CVT", seats: "7", price: "1.500.000", pn: 1500000, img: "pictcar/TOYOTA%20INNOVA%20ZENIX.jpeg", hot: true, rat: 5.0, revs: 134 },
  { id: 5, name: "Toyota Alphard", trim: "2.5 G AT", tag: "suv_mpv", tl: "Luxury MPV", hp: "180", zero: "10.5s", trans: "CVT", seats: "7", price: "1.700.000", pn: 1700000, img: "pictcar/TOYOTA%20ALPHARD.jpeg", hot: true, rat: 4.9, revs: 342 },
  { id: 6, name: "Toyota Fortuner", trim: "2.8 VRZ Diesel", tag: "suv_mpv", tl: "SUV", hp: "201", zero: "10.2s", trans: "Auto", seats: "7", price: "1.500.000", pn: 1500000, img: "pictcar/TOYOTA%20FORTUNER.jpeg", hot: false, rat: 4.8, revs: 188 },
  { id: 7, name: "Toyota Hiace", trim: "Commuter", tag: "mini_bus", tl: "Mini Bus", hp: "136", zero: "-", trans: "Manual", seats: "15", price: "1.800.000", pn: 1800000, img: "pictcar/TOYOTA%20HIACE.jpeg", hot: true, rat: 4.7, revs: 92 },
  { id: 8, name: "Isuzu Elf", trim: "Long NLR", tag: "mini_bus", tl: "Mini Bus", hp: "100", zero: "-", trans: "Manual", seats: "19", price: "1.800.000", pn: 1800000, img: "pictcar/ISUZU%20ELF.jpeg", hot: false, rat: 4.6, revs: 55 },
  { id: 9, name: "Medium Bus", trim: "Pariwisata", tag: "medium_bus", tl: "Bus", hp: "260", zero: "-", trans: "Manual", seats: "31", price: "2.500.000", pn: 2500000, img: "pictcar/MEDIUM%20BUS.jpeg", hot: false, rat: 4.8, revs: 112 },
  { id: 10, name: "Big Bus", trim: "Pariwisata SHD", tag: "big_bus", tl: "Bus", hp: "380", zero: "-", trans: "Manual", seats: "59", price: "3.500.000", pn: 3500000, img: "pictcar/BIG%20BUS.jpeg", hot: false, rat: 4.9, revs: 87 }
];

const STAR_SVG = `<svg viewBox="0 0 24 24" fill="#FFD34E" width="11" height="11"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`;
const HEART_OFF = `<svg viewBox="0 0 24 24" fill="none" stroke="var(--gr)" stroke-width="1.5" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
const HEART_ON = `<svg viewBox="0 0 24 24" fill="#FF6B6B" stroke="#FF6B6B" stroke-width="1.5" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
const FALLBACK = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=70&auto=format&fit=crop';

function tagCls(t) { return { suv_mpv: 'u', mini_bus: 's', medium_bus: 'l', big_bus: 'h' }[t] || 'u' }

const favs = new Set();
function toggleFav(id, btn) {
  if (favs.has(id)) {
    favs.delete(id);
    btn.innerHTML = HEART_OFF;
    btn.classList.remove('active');
  } else {
    favs.add(id);
    btn.innerHTML = HEART_ON;
    btn.classList.add('active', 'animate');
    setTimeout(() => btn.classList.remove('animate'), 300);
  }
}

function render(filter) {
  const g = document.getElementById('cgrid');
  const list = filter === 'all' ? cars : cars.filter(c => c.tag === filter);
  g.innerHTML = list.map(c => {
    const isFav = favs.has(c.id);
    return `
    <div class="cc${c.hot ? ' hot' : ''}" onclick="openMod(${c.id})">
      <div class="cc-img-wrap">
        <div class="cc-img-top"></div>
        <img class="cc-img" src="${c.img}" alt="${c.name}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK}'">
        <div class="cc-img-ov"></div>
      </div>
      <div class="cc-body">
        <div class="cc-top">
          <span class="tag ${tagCls(c.tag)}">${c.tl}</span>
          <button class="fav-btn${isFav ? ' active' : ''}" onclick="event.stopPropagation();toggleFav(${c.id},this)" title="Favorit">${isFav ? HEART_ON : HEART_OFF}</button>
        </div>
        <div class="cname">${c.name}</div>
        <div class="ctrim">${c.trim}</div>
        <div class="cspecs">
          <div class="sp"><span class="spv">${c.hp}</span><span class="spk">HP</span></div>
          <div class="sp"><span class="spv">${c.zero}</span><span class="spk">0-100</span></div>
          <div class="sp"><span class="spv">${c.trans}</span><span class="spk">Transmisi</span></div>
          <div class="sp"><span class="spv">${c.seats}</span><span class="spk">Kursi</span></div>
        </div>
        <div class="cfoot">
          <div><div class="cpv">Rp ${c.price}</div><div class="cpp">per hari · inkl. asuransi</div></div>
          <button class="cbtn" onclick="event.stopPropagation();openMod(${c.id})">Booking via WA</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function fc(f, btn) {
  document.querySelectorAll('.ft').forEach(t => t.classList.remove('on'));
  btn.classList.add('on'); render(f);
}

// ── MODAL ──
let curCar = null;
function openMod(id) {
  curCar = cars.find(c => c.id === id); if (!curCar) return;
  document.getElementById('mtitle').textContent = curCar.name + ' — ' + curCar.trim;
  const mi = document.getElementById('m-car-img');
  mi.src = curCar.img; mi.onerror = function () { this.style.display = 'none' };
  document.getElementById('mspecs').innerHTML = `
    <div class="msp"><div class="mspv">${curCar.hp}</div><div class="mspk">HP</div></div>
    <div class="msp"><div class="mspv">${curCar.zero}</div><div class="mspk">0-100 km/h</div></div>
    <div class="msp"><div class="mspv">${curCar.trans}</div><div class="mspk">Transmisi</div></div>
    <div class="msp"><div class="mspv">${curCar.seats}</div><div class="mspk">Kursi</div></div>`;
  const t = new Date(), t1 = new Date(t), t2 = new Date(t);
  t1.setDate(t.getDate() + 1); t2.setDate(t.getDate() + 4);
  const f = d => d.toISOString().split('T')[0];
  document.getElementById('ms').value = f(t1);
  document.getElementById('me').value = f(t2);
  calcP();
  document.getElementById('mov').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMod() { document.getElementById('mov').classList.remove('open'); document.body.style.overflow = ''; }
function calcP() {
  if (!curCar) return;
  const s = document.getElementById('ms').value, e = document.getElementById('me').value;
  if (s && e) {
    const days = Math.max(1, Math.round((new Date(e) - new Date(s)) / 86400000));
    document.getElementById('mprice').textContent = 'Rp ' + (curCar.pn * days).toLocaleString('id-ID');
    document.getElementById('mdays').textContent = days + ' hari · inkl. asuransi & BBM';
  }
}
function confirmBooking() {
  if (!curCar) return;
  const nm = document.querySelector('#mov input[type=text]')?.value || '';
  const ph = document.querySelector('#mov input[type=tel]')?.value || '';
  const loc = document.querySelectorAll('#mov input[type=text]')[1]?.value || '';
  const kota = document.querySelector('#mov select')?.value || '';
  const sd = document.getElementById('ms')?.value || '';
  const ed = document.getElementById('me')?.value || '';
  const days = sd && ed ? Math.max(1, Math.round((new Date(ed) - new Date(sd)) / 86400000)) : 1;
  const total = (curCar.pn * days).toLocaleString('id-ID');
  const msg = `Halo TWHRENTCAR, saya ingin booking:%0A%0A🚗 *${curCar.name} ${curCar.trim}*%0A📅 Tanggal: ${sd} s/d ${ed} (${days} hari)%0A📍 Kota Pickup: ${kota}%0A🏨 Lokasi Antar: ${loc}%0A👤 Nama: ${nm}%0A📱 No. HP: ${ph}%0A💰 Total Estimasi: Rp ${total}%0A%0AMohon konfirmasi ketersediaan. Terima kasih!`;
  closeMod();
  window.open('https://wa.me/6281290608190?text=' + msg, '_blank');
}

function showToast(msg) {
  const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4200);
}
function s2(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }

// ── LOCATION ──
document.querySelectorAll('.lc').forEach(c => {
  c.addEventListener('click', function () {
    document.querySelectorAll('.lc').forEach(x => x.classList.remove('on'));
    this.classList.add('on');
  });
});

// ── MOBILE MENU ──
function toggleMenu() {
  const d = document.getElementById('mnav-drawer');
  const h = document.getElementById('ham-btn');
  const open = d.classList.toggle('open');
  const spans = h.querySelectorAll('span');
  if (open) { spans[0].style.transform = 'rotate(45deg) translate(5px,5px)'; spans[1].style.opacity = '0'; spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)'; }
  else { spans[0].style.transform = ''; spans[1].style.opacity = ''; spans[2].style.transform = ''; }
  document.body.style.overflow = open ? 'hidden' : '';
}
function closeMenu() {
  const d = document.getElementById('mnav-drawer');
  d.classList.remove('open');
  document.getElementById('ham-btn').querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  document.body.style.overflow = '';
}

// ── NAV / BTT ──
window.addEventListener('scroll', () => {
  document.getElementById('mnav').style.background = window.scrollY > 50 ? 'rgba(11,11,11,.98)' : 'rgba(11,11,11,.96)';
  document.getElementById('btt').classList.toggle('show', window.scrollY > 400);
});

// ── INIT ──
render('all');
const today = new Date(), ta = new Date(today), tb = new Date(today);
ta.setDate(today.getDate() + 1); tb.setDate(today.getDate() + 4);
const fmt = d => d.toISOString().split('T')[0];
const e1 = document.getElementById('d1'), e2 = document.getElementById('d2');
if (e1) e1.value = fmt(ta); if (e2) e2.value = fmt(tb);

// ── BLOG DATA ──
const blogs = [
  {
    id: 0,
    cat: 'Tips Sewa',
    title: '5 Tips Memilih Mobil Sport untuk Perjalanan Bisnis',
    date: '12 Januari 2025',
    read: '5 menit baca',
    author: 'Tim TWHRENTCAR',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85&auto=format&fit=crop',
    content: `
      <p>Memilih kendaraan yang tepat untuk perjalanan bisnis bukan hanya soal gaya semata — kenyamanan selama berkendara, efisiensi waktu, dan kesan pertama kepada klien juga sangat menentukan kesuksesan pertemuan Anda.</p>
      <h3>1. Perhatikan Kenyamanan Kabin</h3>
      <p>Sebelum memilih, pertimbangkan berapa lama perjalanan yang akan ditempuh. Untuk perjalanan lebih dari 2 jam, prioritaskan kendaraan dengan kursi berventilasi, suspensi mumpuni, dan ruang kaki yang lega. Mercedes S-Class dan BMW 7 Series adalah pilihan ideal untuk kategori ini.</p>
      <h3>2. Sesuaikan dengan Jumlah Penumpang</h3>
      <p>Jika Anda bepergian bersama tim atau menjemput klien, pilih kendaraan yang mampu menampung 4-5 penumpang dengan nyaman. SUV premium seperti Range Rover Sport atau BMW X7 memberikan ruang kabin yang lega tanpa mengorbankan performa.</p>
      <h3>3. Pertimbangkan Citra Profesional</h3>
      <p>Kendaraan yang Anda gunakan mencerminkan profesionalisme Anda di mata klien. Pilih warna netral seperti hitam, putih, atau abu-abu. Hindari warna mencolok untuk pertemuan formal pertama.</p>
      <h3>4. Pastikan Teknologi Terkini</h3>
      <ul>
        <li>Head-up display untuk navigasi tanpa alih pandang</li>
        <li>Apple CarPlay & Android Auto untuk konektivitas sempurna</li>
        <li>Sistem audio premium untuk panggilan conference</li>
        <li>Wireless charging untuk perangkat Anda</li>
      </ul>
      <h3>5. Cek Ketersediaan dan Antar-Jemput</h3>
      <p>Pilih penyedia rental yang menawarkan layanan antar-jemput ke hotel atau bandara. TWHRENTCAR menyediakan layanan ini 24/7 tanpa biaya tambahan di semua kota besar Indonesia. Dengan armada terawat dan pengemudi profesional opsional, perjalanan bisnis Anda akan berjalan sempurna.</p>
      <p>Siap memilih kendaraan terbaik untuk perjalanan bisnis Anda berikutnya? Hubungi tim TWHRENTCAR melalui WhatsApp dan kami akan membantu Anda menemukan pilihan yang tepat.</p>
    `
  },
  {
    id: 1,
    cat: 'Review',
    title: 'Review Lengkap: Lamborghini Urus di Jalanan Bali',
    date: '8 Januari 2025',
    read: '7 menit baca',
    author: 'Redaksi TWHRENTCAR',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&auto=format&fit=crop',
    content: `
      <p>Ketika kami mendapat kesempatan mengendarai Lamborghini Urus selama 3 hari di Bali — dari keramaian Seminyak, menyusuri tebing dramatis Uluwatu, hingga menembus jalan-jalan menanjak Kintamani — kami tahu ini akan menjadi pengalaman yang sulit dilupakan.</p>
      <h3>Kesan Pertama: Menghentikan Segala Aktivitas</h3>
      <p>Begitu Urus diparkir di depan The Mulia Nusa Dua, setiap kepala menoleh. Kombinasi cat Giallo Orion (kuning Lamborghini ikonik) dengan desain bodi angular-aggressive menciptakan kehadiran yang benar-benar memukau. Ini bukan sekadar SUV — ini adalah pernyataan.</p>
      <h3>Performa di Atas Ekspektasi</h3>
      <p>Di balik kemewahan eksteriornya tersimpan mesin twin-turbo V8 4.0 liter yang menghasilkan 666 tenaga kuda. Di jalan tol Bali–Mandara, akselerasi 0–100 km/h dalam 3.3 detik terasa visceral — punggung tertahan ke kursi, suara knalpot meraung melodius.</p>
      <ul>
        <li>Mesin: Twin-turbo V8 4.0L, 666 HP / 850 Nm</li>
        <li>0–100 km/h: 3.3 detik</li>
        <li>Top speed: 305 km/h</li>
        <li>Transmisi: Otomatis 8-kecepatan ZF</li>
        <li>Penggerak: AWD dengan Torsen center differential</li>
      </ul>
      <h3>Kenyamanan Harian yang Mengejutkan</h3>
      <p>Berbeda dengan supercar konvensional, Urus terasa mengejutkan nyaman untuk pemakaian sehari-hari. Suspensi pneumatik adaptif menyerap polisi tidur dengan baik, visibilitas cukup baik untuk kendaraan sebesar ini, dan sistem parkir 360° membantu manuver di parkiran sempit vila.</p>
      <h3>Verdict: Layak Setiap Rupiahnya</h3>
      <p>Dengan harga sewa Rp 8.5 juta per hari dari TWHRENTCAR, Lamborghini Urus menawarkan pengalaman berkendara yang tidak tertandingi di segmen SUV manapun. Jika Anda mengunjungi Bali dan ingin membuat momen yang benar-benar tak terlupakan, ini adalah pilihan yang tidak akan Anda sesali.</p>
    `
  },
  {
    id: 2,
    cat: 'Electric',
    title: 'Mengapa Tesla Model S Plaid Jadi Pilihan Favorit 2025',
    date: '3 Januari 2025',
    read: '6 menit baca',
    author: 'Tim Teknologi TWHRENTCAR',
    img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=900&q=85&auto=format&fit=crop',
    content: `
      <p>Dalam daftar armada TWHRENTCAR, Tesla Model S Plaid secara konsisten menjadi kendaraan yang paling sering dipesan ulang oleh pelanggan yang pernah mencobanya. Bukan tanpa alasan — ini adalah salah satu kendaraan produksi tercepat yang pernah dibuat manusia.</p>
      <h3>Angka yang Tidak Masuk Akal (Tapi Nyata)</h3>
      <p>0–100 km/h dalam 2.1 detik. Bukan 2.1 detik di sirkuit dengan ban balap dan kondisi ideal — tapi di jalan biasa, dengan AC menyala, dari kondisi diam sempurna. Ini lebih cepat dari Ferrari 488, lebih cepat dari Lamborghini Huracán, dan hampir secepat Bugatti Chiron.</p>
      <ul>
        <li>Tenaga gabungan: 1.020 HP dari tiga motor listrik</li>
        <li>0–100 km/h: 2.1 detik</li>
        <li>Top speed: 322 km/h</li>
        <li>Jangkauan: 637 km per pengisian penuh</li>
        <li>Waktu pengisian Supercharger: 15 menit untuk 250 km</li>
      </ul>
      <h3>Interior: Ruang Tamu Futuristik</h3>
      <p>Layar utama 17 inci portrait mendominasi dasbor. Tidak ada tombol fisik yang tidak perlu — semua dikendalikan lewat layar sentuh ultra-responsif. Sistem audio 22-speaker Burmester mengisi kabin dengan kualitas suara yang membuat konser terasa kalah.</p>
      <h3>Mengapa Lebih Baik dari Mobil Sport Konvensional?</h3>
      <p>Tidak ada getaran mesin, tidak ada bau knalpot, tidak ada panas dari transmisi. Akselerasi tersedia instan tanpa perlu downshift atau menunggu turbo spool. Setelah mencoba Plaid, banyak pengemudi yang mengatakan mobil bensin terasa "lambat" dan "kasar" — bahkan yang bertenaga 600 HP sekalipun.</p>
      <h3>Tersedia di TWHRENTCAR</h3>
      <p>Tesla Model S Plaid tersedia di Jakarta, Bali, dan Surabaya dengan tarif mulai Rp 1.9 juta per hari. Setiap unit dilengkapi dengan pengisian baterai penuh dan akses ke jaringan Supercharger Tesla. Pesan sekarang melalui WhatsApp untuk ketersediaan unit.</p>
    `
  }
];

function openBlog(idx) {
  const b = blogs[idx];
  if (!b) return;
  document.getElementById('bm-img').src = b.img;
  document.getElementById('bm-cat').textContent = b.cat;
  document.getElementById('bm-title').textContent = b.title;
  document.getElementById('bm-date').textContent = b.date;
  document.getElementById('bm-read').textContent = b.read;
  document.getElementById('bm-author').textContent = b.author;
  document.getElementById('bm-content').innerHTML = b.content;
  document.getElementById('blog-mov').classList.add('open');
  document.body.style.overflow = 'hidden';
  // Scroll modal to top
  document.getElementById('blog-mov').scrollTo(0, 0);
}
function closeBlog() {
  document.getElementById('blog-mov').classList.remove('open');
  document.body.style.overflow = '';
}

// ── HERO SLIDESHOW ──
let currentHeroIndex = 0;
function cycleHeroImage() {
  if (!cars || cars.length === 0) return;
  currentHeroIndex = (currentHeroIndex + 1) % cars.length;
  const car = cars[currentHeroIndex];
  const heroImg = document.getElementById('hero-img');
  const heroName = document.getElementById('hero-badge-name');
  const heroDesc = document.getElementById('hero-badge-desc');
  
  if (heroImg && heroName && heroDesc) {
    // Fade out
    heroImg.style.opacity = 0;
    setTimeout(() => {
      heroImg.src = car.img;
      heroImg.alt = car.name;
      heroName.textContent = car.name;
      heroDesc.textContent = `${car.trim} · ${car.seats} Kursi · Mulai Rp ${car.price}/hari`;
      // Fade in
      heroImg.style.opacity = 1;
    }, 500);
  }
}
setInterval(cycleHeroImage, 10000);
