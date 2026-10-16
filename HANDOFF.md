# Catatan Kelanjutan Kerja — Bali Travel / BDM Trans

> Dokumen ini adalah titik masuk untuk melanjutkan pekerjaan setelah percakapan baru dimulai. Baca dokumen ini dan `ROADMAP.md` sebelum mengubah kode. Jangan meminta pemilik mengulang konteks yang sudah tercatat di sini kecuali ada informasi baru yang benar-benar diperlukan.

## Cara melanjutkan di chat baru

Mulai dengan membaca:
1. `HANDOFF.md` — status kerja terakhir, hal yang sudah/belum diverifikasi, dan langkah berikutnya.
2. `ROADMAP.md` — keputusan strategi dan batasan produk yang lebih lengkap.
3. `README.md` — gambaran struktur repository.

Lalu periksa kondisi GitHub terkini secara langsung. Dokumen ini adalah catatan kerja, bukan pengganti pemeriksaan branch, PR, file, deployment, atau hasil pengujian yang terbaru. Gunakan status aktual repository bila berbeda dari catatan ini.

## Identitas proyek dan prinsip kerja

- Repository: `baguskristiansianturi/bdm-trans-indonesia`.
- Nama kerja website untuk tahap perencanaan: **Bali Travel**. Ini bukan rename repository atau keputusan final nama merek publik.
- Pemilik menggunakan ponsel Android dengan keterbatasan perangkat; prioritaskan perubahan kecil, mudah ditinjau, dan pengujian mobile.
- Beri laporan jujur. Jangan menyebut sesuatu selesai, teruji, ter-deploy, atau siap menerima booking tanpa bukti yang sesuai.
- Bedakan **rencana**, **perubahan kode**, **hasil pengujian**, **deployment**, dan **kesiapan operasional**.
- Jangan memasukkan ide baru ke roadmap sebagai keputusan final tanpa persetujuan pemilik.
- Jangan membahas kepada publik bahwa proyek sedang dibangun kembali, sedang mencari mitra, atau belum memiliki armada. Komunikasi publik harus berfokus pada kebutuhan pelanggan dan informasi layanan yang benar.
- Cloudflare tidak lagi direncanakan. Tidak menggunakan CodeIgniter. Backend Go/Golang dan Google Cloud merupakan arah masa depan, belum dianggap tersedia atau dikonfigurasi.

## Status terakhir yang tercatat

**Tahap: audit statis awal dan perubahan fondasi kecil pada branch kerja. Belum ada verifikasi browser/mobile atau deployment.**

