# Master Destinasi Bali — Inventaris Referensi

| Keterangan | Catatan |
|---|---|
| ID Dokumen | DM-001 |
| Status | INVENTARIS AWAL — PERLU PENINJAUAN BERSAMA |
| Tanggal pencatatan | 2026-11-01 |
| Sumber inventaris | [Sitemap Bali Golden Tour](https://www.baligoldentour.com/sitemap.php) |
| Cakupan | Hanya destinasi yang tercantum pada bagian Places of Interest di sumber tersebut |
| Tujuan | Menyediakan data dasar destinasi dan pengelompokan untuk pembahasan produk serta konten BDM Trans |

> Dokumen ini adalah bahan dasar data bisnis dan konten. Dokumen ini bukan rancangan halaman, desain, breadcrumb visual, alamat URL final, atau spesifikasi teknis website.

## 1. Tujuan dan Batas Inventaris

Inventaris ini mengambil nama tempat dari bagian **Places of Interest to Visit in Bali Islands** pada sitemap Bali Golden Tour. Sumber tersebut dipakai sebagai daftar kurasi awal karena mencantumkan destinasi yang dipilih oleh penyedia wisata lokal tersebut.

- Tidak menambahkan tempat wisata dari sumber lain.
- Tidak menganggap daftar ini sebagai seluruh destinasi yang ada di Bali.
- Tidak menyalin deskripsi promosi, foto, atau materi pemasaran sumber.
- Nama destinasi dipertahankan sedekat mungkin dengan penamaan sumber agar dapat ditelusuri.
- Pengelompokan kabupaten/kota pada sitemap hanya dipakai untuk membantu pemeriksaan lokasi. Kabupaten/kota bukan kategori destinasi BDM Trans.
- Pengelompokan wilayah BDM Trans dibuat luas dan mudah dipahami wisatawan.
- Jika penempatan wilayah atau nama sumber tampak keliru, tandai untuk pemeriksaan; jangan mengubah fakta sumber secara diam-diam.

## 2. Aturan Fungsi Data Destinasi

### 2.1 Identitas dan pengelompokan baku

Setiap destinasi merupakan satu entri tersendiri dan sekurang-kurangnya memiliki:

1. **Nama destinasi** — nama tempat yang menjadi identitas entri.
2. **Kategori utama** — jenis dasar tempat, misalnya Beach, Temple, Waterfall, Lake, Village, atau Rice Terrace.
3. **Wilayah** — kawasan geografis luas, misalnya Bali Selatan, Bali Timur, Bali Utara, Bali Barat, atau Bali Tengah. Destinasi kepulauan dapat menggunakan nama kawasan kepulauannya, misalnya Nusa Penida atau Nusa Lembongan.
4. **Label karakteristik tambahan** — satu atau lebih sifat/tema yang relevan, misalnya Nature, Culture, Viewpoint, Highland, Rice Field, atau Spiritual. Label tambahan tidak wajib dan perlu dibahas berdasarkan data destinasi.
5. **Catatan lokasi** — kabupaten/kota, desa, alamat, akses, atau koordinat dapat disimpan sebagai informasi pendukung, bukan sebagai kategori utama.

### 2.2 Kategori berbeda dari wilayah

- **Kategori menjawab: tempat ini jenisnya apa?** Contoh: Kuta Beach = Beach.
- **Wilayah menjawab: tempat ini berada di kawasan Bali yang mana?** Contoh: Kuta Beach = Bali Selatan.
- Kabupaten seperti Badung dapat disebut dalam uraian lokasi atau data pendukung, tetapi tidak perlu dijadikan kategori utama.
- Satu destinasi dapat memiliki beberapa label karakteristik tambahan, tetapi tetap memiliki satu identitas destinasi yang sama.

### 2.3 Penanda kurasi berbeda dari label baku

Penanda seperti **Popular Destination** merupakan status kurasi untuk memilih destinasi yang ingin ditonjolkan pada kanal atau kumpulan tertentu.

- Penanda ini bukan kategori jenis destinasi.
- Penanda ini bukan wilayah.
- Penanda ini tidak otomatis diberikan hanya karena tempat tercantum di Bali Golden Tour.
- Penanda ini tidak perlu diperlakukan sebagai label identitas permanen pada uraian destinasi.
- Status kurasi dapat berubah tanpa mengubah kategori dan wilayah destinasi.

### 2.4 Satu destinasi, banyak hubungan

Satu entri destinasi dapat:
- memiliki beberapa label karakteristik;
- dipilih sebagai destinasi populer atau tidak;
- muncul sebagai bagian dari lebih dari satu rencana perjalanan atau paket;
- tetap menjadi satu data yang sama, tidak digandakan hanya karena muncul di beberapa kelompok.

### 2.5 Informasi yang belum tersedia

Jangan mengarang alamat rinci, koordinat, akses, jam operasional, biaya tiket, fasilitas, status buka, atau informasi terbaru. Tandai sebagai **BELUM DICATAT** atau **PERLU VALIDASI** sampai datanya diperiksa.

## 3. Daftar Kategori Utama yang Ditemukan

Kategori di bawah merupakan pengelompokan awal dari jenis tempat yang tercantum di sumber. Ini bukan daftar kategori final yang tidak dapat berubah.

| Kategori awal | Makna penggunaan |
|---|---|
| Beach | Pantai |
| Temple | Pura/tempat ibadah |
| Waterfall | Air terjun |
| Rice Terrace | Terasering atau kawasan persawahan |
| Village | Desa atau kawasan permukiman tradisional |
| Forest | Hutan atau kawasan pepohonan |
| Cliff | Tebing |
| Hill / Viewpoint | Bukit atau titik pandang |
| Lake | Danau |
| Garden / Park | Kebun, taman, atau kawasan rekreasi hijau |
| Market | Pasar |
| Museum | Museum |
| Vihara | Tempat ibadah Buddha |
| Monument | Monumen |
| Palace / Water Palace | Istana atau taman air bersejarah |
| Hot Spring | Pemandian air panas |
| Gate / Landmark | Gerbang atau penanda lokasi |
| National Park | Taman nasional |
| Mangrove | Kawasan hutan mangrove |
| Bridge | Jembatan |
| Farm / Plantation | Perkebunan atau tempat budidaya |
| Other / Review | Tempat yang jenis utamanya belum jelas dan perlu ditinjau |

Jika satu tempat memiliki lebih dari satu karakteristik, kategori utama dipilih berdasarkan identitas utamanya; karakteristik lain dapat menjadi label tambahan. Hindari membuat kategori yang terlalu kecil tanpa kebutuhan nyata.

## 4. Inventaris Destinasi dari Bali Golden Tour

**Cara membaca tabel:**
- Kolom “Kelompok pada sumber” hanya menunjukkan bagian kabupaten/kota tempat sumber menaruh tautan; ini bukan kategori BDM Trans.
- Kolom “Kategori BDM — awal” dan “Wilayah BDM — awal” adalah pengelompokan kerja awal untuk ditinjau.
- Penempatan wilayah masih berstatus awal apabila perlu pemeriksaan lebih rinci.
- Nama berulang atau ejaan yang tidak konsisten pada sumber ditandai, bukan diam-diam dihapus.

### 4.1 Badung

| Nama pada sumber | Kategori BDM — awal | Wilayah BDM — awal | Catatan |
|---|---|---|---|
| Uluwatu Temple | Temple | Bali Selatan | — |
| Taman Ayun Temple | Temple | Bali Selatan | — |
| Kuta Beach | Beach | Bali Selatan | — |
| Dream Land Beach | Beach | Bali Selatan | Nama sumber dipertahankan |
| Garuda Wisnu Kencana | Landmark / Cultural Park | Bali Selatan | — |
| Sangeh Monkey Forest | Forest | Bali Tengah | Perlu tinjau batas kawasan; berada di bagian utara Badung |
| Jimbaran Bay Beach | Beach | Bali Selatan | — |
| Padang Padang Beach | Beach | Bali Selatan | — |
| Nungnung Waterfall | Waterfall | Bali Tengah | — |
| Pandawa Beach | Beach | Bali Selatan | — |
| Tanah Barak Cliff | Cliff | Bali Selatan | — |
| Beji Griya Waterfall | Waterfall | Bali Selatan | — |

### 4.2 Tabanan

| Nama pada sumber | Kategori BDM — awal | Wilayah BDM — awal | Catatan |
|---|---|---|---|
| Tanah Lot Temple | Temple | Bali Selatan | Kawasan pesisir barat daya; wilayah perlu konsistensi dengan pembagian regional yang dipilih |
| Ulun Danu Beratan Temple | Temple | Bali Tengah | — |
| Alas Kedaton Temple | Temple | Bali Tengah | — |
| Batukaru Temple | Temple | Bali Tengah | — |
| Jatiluwih Rice Terrace | Rice Terrace | Bali Tengah | — |
| Candi Kuning Market | Market | Bali Tengah | — |
| Subak Museum | Museum | Bali Tengah | — |
| Bedugul Botanical Garden | Garden / Park | Bali Tengah | — |
| Pupuan Rice Terrace | Rice Terrace | Bali Barat | — |
| Soka Beach | Beach | Bali Barat | — |
| Dharma Giri Vihara | Vihara | Bali Barat | — |
| Leke Leke Waterfall | Waterfall | Bali Tengah | — |
| Blemantung Waterfall | Waterfall | Bali Barat | Ejaan sumber: “Blemantung” |

### 4.3 Bangli

| Nama pada sumber | Kategori BDM — awal | Wilayah BDM — awal | Catatan |
|---|---|---|---|
| Kintamani Village | Village | Bali Tengah | — |
| Penglipuran Village | Village | Bali Tengah | Muncul dua kali pada sitemap; dicatat satu kali sebagai satu destinasi |
| Tukad Cepung Waterfall | Waterfall | Bali Tengah | — |
| Kehen Temple | Temple | Bali Tengah | — |
| Batur Temple | Temple | Bali Tengah | — |
| Tibumana Waterfall | Waterfall | Bali Tengah | — |
| Jati Batur Temple | Temple | Bali Tengah | Nama sumber perlu diperiksa |
| Goa Raja Waterfall | Waterfall | Bali Tengah | — |
| Grudugan Waterfall | Waterfall | Bali Tengah | Ejaan sumber dipertahankan |
| Yeh Bulan Waterfall | Waterfall | Bali Tengah | — |
| Bamboo Forest Penglipuran | Forest | Bali Tengah | — |

### 4.4 Karangasem

| Nama pada sumber | Kategori BDM — awal | Wilayah BDM — awal | Catatan |
|---|---|---|---|
| Bukit Jambul Rice Terrace | Rice Terrace / Viewpoint | Bali Timur | — |
| Besakih Temple | Temple | Bali Timur | — |
| Tirta Gangga Water Palace | Palace / Water Palace | Bali Timur | — |
| Ujung Water Palace | Palace / Water Palace | Bali Timur | — |
| Tenganan Village | Village | Bali Timur | — |
| Lempuyang Temple | Temple | Bali Timur | — |
| Blue Lagoon Beach | Beach | Bali Timur | — |
| Gembleng Waterfall | Waterfall | Bali Timur | — |
| Gumang Temple | Temple | Bali Timur | — |
| Virgin Beach | Beach | Bali Timur | — |
| Sang Hyang Ambu Gate | Gate / Landmark | Bali Timur | — |
| Lahangan Sweet | Viewpoint | Bali Timur | — |
| Berina Rice Terrace | Rice Terrace | Bali Timur | — |
| Savana Tianyar | Savanna / Nature | Bali Timur | — |
| Maha Gangga Valley | Valley / Nature | Bali Timur | — |
| Candidasa Beach | Beach | Bali Timur | — |
| Labuhan Amuk Beach | Beach | Bali Timur | — |
| Jemeluk Beach Amed | Beach | Bali Timur | — |
| Lipah Beach Amed | Beach | Bali Timur | — |
| Amed Beach | Beach | Bali Timur | — |

### 4.5 Gianyar

| Nama pada sumber | Kategori BDM — awal | Wilayah BDM — awal | Catatan |
|---|---|---|---|
| Ubud Monkey Forest | Forest | Bali Tengah | — |
| Tegalalang Rice Terrace | Rice Terrace | Bali Tengah | — |
| Tirta Empul Temple | Temple | Bali Tengah | — |
| Batuan Temple | Temple | Bali Tengah | — |
| Batuan Village | Village | Bali Tengah | — |
| Ubud Royal Palace | Palace | Bali Tengah | — |
| Goa Gajah Temple | Temple | Bali Tengah | — |
| Gunung Kawi Temple | Temple | Bali Tengah | — |
| Mas Village | Village | Bali Tengah | — |
| Celuk Village | Village | Bali Tengah | — |
| Tohpati Village | Village | Bali Tengah | — |
| Ubud Art Market | Market | Bali Tengah | — |
| Coffee Plantation | Farm / Plantation | Bali Tengah | Nama umum pada sumber; lokasi spesifik belum disebut |
| Tegenungan Waterfall | Waterfall | Bali Tengah | — |
| Kanto Lampo Waterfall | Waterfall | Bali Tengah | — |
| Saraswati Temple | Temple | Bali Tengah | — |
| Sumampan Waterfall | Waterfall | Bali Tengah | — |
| Suwat Waterfall | Waterfall | Bali Tengah | Sumber menampilkan tautan dengan nama sebelumnya berulang; entri dipertahankan satu kali |
| Poh Gading Waterfall | Waterfall | Bali Tengah | — |

### 4.6 Klungkung dan kawasan kepulauan

| Nama pada sumber | Kategori BDM — awal | Wilayah BDM — awal | Catatan |
|---|---|---|---|
| Goa Lawah Temple | Temple | Bali Timur | Klungkung daratan |
| Kerta Gosa | Heritage Landmark / Palace | Bali Timur | — |
| Angel Billabong | Natural Pool / Coastal Landmark | Nusa Penida | — |
| Broken Beach | Coastal Landmark | Nusa Penida | — |
| Kelingking Beach | Beach | Nusa Penida | — |
| Paluang Cliff | Cliff | Nusa Penida | — |
| Crystal Bay Beach | Beach | Nusa Penida | — |
| Atuh Beach | Beach | Nusa Penida | — |
| Diamond Beach | Beach | Nusa Penida | — |
| Tree House Molenteng | Viewpoint / Landmark | Nusa Penida | — |
| Teletubbies Hill | Hill / Viewpoint | Nusa Penida | — |
| Mangrove Forest | Mangrove | Nusa Lembongan | Nama sumber tidak menyebut nama tempat yang lebih spesifik |
| Yellow Bridge | Bridge | Nusa Lembongan | — |
| Devil's Tears | Coastal Landmark | Nusa Lembongan | — |
| Dream Beach Lembongan | Beach | Nusa Lembongan | — |
| Seaweed Farm Lembongan | Farm / Plantation | Nusa Lembongan | — |
| Bali Banah Cliff Point | Cliff / Viewpoint | Nusa Penida | Nama sumber dipertahankan |
| Tembeling Beach and Pool | Beach / Natural Pool | Nusa Penida | — |
| Goa Giri Putri Temple | Temple | Nusa Penida | — |

### 4.7 Buleleng

| Nama pada sumber | Kategori BDM — awal | Wilayah BDM — awal | Catatan |
|---|---|---|---|
| Handara Gate | Gate / Landmark | Bali Tengah | Kawasan Bedugul; perlu konsistensi batas wilayah |
| Wanagiri Hidden Hill | Hill / Viewpoint | Bali Tengah | Kawasan dataran tinggi |
| Banjar Hot Water Spring | Hot Spring | Bali Utara | — |
| Brahma Vihara Arama | Vihara | Bali Utara | — |
| Lovina Beach | Beach | Bali Utara | — |
| Git Git Waterfall | Waterfall | Bali Utara | — |
| Banyumala Waterfall | Waterfall | Bali Utara | — |
| Tamblingan Lake | Lake | Bali Utara | — |
| Les Waterfall | Waterfall | Bali Utara | — |
| Jembong Waterfall | Waterfall | Bali Utara | — |
| Colek Pamor Waterfall | Waterfall | Bali Utara | — |
| Mekalangan Waterfall | Waterfall | Bali Utara | — |
| Campuhan Waterfall | Waterfall | Bali Utara | — |
| Multi Tier Waterfall | Waterfall | Bali Utara | Nama umum pada sumber; identitas spesifik perlu diperiksa |
| Aling - Aling Waterfall | Waterfall | Bali Utara | Ejaan sumber dipertahankan |
| Kroya Waterfall | Waterfall | Bali Utara | — |
| Sekumpul Waterfall | Waterfall | Bali Utara | — |
| Munduk Waterfall | Waterfall | Bali Utara | — |
| Red Wall Waterfall | Waterfall | Bali Utara | — |
| Fiji Waterfall | Waterfall | Bali Utara | — |
| Pucak Manik Waterfall | Waterfall | Bali Utara | — |
| Beji Temple Sangsit | Temple | Bali Utara | — |

### 4.8 Denpasar

| Nama pada sumber | Kategori BDM — awal | Wilayah BDM — awal | Catatan |
|---|---|---|---|
| Bajra Sandhi Monument | Monument | Bali Selatan | — |
| Jagat Natha Temple | Temple | Bali Selatan | — |
| Badung Market | Market | Bali Selatan | — |
| Bali Museum | Museum | Bali Selatan | — |

### 4.9 Jembrana

| Nama pada sumber | Kategori BDM — awal | Wilayah BDM — awal | Catatan |
|---|---|---|---|
| Medewi Beach | Beach | Bali Barat | — |
| West Bali National Park | National Park | Bali Barat | — |
| Rambut Siwi Temple | Temple | Bali Barat | — |
| Bunut Bolong | Natural Landmark / Tree | Bali Barat | — |

## 5. Catatan Pemeriksaan dan Hal yang Perlu Ditinjau

1. **Sumber mengelompokkan berdasarkan kabupaten/kota.** BDM Trans menggunakan wilayah wisata yang lebih luas. Jangan membawa nama kabupaten menjadi kategori utama.
2. **Klungkung mencakup daratan dan pulau.** Goa Lawah dan Kerta Gosa ditempatkan pada Bali Timur; tempat-tempat yang berada di Nusa Penida atau Nusa Lembongan dikelompokkan menurut kawasan kepulauannya, bukan dipaksakan ke Bali Selatan atau Bali Timur.
3. **Kawasan Bedugul berada di dataran tinggi perbatasan administratif.** Handara Gate dan Wanagiri Hidden Hill perlu diputuskan konsisten apakah masuk Bali Tengah atau Bali Utara dalam kamus wilayah akhir.
4. **Batas Bali Tengah, Selatan, dan Barat perlu disepakati sebagai pengelompokan wisata, bukan pembagian administratif resmi.** Penempatan awal di tabel dapat diperbaiki tanpa mengubah nama destinasi.
5. **Nama generik atau meragukan** seperti Coffee Plantation, Multi Tier Waterfall, Jati Batur Temple, dan beberapa ejaan sumber perlu ditelusuri pada tautan sumber sebelum dianggap sebagai identitas final.
6. **Kategori awal bisa lebih dari satu jika memang sesuai.** Contoh: Tembeling Beach and Pool dapat memiliki Beach sebagai kategori utama dan Natural Pool sebagai label tambahan.
7. **Destinasi populer belum ditetapkan.** Tidak ada status Popular Destination yang otomatis diberikan dalam inventaris ini. Penentuan kurasi dilakukan terpisah.
8. **Data paket perjalanan belum dipetakan ke destinasi satu per satu.** Hubungan destinasi dengan paket merupakan pekerjaan data tersendiri setelah inventaris dan kategori disetujui.

## 6. Aturan Pemeliharaan

- Satu tempat hanya memiliki satu entri induk, meskipun muncul di beberapa paket atau kelompok.
- Simpan nama asli sumber dan nama baku yang dipilih jika nanti ada koreksi ejaan.
- Simpan sumber rujukan dan tanggal pemeriksaan untuk setiap perubahan penting.
- Pisahkan fakta lokasi dari kategori, wilayah, label karakteristik, dan status kurasi.
- Jika ada usulan kategori atau wilayah baru, jelaskan alasan dan dampaknya kepada Mas Bagus sebelum menjadikannya aturan baku.
- Jangan menambahkan destinasi baru dari luar sumber acuan selama tahap inventaris referensi Bali Golden Tour ini, kecuali Mas Bagus secara terpisah mengubah batas sumber.
- Perubahan inventaris tidak otomatis mengizinkan perubahan website.

## 7. Sumber Acuan

- [Sitemap resmi Bali Golden Tour — Places of Interest](https://www.baligoldentour.com/sitemap.php)
- Bagian yang digunakan: **Places of Interest to Visit in Bali Islands**, termasuk daftar Badung, Tabanan, Bangli, Karangasem, Gianyar, Klungkung, Buleleng, Denpasar, dan Jembrana.
- Tanggal pemeriksaan sumber: 2026-11-01.

## 8. Riwayat Perubahan

| Tanggal | Perubahan | Status |
|---|---|---|
| 2026-11-01 | Membuat aturan fungsi data destinasi dan inventaris awal seluruh entri Places of Interest dari sitemap Bali Golden Tour; menambahkan pengelompokan kategori dan wilayah awal serta catatan yang perlu ditinjau | INVENTARIS AWAL — PERLU PENINJAUAN BERSAMA |
