# Produksi Artikel — Indeks SOP

Folder ini adalah satu-satunya pintu masuk untuk alur kerja produksi artikel. Setiap tahap memiliki dokumen tersendiri dan gerbang persetujuan.

| Tahap | Nama yang mudah diingat | Dokumen | Fungsi |
|---|---|---|---|
| 1 | **SOP Riset** | [01-RISET-DAN-NASKAH.md](./01-RISET-DAN-NASKAH.md) | Master destinasi, riset kata kunci, SERP/kompetitor, verifikasi fakta/sumber, dan penyusunan naskah untuk approval |
| 2 | **SOP Implementasi** | [02-IMPLEMENTASI-HALAMAN.md](./02-IMPLEMENTASI-HALAMAN.md) | Penerapan naskah yang telah disetujui ke halaman website, berdasarkan baseline desain dan struktur terbaru |
| 3 | **SOP Audit** | [03-AUDIT-PASCA-PUBLIKASI.md](./03-AUDIT-PASCA-PUBLIKASI.md) | Audit UI, UX, originalitas, fakta, SEO, performa, dan persetujuan akhir |

## Aturan gerbang

1. SOP Riset harus selesai dan naskah harus disetujui sebelum SOP Implementasi dimulai.
2. SOP Implementasi mencatat kondisi implementasi aktual. Baseline awalnya adalah halaman Pantai Kuta, bukan desain universal untuk semua jenis halaman.
3. Setiap perubahan yang diminta dan disetujui Mas Bagus harus diterapkan, diuji, lalu dicatat sebagai versi baru SOP terkait.
4. SOP Audit dimulai setelah deployment tersedia untuk diperiksa.
5. Jangan menandai tahap lulus jika belum diuji. Catat keterbatasan secara terbuka.

## Aturan versi hidup

SOP bukan dokumen statis. Setelah perubahan desain/struktur disetujui:
- perbarui SOP tahap yang relevan;
- naikkan nomor versi;
- catat tanggal, ringkasan perubahan, file/komponen terdampak, commit, dan status persetujuan;
- pertahankan riwayat versi sebelumnya;
- sinkronkan Master komponen global/shared bila perubahan memengaruhinya.

**Pemisahan penting:** SOP Riset mengatur *apa yang ditulis*. SOP Implementasi mengatur *bagaimana naskah ditempatkan dan diterapkan*. SOP Audit memeriksa *apakah hasil publikasi benar dan layak disetujui*.

## Arah restrukturisasi yang disepakati

Target alur berikutnya adalah empat tahap: **01 Perencanaan & Brief → 02 Riset & Penulisan → 03 Implementasi → 04 Audit, Publikasi & Evaluasi**. Rincian dan pemetaan isi disimpan di [Rencana Restrukturisasi](./00-RENCANA-RESTRUKTURISASI.md).

Tiga SOP yang saat ini ada tetap dipertahankan sebagai baseline sampai penomoran dan pemindahan isinya diselaraskan. Jangan menganggap restrukturisasi file final sudah selesai. Pekerjaan produksi artikel sedang dihentikan sementara atas arahan Mas Bagus; fokus saat ini pembenahan dokumentasi Master dan SOP.
