# SOP Perubahan Repository Bali Trans

Dokumen ini wajib dibaca sebelum mengerjakan setiap permintaan perubahan dari Mas Bagus. Berlaku untuk seluruh pekerjaan di repository ini dan menjadi aturan kerja utama.

## 1. Pahami instruksi sebelum bertindak

1. Baca prompt Mas Bagus sampai selesai.
2. Tentukan secara spesifik halaman, file, komponen, dan hasil yang diminta.
3. Bedakan dengan tegas antara:
   - **Diminta:** perubahan yang disebutkan secara eksplisit.
   - **Di luar lingkup:** perubahan lain, meskipun menurut asisten terlihat perlu atau lebih baik.
4. Jika satu detail penting benar-benar ambigu dan berisiko mengubah hasil, tanyakan satu pertanyaan singkat sebelum mengedit.
5. Jangan mulai mengedit hanya berdasarkan dugaan, kebiasaan, atau ide tambahan dari asisten.

## 2. Aturan utama: jangan mengubah yang tidak diminta

- Ubah **hanya** bagian yang diperlukan untuk memenuhi prompt.
- Jangan mengubah desain, tata letak, urutan section, ukuran atau bentuk card, jarak, warna, font, gambar, carousel, navbar, footer, sticky bar, responsivitas, interaksi, atau perilaku halaman kecuali diminta secara eksplisit.
- Permintaan copywriting/SEO berarti fokus pada teks, metadata, atribut gambar, heading semantik, tautan, dan data SEO yang relevan. Itu **bukan** izin untuk mendesain ulang halaman.
- Permintaan memperbaiki satu komponen berarti jangan menyentuh komponen lain atau halaman lain.
- Jangan melakukan refactor, merapikan kode, mengganti nama, menghapus fitur, memperbarui dependency, atau mengubah cache-busting sebagai pekerjaan sampingan.
- Jangan mengubah homepage ketika tugas menyebut halaman lain.
- Jika perubahan yang diminta tampak membutuhkan dampak tambahan, berhenti dan minta persetujuan sebelum memperluas lingkup.
- Jangan menambahkan “perbaikan sekalian” tanpa izin.

## 3. Amankan titik pemulihan sebelum mengedit

1. Periksa branch dan commit aktif serta perubahan yang sudah ada.
2. Baca dokumen proyek yang relevan, minimal `HANDOFF.md`, `ROADMAP.md`, dan `AUDIT.md` jika konteks tugas membutuhkannya.
3. Catat commit terakhir yang diketahui aman sebelum perubahan dimulai.
4. Jangan menimpa atau membuang pekerjaan yang sudah ada.
5. Jika kondisi branch atau perubahan sebelumnya tidak jelas, hentikan pengeditan dan periksa dahulu.
6. Untuk setiap tugas, buat commit yang terukur dan mudah dipulihkan. Jangan menggabungkan perubahan yang tidak berkaitan dalam satu commit.

## 4. Periksa lingkup dan diff

Sebelum commit:

1. Periksa seluruh file yang berubah.
2. Pastikan setiap perubahan dapat ditelusuri langsung ke instruksi Mas Bagus.
3. Pastikan tidak ada perubahan CSS/layout, halaman lain, aset, atau perilaku yang tidak diminta.
4. Jika ditemukan perubahan di luar lingkup, batalkan hanya perubahan tak diminta tersebut dengan aman. Jangan menutupinya menggunakan patch tambahan.
5. Jangan commit atau deploy apabila diff masih mengandung perubahan yang tidak disetujui.

## 5. Pengujian yang sesuai dengan tugas

- Jalankan pemeriksaan yang relevan dengan bagian yang benar-benar diubah.
- Pastikan halaman lain dan desain yang sudah disetujui tidak ikut berubah jika tugas memiliki risiko lintas halaman.
- Jangan menyatakan pengujian berhasil jika belum dijalankan atau hasilnya belum diperiksa.
- Jika ada kegagalan, laporkan dengan jelas. Jangan memperluas lingkup untuk memperbaikinya tanpa izin.
- Jangan mengklaim pemeriksaan visual di perangkat nyata sudah dilakukan jika belum.

## 6. Commit, deploy, dan verifikasi

1. Commit hanya perubahan yang diminta dan sudah diperiksa.
2. Ikuti alur deployment proyek setelah perubahan yang diminta siap untuk dipublikasikan.
3. Periksa status GitHub Actions/deployment sampai ada hasil yang dapat diverifikasi.
4. Jangan menyatakan situs publik sudah diperbarui sebelum deployment berhasil.
5. Berikan commit, status pengujian/deployment, dan URL halaman yang relevan secara ringkas.
6. Jika deployment gagal atau masih berjalan, nyatakan status sebenarnya; jangan menganggap berhasil.

## 7. Pemulihan jika hasil salah

- Gunakan commit aman yang sudah dicatat sebelum tugas dimulai.
- Jika terjadi regresi, hentikan perubahan lanjutan dan pulihkan dari titik aman yang sesuai.
- Jangan membuat banyak patch tambahan untuk menutupi kesalahan yang disebabkan perubahan di luar lingkup.
- Jangan memindahkan branch ke commit lain secara paksa tanpa memastikan commit tujuan, kondisi branch, dan dampaknya.

## 8. Format ringkas sebelum mulai bekerja

Sebelum melakukan edit, pastikan secara internal:

- **Permintaan:** apa tepatnya yang diminta?
- **Target:** file/halaman/komponen mana yang boleh disentuh?
- **Yang harus tetap:** bagian apa saja yang wajib dipertahankan?
- **Titik aman:** commit apa yang menjadi dasar pemulihan?
- **Validasi:** pemeriksaan apa yang relevan dengan tugas ini?

Tidak perlu mengirim rencana panjang kepada Mas Bagus setiap kali. Ajukan pertanyaan hanya jika ada ambiguitas yang benar-benar menghalangi pekerjaan. Setelah lingkup jelas, kerjakan secara langsung dan terbatas.

## 9. Prinsip keputusan

**Instruksi eksplisit Mas Bagus mengalahkan inisiatif asisten.** “Terlihat lebih baik”, “sekalian dirapikan”, atau “mungkin diperlukan” bukan alasan yang sah untuk mengubah hal lain. Jika tidak diminta, jangan ubah.
