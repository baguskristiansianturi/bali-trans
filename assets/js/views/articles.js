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
                                <img src="${blog.image}" alt="${(blog.imageAlt || blog.title).replace(/&/g, '&amp;').replace(/"/g, '&quot;')}" class="w-full h-48 object-cover" loading="lazy">
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
            const blogIndex = BALI_BLOGS.findIndex(item => item.id === blog.id);
            const previousBlog = blogIndex > 0 ? BALI_BLOGS[blogIndex - 1] : null;
            const nextBlog = blogIndex >= 0 && blogIndex < BALI_BLOGS.length - 1 ? BALI_BLOGS[blogIndex + 1] : null;
            const articleNavigation = (item, label, direction) => item ? `
                <button type="button" onclick="navigateTo('blog-read', '${item.id}')" class="group w-full min-w-0 text-left rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 hover:border-teal-300 hover:bg-teal-50/40 transition">
                    <span class="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">${label}</span>
                    <span class="flex items-start gap-2 text-sm font-extrabold leading-snug text-slate-800 group-hover:text-bali-orange">${direction === 'previous' ? '<i class="fas fa-arrow-left mt-1 shrink-0"></i>' : ''}<span class="min-w-0">${item.title}</span>${direction === 'next' ? '<i class="fas fa-arrow-right mt-1 shrink-0"></i>' : ''}</span>
                </button>` : '<div class="hidden sm:block"></div>';
            return `
                <article class="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                    <button type="button" onclick="navigateTo('blog')" class="text-xs font-bold text-slate-500 hover:text-slate-900 mb-6 flex items-center gap-2">
                        <i class="fas fa-arrow-left"></i> Back to Travel Guides
                    </button>
                    <div class="flex flex-wrap items-center gap-2"><span class="inline-flex bg-orange-100 text-bali-orange text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">${blog.region || blog.category}</span>${blog.location ? `<span class="text-xs font-bold text-slate-500">${blog.location}</span>` : ""}</div>
                    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-4 leading-tight">${blog.title}</h1>
                    <p class="text-base sm:text-lg leading-relaxed text-slate-600 mb-5">${blog.snippet || ''}</p>
                    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500 mb-6 pb-6 border-b border-slate-200">
                        <time datetime="${blog.dateISO || ''}">Published ${blog.date}</time>
                        <span aria-hidden="true">•</span>
                        <span>${blog.readTime}</span>
                    </div>
                    <img src="${blog.image}" alt="${(blog.imageAlt || blog.title).replace(/&/g, '&amp;').replace(/"/g, '&quot;')}" class="w-full h-56 sm:h-80 md:h-[380px] object-cover rounded-3xl mb-8 shadow-md" loading="lazy">
                    <div class="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                        ${blog.content}
                    </div>
                    ${renderRelatedBlogGuides(blog)}
                    ${renderArticleSources(blog.sources)}
                    <nav aria-label="Article navigation" class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-10 pt-7 border-t border-slate-200">
                        ${articleNavigation(previousBlog, 'Previous article', 'previous')}
                        ${articleNavigation(nextBlog, 'Next article', 'next')}
                    </nav>
                    <div class="mt-6 text-center">
                        <button type="button" onclick="navigateTo('blog')" class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
                            View all travel guides <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </article>
            `;
        }
