/* Extracted from watersport-tanjung-benoa.html; original execution position preserved. */
(function(){
 const chips=[...document.querySelectorAll('[data-filter]')], cards=[...document.querySelectorAll('.ws-card')], empty=document.getElementById('wsEmpty');
 chips.forEach(chip=>chip.addEventListener('click',()=>{const filter=chip.dataset.filter;chips.forEach(c=>c.setAttribute('aria-pressed',String(c===chip)));let shown=0;cards.forEach(card=>{const visible=filter==='all'||card.dataset.category===filter;card.classList.toggle('hidden',!visible);if(visible)shown++});empty.classList.toggle('hidden',shown>0)}));

})();
