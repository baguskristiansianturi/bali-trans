function renderRelatedBlogGuides(blog) {
            const relatedIds = Array.isArray(blog.related) ? blog.related : [];
            const related = relatedIds.map(id => BALI_BLOGS.find(item => item.id === id)).filter(Boolean);
            if (!related.length) return '';
            const escapeHtml = value => String(value || '').replace(/[&<>"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[character]));
            return '<section class="mt-10" aria-labelledby="related-guides-title"><h2 id="related-guides-title" class="text-xl font-extrabold text-slate-900 mb-4">Lanjutkan menjelajahi Bali</h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-3">' + related.map(item => '<a href="?page=blog-read&amp;item=' + encodeURIComponent(item.id) + '" class="group rounded-2xl border border-slate-200 bg-white p-4 hover:border-teal-300 hover:bg-teal-50/30 transition"><span class="block text-[10px] font-extrabold uppercase tracking-wider text-teal-700 mb-2">' + escapeHtml(item.location || item.category) + '</span><span class="block font-bold text-slate-900 leading-snug group-hover:text-teal-800">' + escapeHtml(item.title) + '</span><span class="mt-2 block text-xs text-slate-500">' + escapeHtml(item.readTime) + ' · Baca panduan <span aria-hidden="true">→</span></span></a>').join('') + '</div></section>';
        }

        function renderArticleSources(sources) {
            if (!Array.isArray(sources) || !sources.length) return '';
            const escapeText = value => String(value || '').replace(/[&<>"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[character]));
            return '<section aria-labelledby="article-sources-title" class="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"><h2 id="article-sources-title" class="text-lg font-extrabold text-slate-900 mb-3">Sources & further reading</h2><ul class="list-disc pl-5 space-y-2 text-sm text-slate-700">' + sources.map(source => '<li><a href="' + escapeText(source.url) + '" target="_blank" rel="noopener noreferrer" class="font-semibold text-teal-700 underline underline-offset-2">' + escapeText(source.title) + '</a></li>').join('') + '</ul><p class="text-xs text-slate-500 leading-5 mt-4">Requirements, access, transport and local conditions may change. Check the latest official guidance before travelling.</p></section>';
        }
/* VIEW 4: BLOG & GUIDES PAGE */
        function renderBlogListView() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div class="text-center max-w-2xl mx-auto mb-10">
                        <span class="text-xs font-extrabold text-bali-orange uppercase tracking-wider">Bali Travel Guides & Tips</span>
                        <h1 class="text-3xl font-extrabold text-slate-900 mt-1">Plan Your Dream Trip to Bali</h1>
                        <p class="text-slate-500 text-sm mt-2">Practical guides for choosing areas, planning routes and enjoying your time in Bali.</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        ${BALI_BLOGS.map(blog => `
                            <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                                <img src="${blog.image}" alt="${(blog.imageAlt || blog.title).replace(/&/g, '&amp;').replace(/"/g, '&quot;')}" class="w-full h-48 object-cover" loading="lazy" width="800" height="600">
                                <div class="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div class="flex items-center gap-2 text-[10px] font-bold text-slate-400 mb-2">
                                            <span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">${blog.region || blog.category}</span>
                                            ${blog.location ? `<span class="text-slate-500">${blog.location}</span>` : ""}
                                            <span>•</span>
                                            <span>${blog.readTime}</span>
                                        </div>
                                        <h3 class="font-extrabold text-slate-900 text-base leading-snug mb-2 hover:text-bali-orange cursor-pointer" onclick="navigateTo('blog-read', '${blog.id}')">${blog.title}</h3>
                                        <p class="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">${blog.snippet}</p>
                                    </div>
                                    <button onclick="navigateTo('blog-read', '${blog.id}')" class="text-xs font-extrabold text-bali-orange hover:underline self-start">
                                        Read Full Guide →
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        /* VIEW 5: BLOG READ DETAIL */
        function renderBlogDetailView(blog) {
            const escapeHtml = value => String(value || '').replace(/[&<>"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[character]));
            const rawContent = String(blog.content || '');
            const headings = [...rawContent.matchAll(/<h2\\b[^>]*>([\\s\\S]*?)<\\/h2>/gi)].map(match => ({
                text: match[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim()
            }));
            const headingIds = new Map();
            const articleContent = rawContent.replace(/<h2\\b([^>]*)>([\\s\\S]*?)<\\/h2>/gi, (match, attrs, inner) => {
                const label = inner.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim();
                const base = label.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'bagian-artikel';
                const count = (headingIds.get(base) || 0) + 1;
                headingIds.set(base, count);
                const id = count > 1 ? base + '-' + count : base;
                return '<h2 id="' + id + '">' + inner + '</h2>';
            });
            const toc = [...articleContent.matchAll(/<h2\\b[^>]*id="([^"]+)"[^>]*>([\\s\\S]*?)<\\/h2>/gi)].map(match => ({
                id: match[1], text: match[2].replace(/<[^>]*>/g, '').trim()
            }));
            const tocMarkup = toc.length >= 5 ? '<nav class="article-toc" aria-label="Daftar isi"><p class="article-toc-title">Dalam panduan ini</p><ol>' + toc.map(item => '<li><a href="#' + escapeHtml(item.id) + '">' + escapeHtml(item.text) + '</a></li>').join('') + '</ol></nav>' : '';
            const mobileToc = toc.length >= 5 ? '<details class="article-toc-mobile"><summary>Daftar isi artikel <span aria-hidden="true">＋</span></summary><ol>' + toc.map(item => '<li><a href="#' + escapeHtml(item.id) + '">' + escapeHtml(item.text) + '</a></li>').join('') + '</ol></details>' : '';
            const featured = '<figure class="article-featured"><img src="' + escapeHtml(blog.image) + '" alt="' + escapeHtml(blog.imageAlt || blog.title) + '" loading="' + escapeHtml(blog.imageLoading || 'lazy') + '" fetchpriority="' + (blog.imageLoading === 'eager' ? 'high' : 'auto') + '" width="1200" height="675"><figcaption>' + escapeHtml(blog.imageAlt || blog.title) + '</figcaption></figure>';
            return `
                <article lang="${blog.lang || 'id'}" class="article-detail-page">
                    <div class="article-detail-shell">
                        <nav class="article-breadcrumb" aria-label="Breadcrumb">
                            <a href="#" onclick="navigateTo('home');return false">Beranda</a><span aria-hidden="true">/</span>
                            <a href="#" onclick="navigateTo('blog');return false">Travel Guides</a><span aria-hidden="true">/</span>
                            <span aria-current="page">${escapeHtml(blog.title)}</span>
                        </nav>
                        <header class="article-header">
                            <div class="article-eyebrow"><span>${escapeHtml(blog.category || 'Panduan Wisata')}</span><span class="article-location">${escapeHtml(blog.location || blog.region || '')}</span></div>
                            <h1>${escapeHtml(blog.title)}</h1>
                            <p class="article-dek">${escapeHtml(blog.snippet || '')}</p>
                            <div class="article-byline">
                                <span class="article-author-mark" aria-hidden="true">BT</span>
                                <span class="article-author"><strong>${escapeHtml(blog.author || 'Bali Trans Editorial Team')}</strong><small>Tim editorial Bali Trans</small></span>
                                <span class="article-meta-divider" aria-hidden="true"></span>
                                <time datetime="${escapeHtml(blog.dateISO || '')}">${escapeHtml(blog.date || '')}</time>
                                <span class="article-meta-divider" aria-hidden="true"></span>
                                <span>${escapeHtml(blog.readTime || '')}</span>
                            </div>
                        </header>
                        ${featured}
                        ${mobileToc}
                        <div class="article-layout">
                            ${tocMarkup}
                            <div class="article-reading">
                                ${articleContent}
                                <p class="article-ending">Semoga panduan ini membantu merencanakan kunjungan yang lebih nyaman. Nikmati Pantai Kuta sesuai ritme perjalananmu dan selalu perhatikan kondisi pantai saat berada di sana.</p>
                            </div>
                        </div>
                        <section class="article-topic-tags" aria-label="Topik artikel"><span>Topik</span><a href="#" onclick="navigateTo('blog');return false">Pantai Bali</a><a href="#" onclick="navigateTo('blog');return false">Wisata Bali</a><a href="#" onclick="navigateTo('blog');return false">Bali Selatan</a></section>
                        ${renderArticleSources(blog.sources)}
                        ${renderRelatedBlogGuides(blog)}
                        <div class="article-back-link"><button type="button" onclick="navigateTo('blog')"><i class="fas fa-arrow-left" aria-hidden="true"></i> Kembali ke semua panduan</button></div>
                    </div>
                </article>
            `;
        }
