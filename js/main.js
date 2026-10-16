const menuToggle=document.getElementById('menuToggle');
const mainNav=document.getElementById('mainNav');
if(menuToggle&&mainNav){menuToggle.addEventListener('click',()=>{mainNav.classList.toggle('mobile-open');});}

const searchForm=document.getElementById('searchForm');
if(searchForm){searchForm.addEventListener('submit',(e)=>{e.preventDefault();const q=document.getElementById('heroSearch').value.trim();window.location.href='pages/search.html'+(q?'?q='+encodeURIComponent(q):'');});}

const SAMPLE_PRICE=175000;
const BOOKING_KEY='baliTransRaftingBookingV1';
function readBooking(){try{return JSON.parse(sessionStorage.getItem(BOOKING_KEY)||'{}');}catch(e){return {};}}
function saveBooking(data){sessionStorage.setItem(BOOKING_KEY,JSON.stringify(data));}
function money(amount){return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(amount);}
function safe(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
function dateLabel(value){if(!value)return 'Not selected';const d=new Date(value+'T12:00:00');return d.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});}
function bookingTotal(b){return Math.max(1,Number(b.guests)||1)*SAMPLE_PRICE;}
function summaryRows(b,includeContact){let html='<div class="review-row"><span>Activity</span><strong>Ayung River Rafting</strong></div><div class="review-row"><span>Preferred date</span><strong>'+safe(dateLabel(b.date))+'</strong></div><div class="review-row"><span>Guests</span><strong>'+safe(b.guests||2)+'</strong></div><div class="review-row"><span>Sample price / person</span><strong>'+money(SAMPLE_PRICE)+'</strong></div><div class="review-row"><span>Sample subtotal</span><strong>'+money(bookingTotal(b))+'</strong></div>';
if(includeContact){html+='<h3 class="review-subhead">Guest contact</h3><div class="review-row"><span>Name</span><strong>'+safe(b.name||'—')+'</strong></div><div class="review-row"><span>Email</span><strong>'+safe(b.email||'—')+'</strong></div><div class="review-row"><span>Phone</span><strong>'+safe(b.phone||'—')+'</strong></div><div class="review-row"><span>Country / region</span><strong>'+safe(b.country||'Not provided')+'</strong></div><div class="review-row"><span>Transport</span><strong>'+(b.transport==='ask'?'Ask about transfer':'Own transport')+'</strong></div>';
if(b.notes)html+='<div class="review-row"><span>Notes</span><strong>'+safe(b.notes)+'</strong></div>';}
return html;}
function showSummary(target,includeContact){const el=document.getElementById(target);if(!el)return;const b=readBooking();if(!b.date||!b.guests){el.innerHTML='<p>No activity selection was found. <a class="text-link" href="../experiences/rafting-ubud.html">Return to the activity page</a> to start again.</p>';return;}el.innerHTML=summaryRows(b,includeContact);}
function showSideSummary(){const el=document.getElementById('bookingSummary');if(!el)return;const b=readBooking();if(!b.date||!b.guests){el.innerHTML='<div class="eyebrow">Your selection</div><h3>Ayung River Rafting</h3><p class="muted">Start by selecting a date and number of guests on the activity page.</p><a class="btn btn-dark btn-wide" href="../experiences/rafting-ubud.html">Choose date</a>';return;}el.innerHTML='<div class="eyebrow">Your selection</div><h3>Ayung River Rafting</h3><div class="review-row"><span>Date</span><strong>'+safe(dateLabel(b.date))+'</strong></div><div class="review-row"><span>Guests</span><strong>'+safe(b.guests)+'</strong></div><div class="review-row"><span>Sample subtotal</span><strong>'+money(bookingTotal(b))+'</strong></div><p>Sample price only. Availability and extra fees are not checked.</p><a class="text-link" href="../experiences/rafting-ubud.html">Change selection</a>';}

const activityForm=document.getElementById('activityBookingForm');
if(activityForm){const dateInput=document.getElementById('activityDate');if(dateInput){const now=new Date();dateInput.min=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');}
activityForm.addEventListener('submit',e=>{e.preventDefault();if(!activityForm.reportValidity())return;const b=readBooking();b.product='ayung-river-rafting';b.date=dateInput.value;b.guests=Number(document.getElementById('activityGuests').value)||2;b.pricePerPerson=SAMPLE_PRICE;b.stage='selection';saveBooking(b);window.location.href=activityForm.dataset.next||'../../pages/booking/step-1.html';});}

const guestForm=document.getElementById('guestDetailsForm');
if(guestForm){const b=readBooking();if(!b.date||!b.guests){window.location.replace('../experiences/rafting-ubud.html');}else{['name','email','phone','country','notes'].forEach(k=>{const el=guestForm.elements[k];if(el&&b[k])el.value=b[k];});if(b.transport){const radio=guestForm.querySelector('input[name="transport"][value="'+b.transport+'"]');if(radio)radio.checked=true;}showSideSummary();}
guestForm.addEventListener('submit',e=>{e.preventDefault();if(!guestForm.reportValidity())return;const data=new FormData(guestForm);const next=readBooking();['name','email','phone','country','notes'].forEach(k=>next[k]=String(data.get(k)||'').trim());next.transport=String(data.get('transport')||'self');next.stage='details';saveBooking(next);window.location.href=guestForm.dataset.next||'step-2.html';});}

if(document.getElementById('reviewDetails')){const b=readBooking();if(!b.name||!b.date){window.location.replace('step-1.html');}else{showSummary('reviewDetails',true);showSideSummary();const next=document.getElementById('continueToFinish');if(next)next.addEventListener('click',()=>{const fresh=readBooking();fresh.stage='reviewed';saveBooking(fresh);window.location.href='step-3.html';});}}

if(document.getElementById('finalReview')){const b=readBooking();if(!b.name||!b.date){window.location.replace('step-1.html');}else{showSummary('finalReview',true);const ack=document.getElementById('testAcknowledgement');const finish=document.getElementById('finishTestBooking');if(ack&&finish){ack.addEventListener('change',()=>{finish.disabled=!ack.checked;});finish.addEventListener('click',()=>{if(!ack.checked)return;const fresh=readBooking();fresh.stage='test-complete';fresh.testCompletedAt=new Date().toISOString();saveBooking(fresh);window.location.href='confirmation.html';});}}}

if(document.getElementById('confirmationSummary')){const b=readBooking();const el=document.getElementById('confirmationSummary');if(b.stage!=='test-complete'){el.innerHTML='<p>No completed test was found in this browser session. You can start from the activity page.</p><a class="btn btn-dark" href="../experiences/rafting-ubud.html">Start test</a>';}else{el.innerHTML=summaryRows(b,true)+'<div class="review-row"><span>Test status</span><strong>Front-end flow completed</strong></div><div class="review-row"><span>Real booking / payment</span><strong>Not created</strong></div>';}}
