const menuToggle=document.getElementById('menuToggle');
const mainNav=document.getElementById('mainNav');
if(menuToggle&&mainNav){menuToggle.addEventListener('click',()=>{mainNav.classList.toggle('mobile-open');});}
const searchForm=document.getElementById('searchForm');
if(searchForm){searchForm.addEventListener('submit',(e)=>{e.preventDefault();const q=document.getElementById('heroSearch').value.trim();window.location.href='pages/search.html'+(q?'?q='+encodeURIComponent(q):'');});}
