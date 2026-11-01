# Cetak Biru Master — Bali Trans / BDM Trans

**Status:** INVENTARIS AWAL + FONDASI PRODUK BERTAHAP  
**Pemetaan terakhir:** 2026-11-01  
**Repository:** `baguskristiansianturi/bali-trans`  
**Cabang utama:** `main`  
**Versi penerapan yang digunakan untuk inventaris teknis awal:** `a8d4282293d98923ecf160f52d95fe6168dd905d`

## Mulai Setiap Sesi Kerja dari Sini

**Dokumen yang wajib dibaca pertama kali:** [Mulai dari Sini](./START-HERE.md).

Dokumen tersebut merupakan protokol memulai sesi dan kesepakatan cara kerja tim. Baca sebelum melanjutkan pekerjaan proyek. Isinya menjelaskan cara kolaborasi, tahap persetujuan, urutan dokumentasi, batas perlindungan website, dan posisi pembahasan terakhir.

Batas kerja saat ini: **pembahasan dan dokumentasi Master saja. Website yang sudah ada tidak boleh diubah kecuali ada izin terpisah dan jelas.**

## Dokumen Pembahasan Produk dan Layanan

Dokumen berikut menjadi sumber konteks bisnis untuk keputusan halaman, konten, alur pengguna, desain, dan penerapan di masa depan. Semuanya dikembangkan secara bertahap.

| Dokumen | Kegunaan |
|---|---|
| [Katalog Master](./MASTER-CATALOG.md) | Indeks pusat dokumen yang sudah ada, direncanakan, atau belum dibuat |
| [Fondasi Produk](./PRODUCT-FOUNDATION.md) | Posisi pasar, pelanggan sasaran, nilai layanan, fungsi website, dan pembahasan terbuka |
| [Master Layanan](./SERVICE-MASTER.md) | Kategori layanan dan jenis layanan saat ini |
| [Master Destinasi Bali](./01-DATA/DESTINATION-MASTER.md) | Aturan fungsi data destinasi dan inventaris awal destinasi dari Bali Golden Tour |
| [Master Aktivitas & Pengalaman](./01-DATA/ACTIVITY-EXPERIENCE-MASTER.md) | Inventaris aktivitas wisata, bentuk pengalaman, lokasi, dan data perencanaan |
| [SOP Produksi Artikel & SEO Organik](./03-GUIDELINES/ARTICLE-PRODUCTION-SOP.md) | Alur wajib produksi, pemeriksaan, coding, dan publikasi artikel; status draf usulan |
| [Daftar Ide Masa Depan](./FUTURE-IDEAS.md) | Konsep yang belum disetujui dan dipisahkan dari layanan aktif |
| [Daftar Pekerjaan](./WORK-REGISTER.md) | Pembahasan dan dokumentasi yang belum selesai |
| [Daftar Perubahan Master](./05-CHANGE-REGISTER.md) | Riwayat perubahan penting pada dokumen Master |

**Penting:** ide masa depan bukan layanan aktif atau tugas penerapan. Pekerjaan yang belum dicentang tetap terbuka meskipun tim berpindah topik. [Katalog Master](./MASTER-CATALOG.md) dan indeks kelompoknya juga mencatat dokumen yang kebutuhannya sudah ditemukan tetapi belum dibuat. Dokumen yang belum ada tidak boleh dianggap sebagai pekerjaan yang terlupakan.

## Cetak Biru Teknis

Folder ini juga menjadi peta yang dapat dibaca manusia untuk website Bali Trans yang sudah ada. Isinya mencatat:
- komponen dan modul halaman yang sudah tersedia;
- tanggung jawab setiap komponen;
- lokasi kode penerapan sebenarnya;
- halaman yang menggunakan komponen dan halaman yang memiliki pengecualian;
- status penerapan dan persetujuan saat ini;
- kekurangan atau perbedaan yang perlu diselesaikan sebelum komponen dianggap sebagai standar final.

Inventaris teknis awal mendokumentasikan penerapan yang sudah ada. Bagian ini terpisah dari dokumen pembahasan produk yang berangkat dari kebutuhan bisnis.

## Batas Isi Master

Master merupakan bahan dasar untuk membangun model bisnis dan pengetahuan produk: tujuan, pelanggan, produk, layanan, data destinasi, kategori, aturan fungsi data, dan informasi yang kelak dibutuhkan untuk konten. Master boleh mencatat fungsi dan hubungan informasi yang diperlukan, tetapi **tidak perlu mendahului pembahasan dengan rancangan tampilan, susunan visual, atau spesifikasi teknis website**. Pembahasan desain dan teknis dilakukan setelah isi bisnis dan produk cukup matang.

## Ini Bukan Kode Sumber

Berkas di dalam `MASTER/` hanya berisi dokumentasi. Jangan memasukkan HTML, CSS, JavaScript yang dapat dijalankan, skrip sementara, atau kode percobaan ke dalamnya. Website tetap berjalan dari berkas penerapan yang sudah ada.

Master menjelaskan penerapan dan keputusan yang disetujui; Master tidak menggantikan kode penerapan.

