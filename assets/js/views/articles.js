function renderBlogListView() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div class="text-center max-w-2xl mx-auto mb-10">
                        <span class="text-xs font-extrabold text-klook-orange uppercase tracking-wider">Bali Travel Guides & Tips</span>
                        <h1 class="text-3xl font-extrabold text-slate-900 mt-1">Plan Your Dream Trip to Bali</h1>
                        <p class="text-slate-500 text-sm mt-2">Practical guides to Bali destinations, activities and planning your trip.</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        ${BALI_BLOGS.map(blog => `
                            <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                                <img src="${blog.image}" class="w-full h-48 object-cover">
                                <div class="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div class="flex items-center gap-2 text-[10px] font-bold text-slate-400 mb-2">
                                            <span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">${blog.category}</span>
                                            <span>•</span>
                                            <span>${blog.readTime}</span>
                                        </div>
                                        <h3 class="font-extrabold text-slate-900 text-base leading-snug mb-2 hover:text-klook-orange cursor-pointer" onclick="navigateTo('blog-read', '${blog.id}')">${blog.title}</h3>
                                        <p class="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">${blog.snippet}</p>
                                    </div>
                                    <button onclick="navigateTo('blog-read', '${blog.id}')" class="text-xs font-extrabold text-klook-orange hover:underline self-start">
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
            return `
                <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                    <button onclick="navigateTo('blog')" class="text-xs font-bold text-slate-500 hover:text-slate-900 mb-6 flex items-center gap-2">
                        ← Back to Travel Guides
                    </button>
                    
                    <span class="bg-orange-100 text-klook-orange text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">${blog.category}</span>
                    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-4 leading-tight">${blog.title}</h1>
                    
                    <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-6 border-b border-slate-200">
                        <span>By <strong class="text-slate-700">${blog.author}</strong></span>
                        <span>•</span>
                        <span>Published ${blog.date}</span>
                        <span>•</span>
                        <span>${blog.readTime}</span>
                    </div>

                    <img src="${blog.image}" class="w-full h-[380px] object-cover rounded-3xl mb-8 shadow-md">

                    <div class="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
                        ${blog.content}
                    </div>
                </div>
            `;
        }

        /* VIEW 6: SHOPPING CART PAGE */