- [x] Repository aktif dikonfirmasi: `baguskristiansianturi/bali-trans`; branch default `main`.
- [x] Roadmap dan handoff diperbarui pada branch `docs/brand-led-bdm-revival-roadmap`, termasuk urutan: audit struktur/komponen bersama → konsistensi halaman → struktur wishlist/account/booking dengan batas fungsi jelas → uji produk Lovina.
- [x] Branch kerja `work/site-structure-audit` dibuat dari `preview/bali-trans`; `main` tidak diubah.
- [x] Audit statis mencakup 34 halaman HTML; tidak ditemukan target file lokal `href`/`src` yang hilang pada pemeriksaan ini. Ini bukan bukti bahwa tautan eksternal, interaksi, tampilan, atau alur runtime sudah benar.
- [x] Homepage hero sekarang mengarah ke katalog Experiences, bukan menjadikan Lovina Dolphin Experience satu-satunya titik utama homepage.
- [x] Halaman Wishlist dibuat dengan empty state dan penjelasan bahwa penyimpanan/sinkronisasi belum terhubung; link ditambahkan pada nav/footer homepage.
- [x] JavaScript navigasi mobile diperbaiki agar `aria-expanded` dan label tombol diperbarui saat menu dibuka/ditutup.
- [x] `AUDIT.md` mencatat ruang lingkup, temuan awal, perubahan, dan hal yang belum diuji.
- [ ] Header/footer masih diduplikasi dan berbeda antarhalaman; standardisasi global belum selesai.
- [ ] Halaman Tickets/Tours dan banyak Account masih berisi struktur placeholder; belum siap diperlakukan sebagai katalog/akun operasional.
- [x] Perubahan awal di-merge ke `preview/bali-trans` melalui [PR #1](https://github.com/baguskristiansianturi/bali-trans/pull/1); `main` tidak diubah.
- [x] Build job GitHub Actions berhasil untuk commit merge `fc5b16ee0eb445ab5dc1bfbb2373ddb0b1ada407`; deploy job masih berjalan pada pemeriksaan terakhir.
- [ ] Pengujian browser/mobile, alur Lovina end-to-end, dan hasil deployment final belum diverifikasi.
- [ ] Kesiapan supplier, harga final, inventaris, dan operasi layanan tetap memerlukan verifikasi terpisah.
- [ ] Belum ada merge ke `main`.

## Keputusan produk yang harus dipertahankan

1. **Fokus awal:** tiket/aktivitas dan paket tour. Transport disiapkan dalam struktur produk, tetapi jangan menjual seolah ketersediaan sudah pasti.
2. **Sumber kebenaran ketersediaan:** data kapasitas dan konfirmasi aktual. Periksa ulang sebelum booking dikonfirmasi dan perbarui kapasitas setelah booking untuk menghindari double booking.
3. **Harga:** dugaan harga BDM 30–40% di atas referensi hanyalah hipotesis; evaluasi tiap produk berdasarkan biaya pemasok, isi paket, mutu, risiko, biaya tambahan, dan nilai nyata.
4. **Konten destinasi:** gunakan referensi lokal untuk riset, bukan menyalin teks/desain/foto. Verifikasi fakta sejarah, jam buka, harga, dan operasional dengan sumber tepercaya.
5. **Lokalisasi:** Bahasa Indonesia, English, English yang sesuai untuk wisatawan India, Bahasa Melayu Malaysia, Singapore English yang wajar, dan Arabic pada fase yang sesuai. Jangan menyimpulkan agama seseorang dari kewarganegaraan. Bahasa dan mata uang adalah pengaturan terpisah.
6. **Pembayaran dan booking:** halaman statis bukan bukti bahwa pembayaran, akun, ketersediaan, atau booking otomatis bekerja. Jangan mengambil deposit sebelum harga, ketersediaan, syarat, dan refund dijelaskan.
7. **Privasi preview:** `noindex` bukan perlindungan akses. Untuk preview sensitif, gunakan akses yang benar-benar dibatasi; jangan menganggap halaman GitHub Pages publik sebagai privat.
8. **Arsitektur masa depan:** frontend modular, backend Go/Golang, kemungkinan Google Cloud; implementasikan hanya setelah kebutuhan tervalidasi dan lingkungan tersedia.

## Langkah berikutnya yang direkomendasikan

1. Lanjutkan audit konsistensi header/footer, navigasi, judul/subjudul, spacing, CTA, dan tampilan mobile dalam kelompok kecil.
2. Rapikan pola layout bersama tanpa merusak bagian desain yang sudah bekerja; catat setiap perubahan dan kriterianya.
3. Lengkapi struktur Wishlist/Account/Booking hanya sejauh UI yang dapat dijelaskan secara jujur; autentikasi, penyimpanan lintas perangkat, ketersediaan real-time, dan pembayaran tetap belum aktif.
4. Uji Lovina Dolphin Experience melalui alur dari penemuan produk sampai halaman akhir, termasuk validasi, retensi state, dan jalur kembali.
5. Periksa penyelesaian workflow/deployment untuk PR #1, lalu buka preview di ponsel dan uji navigasi serta wishlist. Jangan menganggap build sukses berarti browser/deployment telah terverifikasi.
6. Uji alur Lovina dari pemilihan produk hingga halaman akhir, termasuk validasi, retensi state, dan jalur kembali.
7. Catat pengujian yang benar-benar dijalankan, kendala, status PR/merge/deployment, dan satu langkah berikutnya.
6. Catat pengujian yang benar-benar dijalankan, kendala, status PR/merge/deployment, dan satu langkah berikutnya.

Jangan melompat langsung membangun planner itinerary/anggaran, marketplace penuh, atau pembayaran otomatis sebelum alur produk awal dan operasi layanan terbukti dibutuhkan.

## Format pembaruan status

Setiap kali ada pekerjaan penting, perbarui bagian status di atas dengan bahasa sederhana:
- **Selesai dan diverifikasi:** apa yang berubah dan bagaimana diperiksa.
- **Dibuat tetapi belum diverifikasi:** apa yang dibuat dan apa yang belum diuji.
- **Belum dikerjakan:** pekerjaan penting yang masih menunggu.
- **PR/merge/deployment:** status aktual dan tautan yang relevan.
- **Langkah berikutnya:** satu prioritas yang paling masuk akal.

Tidak perlu menjadikan nomor commit sebagai syarat untuk memahami konteks. Jika berguna untuk audit, tautkan riwayat GitHub, tetapi narasi status dan bukti verifikasi harus tetap cukup jelas tanpa harus menghafal SHA.
