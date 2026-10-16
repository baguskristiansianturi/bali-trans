# BDM Trans Indonesia — Frontend Foundation V1

Fondasi awal platform BDM. Fokus versi ini adalah **struktur**, bukan backend/produksi.

## Melanjutkan pekerjaan

Mulai dari [HANDOFF.md](HANDOFF.md) untuk status kerja terakhir, hal yang sudah dan belum diverifikasi, serta langkah berikutnya. Setelah itu baca [ROADMAP.md](ROADMAP.md) untuk keputusan strategi dan batasan proyek.

## Roadmap kebangkitan

Lihat [ROADMAP.md](ROADMAP.md) untuk rancangan strategi berbasis merek, validasi permintaan, operasi layanan, website MVP, dan tahapan teknis. Dokumen itu berstatus **rancangan untuk ditinjau**, bukan bukti bahwa layanan atau sistem sudah siap.

Urutan lama di bagian bawah README merupakan daftar pekerjaan teknis awal. Sebelum melengkapi semua halaman atau membangun backend, tinjau roadmap baru dan prioritaskan validasi layanan inti, kesiapan operasi, serta jalur inquiry yang benar-benar bisa ditindaklanjuti.

## Prinsip fondasi frontend

Struktur awal platform dirancang sebagai: Discover → Choose → Price → Book → Travel → Optional Transport. Ini menjelaskan arsitektur prototipe saat ini, bukan keputusan final tentang positioning merek untuk tahap kebangkitan. Lihat roadmap untuk rekomendasi strategi dan gerbang persetujuannya.

## Struktur

- index.html — Home / master experience
- pages/search.html — pencarian
- pages/experiences/ — aktivitas & pengalaman
- pages/tours/ — tur
- pages/tickets/ — tiket
- pages/dining/ — BDM Dining
- pages/destinations/ — destinasi
- pages/guides/ — panduan & travel updates
- pages/marketplace/ — produk lokal / Muslim travel essentials
- pages/transport/ — transport opsional dalam prototipe saat ini
- pages/itinerary/ — Build Your Day
- pages/booking/ — fondasi halaman booking, payment, confirmation, invoice
- pages/account/ — fondasi halaman login & My BDM
- pages/partner/ — fondasi partner portal
- pages/admin/ — fondasi operasi internal
- css/ — stylesheet
- js/ — shared JavaScript

## Catatan kesiapan

Repository ini adalah fondasi frontend statis. Kehadiran suatu halaman tidak berarti fungsi booking, pembayaran, akun, partner, atau admin telah aktif. Periksa fungsi dan deployment secara langsung sebelum mengiklankan atau menerima pemesanan melalui alur tersebut.

## Rencana teknis awal (belum menjadi urutan wajib)

1. Lengkapi halaman yang memang dibutuhkan
2. Audit UX dan UI
3. Audit mobile/desktop
4. Audit tautan dan navigasi
5. Audit copywriting dan SEO
6. Rancang booking, pembayaran, dan pembatalan
7. Aktifkan JavaScript sesuai kebutuhan yang telah divalidasi
8. Backend Go + PostgreSQL bila diperlukan
9. Auth, payment, email/invoice, partner/admin bila dibutuhkan
10. Testing keamanan dan fungsional
11. Deployment Google Cloud setelah siap