## Dua Lapisan yang Saling Terhubung

1. **CETAK BIRU MASTER** — folder ini: keputusan bisnis, definisi layanan, peta sistem, aturan komponen, hubungan halaman, status, dan catatan perubahan.
2. **PENERAPAN WEBSITE** — HTML, CSS, JavaScript, data, dan aset yang benar-benar menjalankan website.

Sebuah komponen belum dianggap selaras hanya karena dokumentasinya tersedia. Ketika perubahan penerapan disetujui, catatan Master yang terkait harus diperbarui dalam rangkaian perubahan yang sama.

## Kosakata Status

### Status Keputusan
- **PEMBAHASAN** — sedang dijajaki; belum menjadi keputusan.
- **USULAN** — rekomendasi yang menunggu pembahasan atau persetujuan.
- **DISETUJUI** — diterima secara jelas untuk versi Master saat ini.
- **PERLU VALIDASI** — disetujui sementara, tetapi masih perlu pemeriksaan atau pengujian.
- **DIREVISI** — digantikan keputusan baru; riwayat sebelumnya tetap disimpan.
- **DITOLAK** — telah dipertimbangkan dan tidak digunakan.
- **IDE MASA DEPAN** — konsep awal yang belum menjadi layanan aktif atau komitmen kerja.

### Status Penerapan
- **SUDAH DITERAPKAN** — penerapan yang dirujuk tersedia di repository.
- **SEBAGIAN** — sebagian bagian tersedia, tetapi aturan atau perilaku komponen belum lengkap.
- **TERSEDIA — PERLU PERIKSA PENGGUNAAN** — berkas tersedia, tetapi pemanggil aktif dan penggunaan saat berjalan belum dipastikan.
- **PENGECUALIAN** — perilaku pada halaman atau kelompok halaman tertentu memang sengaja berbeda.
- **DIARSIPKAN** — disimpan untuk sejarah/referensi dan tidak dianggap sebagai penerapan aktif.
- **BELUM DITETAPKAN** — belum ditemukan penerapan bersama atau aturan yang disetujui.

Jangan menyimpulkan suatu hal telah disetujui hanya karena kodenya tersedia atau halamannya sudah tayang.

## Aturan Perubahan dan Perlindungan

- Keputusan produk dan desain memerlukan persetujuan yang jelas sebelum dicatat sebagai keputusan final.
- Tambahkan informasi secara bertahap; jangan memaksa tim mengikuti tahapan kaku.
- Simpan setiap keputusan pada dokumen yang membahas topik tersebut.
- Tandai gagasan yang belum selesai dan pisahkan dari layanan aktif.
- Catat perubahan penting, alasan, tanggal, dan status persetujuannya.
- Jika penerapan berbeda dari Master, catat perbedaannya dan bahas.
- Jangan mengubah penerapan website selama pembahasan Master tanpa izin terpisah dan jelas.

## Hubungan dengan Dokumentasi Proyek Lain

Folder ini melengkapi, bukan menggantikan:
- `ARCHITECTURE.md` — batas arsitektur teknis.
- `SOP.md` — prosedur perubahan repository.
- `ROADMAP.md` — peta jalan penerapan dan rilis.
- `HANDOFF.md` — serah terima kerja dan status rilis yang telah diperiksa.
- `TEMPLATE-REGISTRY.md` — daftar pola halaman dan komponen bersama.
- `TEMPLATE-PLAYBOOK.md` — cara merancang dan menggunakan kembali pola halaman.
- `docs/architecture/REPOSITORY_MAP.md` — peta berkas dan ketergantungan.
- `AUDIT.md` — temuan audit terdahulu.
- `content/ROUTE_MASTER_MAPPING.md` — pemetaan alamat halaman.
- `content/bali-master-data.json` — data induk destinasi.

Daftar Pekerjaan menjadi daftar lintas topik untuk pembahasan dan dokumentasi yang belum selesai. Dokumen ini melengkapi peta jalan penerapan; bukan penggantinya.

## Urutan Membaca

1. `START-HERE.md` — protokol sesi dan posisi pembahasan.
2. `MASTER-CATALOG.md` — indeks dokumen dan kebutuhan dokumentasi.
3. `PRODUCT-FOUNDATION.md` — konteks bisnis dan pelanggan yang relevan.
4. `SERVICE-MASTER.md` — susunan layanan saat ini.
5. `FUTURE-IDEAS.md` — konsep yang ditunda, jika relevan.
6. `WORK-REGISTER.md` — pekerjaan yang belum selesai dan tindak lanjut.
7. `00-SYSTEM-MAP.md`
8. `01-GLOBAL-COMPONENTS.md`
9. `02-PAGE-MODULES.md`
10. `03-TECHNICAL-MODULES.md`
11. `04-STATUS-REGISTER.md`
12. Dokumen terperinci yang relevan di dalam `GLOBAL/` atau `SHARED/`.

---

**Catatan:** Nama berkas dan istilah teknis tertentu dipertahankan dalam bahasa Inggris agar sesuai dengan struktur kode. Penjelasan dan isi dokumentasi Master menggunakan bahasa Indonesia.
