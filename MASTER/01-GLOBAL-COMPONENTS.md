# 01 — Indeks Komponen Global

**Status:** INVENTARIS AWAL  
Catatan terperinci tersedia di folder MASTER/GLOBAL/.

| ID | Komponen | Sumber saat ini | Status penerapan | Persetujuan |
|---|---|---|---|---|
| GLB-001 | Navbar/header bersama | global-shell.js, global-shell.css | SUDAH DITERAPKAN | BELUM DICATAT |
| GLB-002 | Footer | global-shell.js, global-shell.css | SUDAH DITERAPKAN | BELUM DICATAT |
| GLB-003 | Navigasi bawah seluler | index.html dan pengendali SPA | DITERAPKAN UNTUK SPA | BELUM DICATAT |
| GLB-004 | Pencarian header | global-shell.js, interactions.js | SUDAH DITERAPKAN | BELUM DICATAT |
| GLB-005 | Pemilih bahasa/mata uang | global-shell.js, locale.js | SUDAH DITERAPKAN; CAKUPAN PERLU DIPERIKSA | BELUM DICATAT |
| GLB-006 | Kontrol akun | global-shell.js dan rute akun | ANTARMUKA TERSEDIA; AUTENTIKASI BELUM ADA | BELUM DICATAT |
| GLB-007 | Breadcrumb/penunjuk lokasi halaman | Pembentuk detail Dolphin dan metadata SEO | SEBAGIAN / KHUSUS HALAMAN | BELUM DICATAT |
| GLB-008 | Hero/bagian pembuka halaman | Beberapa pembentuk tampilan khusus halaman | DITERAPKAN DI BEBERAPA KELOMPOK; BELUM MENJADI KOMPONEN BERSAMA | BELUM DICATAT |
| GLB-009 | Indikator/tautan obrolan langsung | global-shell.js dan global-shell.css | DITERAPKAN SEBAGAI TAUTAN KONTAK/STATUS | BELUM DICATAT |
| GLB-010 | Notifikasi singkat/jendela modal | index.html dan interaksi/tampilan SPA | TERSEDIA; BATAS KOMPONEN PERLU DIPETAKAN | BELUM DICATAT |

## Aturan Komponen Bersama

Komponen disebut global hanya jika benar-benar digunakan bersama oleh beberapa halaman atau kelompok halaman. Bagian yang tampilannya mirip belum tentu merupakan komponen yang sama.

Jangan menetapkan hero, breadcrumb, kartu, formulir, atau carousel khusus halaman sebagai komponen global sebelum memastikan halaman pengguna dan aturan bersama komponen tersebut.

## Batas Global, Shared, dan Custom

- Navbar dan footer adalah komponen global karena markup/logikanya dibuat dari satu sumber di `assets/js/global-shell.js` dan gayanya di `assets/css/global-shell.css`.
- Booking form adalah alur shared dengan konfigurasi/adapter layanan; lihat `MASTER/SHARED/BOOKING-FORM.md`.
- Hero, breadcrumb, CTA, FAQ, card, dan note tidak otomatis global hanya karena namanya sama atau tampilannya mirip. Catat sebagai custom sampai ada bukti beberapa pemakai nyata dengan struktur/perilaku sama dan satu sumber implementasi bersama.
- Setiap komponen yang diekstrak menjadi global/shared harus memiliki sumber markup, style, perilaku, kontrak data, daftar pemakai, pengecualian, dan checklist regresi.
- Perubahan global wajib memetakan seluruh halaman pemakai; jangan mengubah CSS global untuk memperbaiki satu halaman custom.

## Aturan Perangkat

Rincian responsif hanya dicatat jika telah dikonfirmasi dari kode saat ini. Titik perubahan ukuran layar di CSS merupakan bukti adanya aturan gaya, bukan bukti bahwa tampilan sudah lulus pemeriksaan visual pada perangkat nyata.

Pemeriksaan visual langsung pada Android dan desktop tetap menjadi pemeriksaan rilis tersendiri sesuai catatan serah terima dan peta jalan proyek.
