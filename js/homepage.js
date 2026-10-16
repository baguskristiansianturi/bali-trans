/* Small accessibility enhancement for the shared mobile menu. */
const homeMenuToggle=document.getElementById('menuToggle');
const homeMainNav=document.getElementById('mainNav');
if(homeMenuToggle&&homeMainNav){
  homeMenuToggle.addEventListener('click',()=>{
    const expanded=homeMainNav.classList.contains('mobile-open');
    homeMenuToggle.setAttribute('aria-expanded',String(expanded));
    homeMenuToggle.setAttribute('aria-label',expanded?'Open navigation':'Close navigation');
  });
  homeMainNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    homeMainNav.classList.remove('mobile-open');
    homeMenuToggle.setAttribute('aria-expanded','false');
    homeMenuToggle.setAttribute('aria-label','Open navigation');
  }));
}
