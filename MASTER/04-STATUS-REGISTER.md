# 04 — Daftar Status Master

**Pemetaan terakhir:** 2026-11-01  
**Versi penerapan:** a8d4282293d98923ecf160f52d95fe6168dd905d

## 1. Arti Status

| Status | Arti |
|---|---|
| SUDAH DIPETAKAN | Penerapan saat ini dan lokasi sumber sudah dicatat |
| DIPETAKAN SEBAGIAN | Sebagian perilaku atau ketergantungan masih perlu diperiksa |
| MENUNGGU PERSETUJUAN | Penerapan tersedia, tetapi standar penggunaan ulang belum disetujui |
| PENGECUALIAN | Memiliki perbedaan yang disengaja dari kerangka/pola umum |
| DIARSIPKAN | Kode disimpan tetapi tidak dianggap sebagai penerapan aktif |
| TAYANG — SUDAH DIVERIFIKASI | Halaman dan perilaku yang benar-benar tayang telah diperiksa setelah penerapan |
| TAYANG — BELUM DIVERIFIKASI | Belum ada bukti pemeriksaan langsung terbaru di Master ini |

## 2. Status Komponen Awal

| Komponen | Penerapan | Persetujuan | Catatan |
|---|---|---|---|
| Navbar/header bersama | SUDAH DIPETAKAN | BELUM DICATAT | Perbedaan navigasi utama desktop perlu diperiksa |
| Footer bersama | SUDAH DIPETAKAN | BELUM DICATAT | Lima kelompok tautan saat ini telah dipetakan |
| Navigasi bawah SPA | SUDAH DIPETAKAN | BELUM DICATAT | Empat item di index.html |
| Pencarian header | DIPETAKAN SEBAGIAN | BELUM DICATAT | Telusuri semua pengendali dan kondisi hasil sebelum perubahan |
| Pemilih bahasa/wilayah | DIPETAKAN SEBAGIAN | BELUM DICATAT | Kerangka saat ini menawarkan bahasa Indonesia dan Inggris |
| Kontrol akun | SUDAH DIPETAKAN | BELUM DICATAT | Autentikasi sebenarnya belum diterapkan |
| Breadcrumb | DIPETAKAN SEBAGIAN | BELUM DICATAT | Tampilan breadcrumb khusus halaman pada detail Dolphin |
| Hero | DIPETAKAN SEBAGIAN | BELUM DICATAT | Memiliki beberapa penerapan khusus halaman |
| Formulir pemesanan bersama | SUDAH DIPETAKAN | Acuan utama tercatat | Periksa persetujuan final terpisah |
| Pola detail artikel | PENERAPAN TERSEDIA | MENUNGGU PERSETUJUAN | Pola baku belum disetujui |
| Pola hasil pencarian | PENERAPAN TERSEDIA | MENUNGGU PENINJAUAN | Tata letak baku masih menunggu peninjauan |
| Halaman utama | SUDAH DITERAPKAN | DISETUJUI menurut HANDOFF | Pertahankan kecuali diminta jelas |
| app.js monolitik lama | DIARSIPKAN | TIDAK BERLAKU | Disimpan di assets/js/legacy/ |

## 3. Pengecualian yang Diketahui

- Halaman checkout dapat tidak menggunakan header/footer global.
- Mode checkout SPA menyembunyikan kerangka global dan navigasi bawah perangkat seluler.
- Navigasi bawah SPA bukan komponen universal untuk halaman mandiri.
- Kelompok halaman HTML mandiri mempertahankan alamat publik di folder utama.
- Dolphin Tour memiliki pembentuk halaman detail/landing page khusus; jangan menganggap semua detail wisata menggunakan tata letak final yang sama.

## 4. Kesenjangan Dokumentasi/Penerapan yang Diketahui

1. .bt-main-nav memiliki aturan CSS tetapi tidak ditampilkan dalam markup header bersama yang diperiksa saat ini. Periksa navigasi desktop yang dimaksud terhadap halaman yang tayang sebelum mengubahnya.
2. Penanda merek bersama saat ini berupa huruf “B” yang dibuat otomatis; aset/spesifikasi logo final yang disetujui belum dicatat di Master.
3. Komponen visual breadcrumb universal belum ditetapkan.
4. Komponen hero universal belum ditetapkan.
5. Pemeriksaan visual langsung pada Android dan desktop masih tercatat sebagai pekerjaan tersisa di serah terima/peta jalan proyek.
6. Pola detail artikel/destinasi dan hasil pencarian masih memiliki pekerjaan persetujuan/peninjauan di TEMPLATE-REGISTRY.md dan ROADMAP.md.
7. Inventaris awal ini tidak membuktikan bahwa semua berkas JS/CSS masih aktif. Penggunaan harus diperiksa sebelum penghapusan apa pun.

## 5. Catatan Masa Depan (Dokumentasi Saja; Tidak Ada Kode Dibuat)

- Konfirmasi dan dokumentasikan susunan akhir navigasi desktop.
- Catat sumber logo final dan aturan penggunaannya setelah diberikan/disetujui.
- Petakan penggunaan breadcrumb per halaman sebelum menjadikannya komponen bersama.
- Petakan susunan hero berdasarkan kelompok halaman.
- Lanjutkan pemetaan komponen untuk kartu, carousel, tab, accordion, modal, formulir, dan elemen antarmuka berulang lainnya setelah sumber dan pemanggil sebenarnya dipastikan.

Catatan tersebut bukan tugas penerapan dan bukan izin untuk mengubah kode.

## 6. Cara Memperbarui Daftar Ini

Perbarui status hanya jika didukung bukti repository atau persetujuan jelas dari Mas Bagus. Tambahkan SHA commit untuk setiap perubahan yang telah diverifikasi. Jangan menandai komponen selesai hanya karena berkasnya tersedia; bedakan antara sudah diterapkan, disetujui, diuji, dan benar-benar tayang.
