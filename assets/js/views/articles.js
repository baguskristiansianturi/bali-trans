function getBlogSlug(blog) {
            return blog.slug || String(blog.id || 'article').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        }

        function getBlogLabels(blog) {
            return Array.isArray(blog.labels) && blog.labels.length ? blog.labels : [blog.category || 'Travel Guides'];
        }

        function renderBlogLabelLinks(blog) {
            return getBlogLabels(blog).map(label => `
                <button type="button" onclick="navigateTo('blog-label', decodeURIComponent('${encodeURIComponent(label)}'))" class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-orange-300 hover:text-orange-700 transition">
                    ${label}
                </button>
            `).join('');
        }

        function renderBlogListView() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div class="text-center max-w-2xl mx-auto mb-10">
                        <span class="text-xs font-extrabold text-klook-orange uppercase tracking-wider">Bali Travel Guides & Tips</span>
                        <h1 class="text-3xl font-extrabold text-slate-900 mt-1">Explore Bali Travel Articles</h1>
                        <p class="text-slate-500 text-sm mt-2">Guides to Bali destinations, culture, food and trip planning.</p>
                    </div>
                    <div class="flex flex-wrap justify-center gap-2 mb-8">
                        ${[...new Set(BALI_BLOGS.flatMap(getBlogLabels))].sort().map(label => `
                            <button type="button" onclick="navigateTo('blog-label', decodeURIComponent('${encodeURIComponent(label)}'))" class="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:border-orange-300 hover:text-orange-700">${label}</button>
                        `).join('')}
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        ${BALI_BLOGS.map(blog => `
                            <article class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col">
                                <img src="${blog.image}" alt="${blog.title.replace(/"/g, '&quot;')}" loading="lazy" class="w-full h-48 object-cover">
                                <div class="p-6 flex-1 flex flex-col">
                                    <div class="flex flex-wrap gap-2 text-[10px] font-bold text-slate-500 mb-3">
                                        ${renderBlogLabelLinks(blog)}
                                        <span class="self-center">${blog.readTime}</span>
                                    </div>
                                    <h2 class="font-extrabold text-slate-900 text-base leading-snug mb-2 hover:text-klook-orange cursor-pointer"><a href="?page=blog-read&amp;item=${encodeURIComponent(getBlogSlug(blog))}" onclick="event.preventDefault(); navigateTo('blog-read', '${getBlogSlug(blog)}')" class="hover:underline">${blog.title}</a></h2>
                                    <p class="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">${blog.snippet}</p>
                                    <button onclick="navigateTo('blog-read', '${getBlogSlug(blog)}')" class="text-xs font-extrabold text-klook-orange hover:underline self-start mt-auto">Read Full Guide →</button>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        function renderBlogLabelView(label) {
            const matches = BALI_BLOGS.filter(blog => getBlogLabels(blog).some(item => item.toLowerCase() === String(label || '').toLowerCase()));
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <button onclick="navigateTo('blog')" class="text-xs font-bold text-slate-500 hover:text-slate-900 mb-6">← All articles</button>
                    <header class="max-w-2xl mb-8">
                        <p class="text-xs font-extrabold text-klook-orange uppercase tracking-wider">Article topic</p>
                        <h1 class="text-3xl font-extrabold text-slate-900 mt-1">${label || 'Articles'}</h1>
                        <p class="text-sm text-slate-500 mt-2">Explore articles across Bali related to this topic.</p>
                    </header>
                    ${matches.length ? `
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            ${matches.map(blog => `
                                <article class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col">
                                    <img src="${blog.image}" alt="${blog.title.replace(/"/g, '&quot;')}" loading="lazy" class="w-full h-48 object-cover">
                                    <div class="p-6 flex flex-col flex-1">
                                        <h2 class="font-extrabold text-slate-900 text-base mb-2">${blog.title}</h2>
                                        <p class="text-xs text-slate-500 leading-relaxed mb-4">${blog.snippet}</p>
                                        <button onclick="navigateTo('blog-read', '${getBlogSlug(blog)}')" class="text-xs font-extrabold text-klook-orange self-start mt-auto">Read Full Guide →</button>
                                    </div>
                                </article>
                            `).join('')}
                        </div>` : '<p class="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">No articles have been published under this topic yet.</p>'}
                </div>
            `;
        }

        /* Article detail */
        function renderBlogDetailView(blog) {
            if (!blog) return `<div class="max-w-4xl mx-auto px-4 py-12"><h1 class="text-2xl font-bold">Article not found</h1><button onclick="navigateTo('blog')" class="mt-4 text-sm underline">Back to articles</button></div>`;
            return `
                <article class="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                    <nav aria-label="Breadcrumb" class="text-xs text-slate-500 mb-6"><a href="?page=blog" onclick="event.preventDefault(); navigateTo('blog')" class="hover:underline">Travel Guides</a> <span aria-hidden="true">/</span> <span>${blog.title}</span></nav>
                    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-4 leading-tight">${blog.title}</h1>
                    <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-6 pb-6 border-b border-slate-200">
                        <span>By <strong class="text-slate-700">${blog.author}</strong></span><span>•</span><span>Published ${blog.date}</span><span>•</span><span>${blog.readTime}</span>
                    </div>
                    <img src="${blog.image}" alt="${blog.title.replace(/"/g, '&quot;')}" loading="eager" class="w-full aspect-[16/9] object-cover rounded-3xl mb-8 shadow-sm">
                    <div class="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4">${blog.content}</div>
                    <footer class="mt-10 pt-6 border-t border-slate-200">
                        <h2 class="text-sm font-extrabold text-slate-900 mb-3">Explore related topics</h2>
                        <div class="flex flex-wrap gap-2">${renderBlogLabelLinks(blog)}</div>
                    </footer>
                </article>
            `;
        }

        /* VIEW 6: SHOPPING CART PAGE */