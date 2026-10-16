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

**Tahap: memulai audit struktur frontend di branch kerja terpisah; perubahan kode, pengujian browser, dan deployment belum boleh dianggap selesai sebelum diverifikasi.**

- [x] Repository aktif dikonfirmasi: `baguskristiansianturi/bali-trans`; branch default `main`.
- [x] Branch dokumentasi `docs/brand-led-bdm-revival-roadmap` berisi roadmap dan catatan kelanjutan kerja.
- [x] Branch kerja implementasi `work/site-structure-audit` dibuat dari `preview/bali-trans`; `main` tidak diubah.
- [x] Urutan implementasi frontend diperjelas pada roadmap: audit struktur/komponen bersama → konsistensi seluruh halaman → struktur UI wishlist/account/booking dengan batas fungsi yang jelas → uji template dan alur Lovina Dolphin Experience.
- [ ] Audit seluruh halaman dan tautan belum selesai.
- [ ] Perubahan kode UI pada branch kerja belum dinyatakan selesai sebelum file yang berubah diperiksa kembali.
- [ ] Pengujian browser/mobile dan verifikasi deployment belum dilakukan dalam tahap ini.
- [ ] Ketersediaan supplier, harga final, inventaris, dan kesiapan operasi layanan tetap memerlukan verifikasi terpisah.

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

1. Audit halaman/tautan/komponen yang sudah ada pada `work/site-structure-audit`.
2. Catat reuse vs perbaikan, lalu buat perubahan fondasi kecil dengan kriteria penerimaan yang jelas.
3. Rapikan konsistensi navigasi, footer, tipografi, spacing, dan mobile tanpa redesign besar yang tidak didukung audit.
4. Siapkan struktur UI serta status jujur untuk Wishlist, Account, dan Booking; jangan mengklaim autentikasi/persistensi/pembayaran aktif.
5. Uji Lovina Dolphin Experience melalui template produk yang konsisten setelah fondasi cukup stabil.
6. Catat hasil pemeriksaan, kendala, status PR, dan deployment yang benar-benar terjadi.

Jangan melompat langsung membangun planner itinerary/anggaran, marketplace penuh, atau pembayaran otomatis sebelum alur produk awal dan operasi layanan terbukti dibutuhkan.

## Format pembaruan status

Setiap kali ada pekerjaan penting, perbarui bagian status di atas dengan bahasa sederhana:
- **Selesai dan diverifikasi:** apa yang berubah dan bagaimana diperiksa.
- **Dibuat tetapi belum diverifikasi:** apa yang dibuat dan apa yang belum diuji.
- **Belum dikerjakan:** pekerjaan penting yang masih menunggu.
- **PR/merge/deployment:** status aktual dan tautan yang relevan.
- **Langkah berikutnya:** satu prioritas yang paling masuk akal.

Tidak perlu menjadikan nomor commit sebagai syarat untuk memahami konteks. Jika berguna untuk audit, tautkan riwayat GitHub, tetapi narasi status dan bukti verifikasi harus tetap cukup jelas tanpa harus menghafal SHA.
