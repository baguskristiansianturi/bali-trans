# SOP 2 — Penerapan Halaman Artikel dan Publikasi

> **Status:** DRAF — mengikuti persetujuan Mas Bagus  
> **Versi:** 0.1  
> **Berlaku untuk:** penerapan artikel blog/editorial BDM Trans ke repository dan GitHub Pages.

## 1. Gerbang masuk

SOP ini hanya boleh dimulai jika:
- [ ] Naskah final telah disetujui secara eksplisit oleh Mas Bagus.
- [ ] Judul, isi, heading, metadata, label, sumber, dan kebutuhan visual sudah jelas.
- [ ] Master destinasi/aktivitas dan relasi konten sudah diperiksa pada SOP 1.
- [ ] Tidak ada fakta atau keputusan editorial yang masih perlu ditebak.

Jika naskah belum disetujui, berhenti. Jangan coding, mengubah data artikel, atau membuat halaman.

## 2. Pemeriksaan repository sebelum coding

- [ ] Baca SOP repository `SOP.md`, SOP 1, dan dokumen arsitektur/template yang relevan.
- [ ] Periksa struktur artikel yang sudah ada dan gunakan template/komponen global yang berlaku.
- [ ] Catat branch, commit aman, dan lingkup file yang boleh disentuh.
- [ ] Jangan mengubah halaman, desain, CSS, komponen, atau perilaku lain di luar kebutuhan artikel.
- [ ] Periksa URL slug, route, ID artikel, status publikasi, relasi ke master destinasi, kategori, dan label agar tidak duplikat atau salah klasifikasi.

## 3. Urutan dan komponen halaman

Terapkan urutan sesuai template artikel yang telah disetujui. Periksa sekurang-kurangnya:
- [ ] Navbar global dan breadcrumb sesuai jenis halaman serta taxonomy master.
- [ ] Hero artikel: H1, ringkasan/metadata, label yang relevan, dan gambar utama.
- [ ] Isi artikel: heading semantik, paragraf, daftar/tabel bila dibutuhkan, gambar pendukung, caption/kredit, tautan internal dan sumber.
- [ ] Penegasan teks memakai bold/italic/kurung secara kontekstual, tidak berlebihan.
- [ ] Note/catatan memakai panel dengan border halus, latar abu-abu lembut/transparan, padding proporsional, dan ukuran teks satu tingkat lebih kecil dari body; tetap kontras dan terbaca.
- [ ] Tautan sumber berada pada frasa kontekstual dan membuka halaman publikasi/bukti spesifik yang mendukung klaim, bukan homepage atau halaman umum.
- [ ] FAQ mengikuti accordion bersama: tertutup saat awal, satu panel terbuka, kartu mandiri, transisi halus, dan aksesibilitas dasar.
- [ ] Kesimpulan menggunakan ukuran body normal.
- [ ] Topik terkait, share article, dan rekomendasi artikel mengikuti urutan serta standar komponen yang berlaku.
- [ ] Footer global dan navigasi mobile tetap konsisten.

Jangan memaksakan komponen yang tidak relevan. Jangan menambah section hanya demi memenuhi checklist jika tidak sesuai isi artikel.

## 4. Standar media

- [ ] Gambar utama berada pada posisi hero dan tidak diberi caption jika standar template menetapkannya demikian.
- [ ] Gambar pendukung ditempatkan pada bagian yang relevan dan memiliki caption/kredit bila diperlukan.
- [ ] Nama file deskriptif, alt text alami dan akurat, format/ukuran/rasio sesuai standar repository.
- [ ] Hak penggunaan dan atribusi gambar diperiksa.
- [ ] Jika gambar gagal dimuat, tampilkan fallback yang dirancang di dalam frame; jangan biarkan ikon gambar rusak.
- [ ] Tidak memakai gambar dekoratif yang tidak membantu isi.

## 5. SEO dan data halaman

- [ ] Satu H1 dan hierarki H2/H3 yang benar.
- [ ] SEO title, meta description, slug, canonical, Open Graph/social metadata sesuai standar proyek.
- [ ] Internal link mengarah ke halaman yang benar-benar ada dan relevan.
- [ ] External source link menuju halaman spesifik yang mendukung klaim.
- [ ] Alt text tidak dijejali kata kunci.
- [ ] Structured data hanya ditambahkan jika sesuai konten dan implementasi.
- [ ] Status publikasi dan relasi master hanya diaktifkan setelah gerbang publikasi lulus.
- [ ] Jangan mengklaim artikel terindeks atau mendapat ranking tanpa bukti.

## 6. Pengujian sebelum deploy

- [ ] Validasi sintaks/build/test yang relevan.
- [ ] Periksa seluruh diff dan pastikan tidak ada perubahan di luar lingkup.
- [ ] Periksa tautan internal/eksternal, gambar, anchor, share, accordion, dan route.
- [ ] Uji ukuran mobile dan desktop melalui sarana yang tersedia; catat keterbatasan jika tidak bisa menguji perangkat nyata.
- [ ] Pastikan tidak ada teks mentah, karakter escape, atau artefak seperti `/n` yang tampil.
- [ ] Commit perubahan secara terukur dan catat hash.
- [ ] Jalankan deployment dan periksa status GitHub Actions sampai ada hasil.
- [ ] Buka URL GitHub Pages artikel yang tepat setelah deployment berhasil.

## 7. Serah terima ke SOP 3

Kirim kepada Mas Bagus:
- URL GitHub Pages artikel;
- commit hash;
- status validasi dan deployment;
- daftar pengujian yang sudah dijalankan;
- batasan yang belum dapat diuji.

Setelah halaman tersedia, mulai **SOP 3 — Audit Setelah Publikasi**. Jangan menyatakan pekerjaan final hanya berdasarkan deployment berhasil.
