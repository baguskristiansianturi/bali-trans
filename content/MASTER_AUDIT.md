# Bali Trans — Master Content Audit

**Version:** 1.0  
**Updated:** 18 October 2026  
**Source of truth:** `content/bali-master-data.json`

## Scope and honesty rule

This is the initial canonical inventory for building the destination website. It covers six editorial regions, all nine Bali administrative regencies/city, an initial destination list, and cross-region activity categories. It is **not** a claim that every destination, business, operator, price, schedule, or access condition has been verified. Any record without source URLs remains unverified and must not be presented as fact-checked.

## How to use the master data

- Every destination has one stable `id`. Do not create duplicate destination records just because the same place appears under multiple categories or regions.
- Keep `region_id` (editorial navigation) separate from `admin_area_id` (official administrative area).
- Use `categories` to cross-link one destination from relevant activity listings.
- `route` is the current query-based SPA route when a dedicated route is already present. Null means a dedicated route still needs to be built.
- `page_status`, `content_status`, and `fact_status` are separate. A page can exist while its facts remain unverified.
- Populate `source_urls` and `last_checked` after checking reliable primary/official sources. Do not mark an item `PUBLISHED` without a recorded review.
- In UI cards, show **“Baca selengkapnya”** only when the article is ready and reviewed. If a page exists but the article is incomplete, show **“Sedang diperbarui”**.

## Editorial region map

| ID | Region | Administrative coverage (editorial grouping only) | Subregion examples |
|---|---|---|---|
| `south` | Bali Selatan | Badung, Denpasar | Kuta, Legian, Seminyak, Kerobokan, Canggu, Berawa, Pererenan, Jimbaran, Uluwatu, Nusa Dua, Tanjung Benoa, Sanur, Serangan |
| `central` | Bali Tengah | Gianyar, Bangli, parts of Tabanan highlands | Ubud, Tegallalang, Tampaksiring, Sukawati, Kintamani, Penglipuran, Bedugul, Jatiluwih |
| `east` | Bali Timur | Karangasem, mainland Klungkung | Amed, Tulamben, Candidasa, Padangbai, Sidemen, Besakih, Lempuyang, Tirta Gangga |
| `north` | Bali Utara | Buleleng | Lovina, Singaraja, Banjar, Munduk, Gitgit, Sekumpul, Pemuteran, Tejakula |
| `west` | Bali Barat | Jembrana and relevant West Bali National Park access areas | Medewi, Negara, Perancak, Rambut Siwi, Gilimanuk |
| `nusa` | Kepulauan Nusa | Klungkung | Nusa Penida, Nusa Lembongan, Nusa Ceningan |

These are navigation groupings, not legal boundaries. Menjangan/West Bali National Park, Denpasar, and some highland/coastal places need especially careful boundary assignment.

## Destination coverage

The JSON file is the detailed inventory. It includes candidate entries for South, Central, East, North, West, and Nusa Islands, plus activity tags for cross-linking. Entries with existing North Bali query routes are marked `STRUCTURE_READY` and `CONTENT_DRAFT`; that does not mean their article text is ready to publish.

## Cross-region activity index

The initial categories are:
- Water sports
- Snorkelling and diving
- Surfing
- Boat and island trips
- Culture and temples
- Nature and waterfalls
- Trekking and hiking
- Rafting and ATV
- Dolphin watching
- Wildlife and family attractions
- Cycling
- Food and drink
- Wellness
- Private transport

Categories must filter/refer to destination IDs, not create parallel copies of the same place. Operator-level listings are a separate next phase and must be added only after their names, location, active status, contact details, service, and source have been verified.

## Verification checklist

- [ ] Confirm region/subregion assignments against authoritative geographic references.
- [ ] Check every destination spelling and exact administrative area.
- [ ] Add source URLs and a checked date to every destination before factual publication.
- [ ] Review opening/access rules, visitor restrictions, safety notes, transport and seasonal/sea conditions where relevant.
- [ ] Check each image source and usage rights; do not assume an illustrative image is a photo of the named place.
- [ ] Match each record to the current website route and avoid dead links.
- [ ] Audit article readiness and card labels.
- [ ] Build a separate verified operator register; do not infer operator availability from a destination record.
- [ ] Run mobile checks on horizontal region cards, activity filters, page transitions, and article links.

## Status vocabulary

- `PLANNED`: not built yet.
- `STRUCTURE_READY`: page structure exists; content still needs review.
- `CONTENT_DRAFT`: initial content exists but is not approved for publication.
- `FACT_CHECK`: factual review is in progress.
- `PUBLISHED`: content has passed review and is approved for display.
- `UPDATE_REQUIRED`: existing content needs correction.
- `UNVERIFIED`: facts are not yet checked.

## Next work sequence

1. Verify the region/subregion taxonomy and canonical destinations.
2. Complete one destination group at a time, starting with North Bali pages already present.
3. Add missing destination pages and consistent article/card status behavior.
4. Research operators as separate records only after destinations and categories are stable.
5. Update this master data whenever a page is created, corrected, fact-checked, or published.

## First source-check batch — North Bali

On 18 October 2026, the first source-check batch added source links and notes for Lovina, Banjar Hot Springs, Brahmavihara-Arama, Gitgit Waterfall, Munduk, Wanagiri, Menjangan, and Gedong Kirtya. Six additional candidate records were added: Banyumala Waterfall, Lake Tamblingan, Lake Buyan, Melanting Waterfall, Singsing Waterfall, and Kroya Waterfall.

Sources prioritized for this batch:
- Visit North Bali, the Buleleng Regency tourism portal: https://visitnorthbali.bulelengkab.go.id/
- Buleleng's official tourism-attraction inventory (2025 PDF): https://visitnorthbali.bulelengkab.go.id/uploads/konten/bank-data_daftar-nama-daya-tarik-wisata-kabupaten-buleleng_20251008_095505.pdf
- Indonesia Travel destination pages for Lovina and Menjangan: https://www.indonesia.travel/id/id/destination/bali-nusa-tenggara/bali/bali---lovina-beach and https://www.indonesia.travel/id/en/destination/bali-nusa-tenggara/bali/bali---menjangan-island
- Official Brahmavihara-Arama site: https://www.brahmaviharaarama.org/en
- Buleleng Culture and Tourism Office page for Gedong Kirtya: https://disbudpar.bulelengkab.go.id/informasi/detail/artikel/gedong-kirtya-87
- Visit Bali national-parks overview: https://www.visitbali.org/about-bali/national-parks/

This batch confirms basic identity/location for several candidates, not current operating hours, entry fees, operator conduct, transport schedules, trail conditions, or current availability. Those details remain out of scope until checked individually. Menjangan's editorial-region placement and the exact scope of the combined Munduk/Wanagiri page remain explicit taxonomy decisions to resolve.

## Business and domain context

The target public domain is **BDMTrans.com**, planned before December 2026. The project is BDM Trans's own travel website. The destination and activity structure should support BDM Trans's regions, destination guides, activities, itineraries/packages, and transport services; it is not a third-party operator directory. See `content/BDMTRANSDOM_LAUNCH_PLAN.md` for the launch checklist and technical preparation.
