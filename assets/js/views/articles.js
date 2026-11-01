function getArticlePublicUrl(blog) {
            if (!blog || !blog.id) return window.location.href;
            let basePath = window.location.pathname;
            if (basePath.endsWith('/index.html')) basePath = basePath.slice(0, -11);
            while (basePath.endsWith('/')) basePath = basePath.slice(0, -1);
            return window.location.origin + basePath + '/blog/' + encodeURIComponent(blog.id) + '/';
        }

        function getCurrentArticlePublicUrl() {
            const articleId = new URLSearchParams(window.location.search).get('item');
            const blog = Array.isArray(BALI_BLOGS) ? BALI_BLOGS.find(item => item.id === articleId) : null;
            return blog ? getArticlePublicUrl(blog) : window.location.href;
        }

        function renderRelatedBlogGuides(blog) {
            const escapeHtml = value => String(value || '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
            const allPublished = (Array.isArray(BALI_BLOGS) ? BALI_BLOGS : []).filter(item => item && item.id !== blog.id && item.publicationStatus === 'PUBLISHED');
            const explicitIds = Array.isArray(blog.related) ? blog.related : [];
            const explicit = explicitIds.map(id => allPublished.find(item => item.id === id)).filter(Boolean);
            const currentTopics = (blog.topicTags || []).map(tag => typeof tag === 'string' ? tag : tag.label).filter(Boolean);
            const score = item => {
                let value = 0;
                if (blog.destinationCategoryId && item.destinationCategoryId === blog.destinationCategoryId) value += 3;
                if (blog.regionId && item.regionId === blog.regionId) value += 2;
                const itemTopics = (item.topicTags || []).map(tag => typeof tag === 'string' ? tag : tag.label);
                value += currentTopics.filter(topic => itemTopics.includes(topic)).length * 2;
                return value;
            };
            const relevant = allPublished.filter(item => score(item) > 0 && !explicit.some(entry => entry.id === item.id)).sort((a, b) => score(b) - score(a));
            const related = [...explicit, ...relevant].slice(0, 3);
            const cards = related.map(item => '<a class="article-recommended-card" href="' + getArticlePublicUrl(item) + '"><span class="article-recommended-card__eyebrow">' + escapeHtml(item.category || 'Travel Information') + '</span><strong>' + escapeHtml(item.title) + '</strong><span class="article-recommended-card__meta">' + escapeHtml(item.readTime || '') + ' · Baca artikel <span aria-hidden="true">→</span></span></a>').join('');
            return '<section class="article-recommended" aria-labelledby="related-guides-title"><div class="article-recommended__heading"><span>RECOMMENDED READING</span><h2 id="related-guides-title">Artikel terkait</h2><p>Pilihan bacaan lain yang memiliki topik atau konteks destinasi serupa.</p></div>' + (cards ? '<div class="article-recommended__grid">' + cards + '</div>' : '<div class="article-recommended__empty">Belum ada artikel lain yang cukup relevan untuk direkomendasikan. Bagian ini akan terisi saat artikel terkait diterbitkan.</div>') + '</section>';
        }

        function renderArticleFaq(blog) {
            const items = Array.isArray(blog.faq) ? blog.faq : [];
            if (!items.length) return '';
            const escapeHtml = value => String(value || '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
            return '<section class="article-faq" aria-labelledby="article-faq-title"><div class="article-faq__heading"><span>FAQ</span><h2 id="article-faq-title">Pertanyaan yang sering ditanyakan</h2><p>Informasi singkat untuk membantu merencanakan kunjungan.</p></div><div class="article-faq__list">' + items.map((item, index) => {
                const answerId = 'article-faq-answer-' + index;
                return '<div class="article-faq__item"><h3><button type="button" class="article-faq__trigger" aria-expanded="false" aria-controls="' + answerId + '" onclick="toggleArticleFaq(this)"><span>' + escapeHtml(item.question) + '</span><i class="fas fa-plus" aria-hidden="true"></i></button></h3><div class="article-faq__answer" id="' + answerId + '" hidden><p>' + escapeHtml(item.answer) + '</p></div></div>';
            }).join('') + '</div></section>';
        }

        function renderArticleConclusion(blog) {
            if (!blog.conclusion) return '';
            const escapeHtml = value => String(value || '').replace(/[&<>"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[character]));
            return '<section class="article-conclusion" aria-labelledby="article-conclusion-title"><h2 id="article-conclusion-title">Kesimpulan</h2><p>' + escapeHtml(blog.conclusion) + '</p></section>';
        }

        function renderArticleTopicTags(blog) {
            const tags = Array.isArray(blog.topicTags) ? blog.topicTags : [];
            if (!tags.length) return '';
            const escapeHtml = value => String(value || '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
            const basePath = window.location.pathname.split('/blog/')[0].replace(/\/?$/, '/');
            return '<nav class="article-topic-tags" aria-label="Topik terkait"><span>Topik terkait:</span>' + tags.map(tag => {
                const label = typeof tag === 'string' ? tag : tag.label;
                const page = tag && tag.page;
                const item = tag && tag.item;
                if (!label || !['destinations', 'discovery'].includes(page)) return '';
                const href = basePath + '?page=' + encodeURIComponent(page) + (item ? '&item=' + encodeURIComponent(item) : '');
                return '<a class="article-topic-tag" href="' + escapeHtml(href) + '">' + escapeHtml(label) + '</a>';
            }).join('') + '</nav>';
        }

        window.toggleArticleFaq = function (button) {
            if (!button) return;
            const section = button.closest('.article-faq');
            if (!section) return;
            const wasOpen = button.getAttribute('aria-expanded') === 'true';
            section.querySelectorAll('.article-faq__trigger').forEach(trigger => {
                trigger.setAttribute('aria-expanded', 'false');
                const panel = document.getElementById(trigger.getAttribute('aria-controls'));
                const item = trigger.closest('.article-faq__item');
                if (!panel) return;
                if (item) item.classList.remove('is-open');
                panel.classList.remove('is-open');
                if (!panel.hidden) {
                    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    if (reducedMotion) {
                        panel.hidden = true;
                        panel.style.maxHeight = '';
                    } else {
                        panel.style.maxHeight = panel.scrollHeight + 'px';
                        void panel.offsetHeight;
                        panel.style.maxHeight = '0px';
                        panel.addEventListener('transitionend', function onClose(event) {
                            if (event.propertyName !== 'max-height') return;
                            panel.removeEventListener('transitionend', onClose);
                            if (trigger.getAttribute('aria-expanded') !== 'true') {
                                panel.hidden = true;
                                panel.style.maxHeight = '';
                            }
                        });
                    }
                }
            });
            if (!wasOpen) {
                button.setAttribute('aria-expanded', 'true');
                const answer = document.getElementById(button.getAttribute('aria-controls'));
                const item = button.closest('.article-faq__item');
                if (answer) {
                    answer.hidden = false;
                    answer.style.maxHeight = '0px';
                    if (item) item.classList.add('is-open');
                    requestAnimationFrame(() => {
                        answer.classList.add('is-open');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    });
                    answer.addEventListener('transitionend', function onOpen(event) {
                        if (event.propertyName !== 'max-height') return;
                        answer.removeEventListener('transitionend', onOpen);
                        if (button.getAttribute('aria-expanded') === 'true') answer.style.maxHeight = 'none';
                    });
                }
            }
        };

        function renderArticleShare(blog) {
            const url = getArticlePublicUrl(blog);
            const encodedUrl = encodeURIComponent(url);
            const encodedTitle = encodeURIComponent(blog.title || 'Bali Trans article');
            const message = encodeURIComponent((blog.title || 'Bali Trans article') + '\n' + url);
            return '<section class="article-share" aria-labelledby="article-share-title">' +
                '<div class="article-share__intro"><h2 id="article-share-title">Share this article</h2></div>' +
                '<div class="article-share__actions">' +
                '<button type="button" class="article-share__native" onclick="shareCurrentArticle()" aria-label="Share this article"><i class="fas fa-share-nodes" aria-hidden="true"></i><span>Share</span></button>' +
                '<a href="https://wa.me/?text=' + message + '" target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"><i class="fab fa-whatsapp" aria-hidden="true"></i><span>WhatsApp</span></a>' +
                '<a href="https://twitter.com/intent/tweet?text=' + encodedTitle + '&url=' + encodedUrl + '" target="_blank" rel="noopener noreferrer" aria-label="Share on X"><svg class="article-share__brand-icon article-share__x-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.6L5.4 22H2.2l7.3-8.4L1.8 2h6.5l4.4 6.9L18.9 2zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20z" fill="currentColor"/></svg><span>X</span></a>' +
                '<a href="https://www.facebook.com/sharer/sharer.php?u=' + encodedUrl + '" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"><i class="fab fa-facebook-f" aria-hidden="true"></i><span>Facebook</span></a>' +
                '<a href="https://www.linkedin.com/sharing/share-offsite/?url=' + encodedUrl + '" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><i class="fab fa-linkedin-in" aria-hidden="true"></i><span>LinkedIn</span></a>' +
                '<button type="button" onclick="copyCurrentArticleLink(this)" aria-label="Copy article link"><i class="fas fa-link" aria-hidden="true"></i><span>Copy link</span></button>' +
                '</div></section>';
        }

        function renderRelatedDestinations(blog) {
            const entries = (Array.isArray(BALI_BLOGS) ? BALI_BLOGS : []).filter(item =>
                item && item.publicationStatus === 'PUBLISHED' && item.relatedDestinationId && item.id !== blog.id
            );
            const escapeText = value => String(value || '').replace(/[&<>"']/g, character => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
            }[character]));
            const cards = entries.slice(0, 4).map(item => {
                const category = item.destinationCategoryLabel || item.destinationCategory || 'Bali destination';
                const region = item.region || item.location || 'Bali';
                const title = item.destinationDisplayName || item.destinationName || item.title;
                return '<a class="article-destination-card" href="' + getArticlePublicUrl(item) + '">' +
                    '<div class="article-destination-card__image"><img src="' + escapeText(item.image) + '" alt="' + escapeText(item.imageAlt || title) + '" loading="lazy" width="640" height="420"></div>' +
                    '<div class="article-destination-card__copy"><div class="article-destination-card__labels"><span>' + escapeText(category) + '</span><span>' + escapeText(region) + '</span></div>' +
                    '<h3>' + escapeText(title) + '</h3><p>' + escapeText(item.snippet || '') + '</p><span class="article-destination-card__link">Explore destination <span aria-hidden="true">→</span></span></div></a>';
            }).join('');
            return '<section class="article-related-destinations" aria-labelledby="article-related-destinations-title">' +
                '<div class="article-related-destinations__heading"><div><p>KEEP EXPLORING</p><h2 id="article-related-destinations-title">Explore more destinations</h2><span>Discover more places and stories from around Bali.</span></div>' +
                '<a href="?page=destinations">All destinations <span aria-hidden="true">→</span></a></div>' +
                (cards ? '<div class="article-destination-grid">' + cards + '</div>' :
                    '<div class="article-destination-empty"><p>More destination stories are on the way. Browse the destination collection to see what is being prepared.</p><a href="?page=destinations">Browse destinations <span aria-hidden="true">→</span></a></div>') +
                '</section>';
        }

        window.shareCurrentArticle = function () {
            const title = document.querySelector('.article-detail-page h1')?.textContent || document.title;
            const url = getCurrentArticlePublicUrl();
            if (navigator.share) {
                navigator.share({ title, url }).catch(() => {});
                return;
            }
            window.copyCurrentArticleLink();
        };

        window.copyCurrentArticleLink = function (button) {
            const finish = () => {
                if (button) {
                    const label = button.querySelector('span');
                    if (label) label.textContent = 'Copied';
                    button.classList.add('is-copied');
                    window.setTimeout(() => {
                        if (label) label.textContent = 'Copy link';
                        button.classList.remove('is-copied');
                    }, 1800);
                }
            };
            const url = getCurrentArticlePublicUrl();
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(finish).catch(() => {
                    const field = document.createElement('textarea');
                    field.value = url;
                    field.style.position = 'fixed';
                    field.style.opacity = '0';
                    document.body.appendChild(field);
                    field.select();
                    try { document.execCommand('copy'); finish(); } catch (error) {}
                    field.remove();
                });
                return;
            }
            const field = document.createElement('textarea');
            field.value = url;
            field.style.position = 'fixed';
            field.style.opacity = '0';
            document.body.appendChild(field);
            field.select();
            try { document.execCommand('copy'); finish(); } catch (error) {}
            field.remove();
        };

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
                        <span class="text-xs font-extrabold text-bali-orange uppercase tracking-wider">Travel Information & Tips</span>
                        <h1 class="text-3xl font-extrabold text-slate-900 mt-1">Plan Your Dream Trip to Bali</h1>
                        <p class="text-slate-500 text-sm mt-2">Travel information to help you understand places, activities and practical details for your Bali trip.</p>
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
                                        Read Article →
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
            const renderSupportingImage = image => {
                const alt = escapeHtml(image.alt || image.caption || image.fileName || blog.title);
                const label = escapeHtml(image.fallbackLabel || image.fileName || blog.title);
                const caption = escapeHtml(image.caption || '');
                const credit = image.credit && image.creditUrl
                    ? '<span class="article-image-credit">Foto: <a href="' + escapeHtml(image.creditUrl) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(image.credit) + '</a> · ' + escapeHtml(image.license || 'Lisensi sesuai sumber') + '</span>'
                    : '';
                const width = Math.max(1, Number(image.width) || 1200);
                const height = Math.max(1, Number(image.height) || 800);
                return '<figure class="article-inline-figure"><div class="article-image-frame"><img src="' + escapeHtml(image.src) + '" alt="' + alt + '" loading="lazy" decoding="async" width="' + width + '" height="' + height + '" onerror="this.parentElement.classList.add(\'is-failed\')"><div class="article-image-fallback" role="img" aria-label="' + alt + '"><strong>' + label + '</strong><span>' + alt + '</span><small>Gambar tidak dapat ditampilkan</small></div></div><figcaption>' + caption + credit + '</figcaption></figure>';
            };
            const insertSupportingImages = (content, images) => {
                if (!Array.isArray(images) || !images.length) return content;
                let output = content;
                images.forEach(image => {
                    const heading = String(image.afterHeading || '').trim();
                    if (!heading || !image.src) return;
                    const marker = '>' + heading + '</h2>';
                    const headingEnd = output.toLowerCase().indexOf(marker.toLowerCase());
                    if (headingEnd < 0) return;
                    const paragraphStart = output.indexOf('<p', headingEnd + marker.length);
                    if (paragraphStart < 0) return;
                    const paragraphEnd = output.indexOf('</p>', paragraphStart);
                    if (paragraphEnd < 0) return;
                    const insertAt = paragraphEnd + 4;
                    output = output.slice(0, insertAt) + renderSupportingImage(image) + output.slice(insertAt);
                });
                return output;
            };
            const headings = [...rawContent.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map(match => ({
                text: match[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim()
            }));
            const headingIds = new Map();
            let articleContent = rawContent.replace(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs, inner) => {
                const label = inner.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim();
                const base = label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'bagian-artikel';
                const count = (headingIds.get(base) || 0) + 1;
                headingIds.set(base, count);
                const id = count > 1 ? base + '-' + count : base;
                return '<h2 id="' + id + '">' + inner + '</h2>';
            });
            articleContent = insertSupportingImages(articleContent, blog.supportingImages);
            const toc = [...articleContent.matchAll(/<h2\b[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/gi)].map(match => ({
                id: match[1], text: match[2].replace(/<[^>]*>/g, '').trim()
            }));
            const tocMarkup = toc.length >= 5 ? '<nav class="article-toc" aria-label="Daftar isi"><p class="article-toc-title">Dalam artikel ini</p><ol>' + toc.map(item => '<li><a href="#' + escapeHtml(item.id) + '"><i class="fas fa-arrow-down article-toc__arrow" aria-hidden="true"></i><span>' + escapeHtml(item.text) + '</span></a></li>').join('') + '</ol></nav>' : '';
            const mobileToc = toc.length >= 5 ? '<details class="article-toc-mobile"><summary>Daftar isi artikel <span aria-hidden="true">＋</span></summary><ol>' + toc.map(item => '<li><a href="#' + escapeHtml(item.id) + '"><i class="fas fa-arrow-down article-toc__arrow" aria-hidden="true"></i><span>' + escapeHtml(item.text) + '</span></a></li>').join('') + '</ol></details>' : '';
            const featuredAlt = escapeHtml(blog.imageAlt || blog.title);
            const featuredLabel = escapeHtml(blog.imageFallbackLabel || blog.destinationDisplayName || blog.title);
            const featured = '<figure class="article-featured"><div class="article-image-frame"><img src="' + escapeHtml(blog.image) + '" alt="' + featuredAlt + '" loading="' + escapeHtml(blog.imageLoading || 'lazy') + '" fetchpriority="' + (blog.imageLoading === 'eager' ? 'high' : 'auto') + '" width="1200" height="675" onerror="this.parentElement.classList.add(\'is-failed\')"><div class="article-image-fallback" role="img" aria-label="' + featuredAlt + '"><strong>' + featuredLabel + '</strong><span>' + featuredAlt + '</span><small>Gambar tidak dapat ditampilkan</small></div></div></figure>';
            return `
                <article lang="${blog.lang || 'id'}" class="article-detail-page">
                    <div class="article-detail-shell">
                        <nav class="article-breadcrumb" aria-label="Breadcrumb">
                            <a href="#" onclick="navigateTo('home');return false">Home</a><span aria-hidden="true">/</span>
                            <a href="#" onclick="navigateTo('blog');return false">Blog</a><span aria-hidden="true">/</span>
                            <span>Destinations</span><span aria-hidden="true">/</span>
                            <span>${escapeHtml(blog.destinationCategoryLabel || 'Beaches')}</span><span aria-hidden="true">/</span>
                            <span aria-current="page">${escapeHtml(blog.destinationDisplayName || 'Pantai Kuta')}</span>
                        </nav>
                        <header class="article-header">
                            <div class="article-eyebrow">
                                <div class="article-taxonomy-labels">${(blog.labels || [blog.category, blog.subcategory]).filter(Boolean).map(label => '<span>' + escapeHtml(label) + '</span>').join('')}</div>
                                <span class="article-location"><i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${escapeHtml(blog.location || blog.region || '')}</span>
                            </div>
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
                            </div>
                        </div>
                        ${renderArticleFaq(blog)}
                        ${renderArticleConclusion(blog)}
                        ${renderArticleTopicTags(blog)}
                        ${renderArticleShare(blog)}
                        ${renderRelatedBlogGuides(blog)}
                        ${renderRelatedDestinations(blog)}
                        ${renderArticleSources(blog.sources)}
                        <div class="article-back-link"><button type="button" onclick="navigateTo('blog')"><i class="fas fa-arrow-left" aria-hidden="true"></i> Kembali ke semua artikel</button></div>
                    </div>
                </article>
            `;
        }
