/* Extracted from bali-airport-transfer-checkout.html; original execution position preserved. */
(function(){
const $=id=>document.getElementById(id);
const zones=[['Kuta / Tuban / Legian',['kuta','tuban','legian'],125000],['Seminyak',['seminyak'],175000],['Jimbaran / Nusa Dua',['jimbaran','nusa dua','nusadua','ungasan'],200000],['Canggu / Berawa',['canggu','berawa','pererenan'],275000],['Sanur',['sanur','renon'],225000],['Ubud',['ubud','tegallalang','tegalalang'],350000],['Lovina / North Bali',['lovina','singaraja','munduk'],650000],['Amed / East Bali',['amed','karangasem','candidasa'],550000]];
const vehicleNames={standard:'Avanza / Wuling or similar',innova:'Toyota Innova',reborn:'Toyota Innova Reborn',hiace:'Toyota HiAce'};
const upgrades={standard:0,innova:150000,reborn:200000,hiace:350000};
const money=n=>'Rp'+Math.round(n).toLocaleString('id-ID');
const zoneFor=value=>{const a=(value||'').toLowerCase();return zones.find(z=>z[1].some(k=>a.includes(k)))};
let quote=null,lastPassengers=2;
const params=new URLSearchParams(location.search);
[['destination','address'],['direction','direction'],['terminal','terminal'],['date','date'],['time','time'],['passengers','passengers']].forEach(([p,id])=>{const value=params.get(p);if(value&&$(id)&&($(id).tagName==='INPUT'||[...$(id).options].some(o=>o.value===value)))$(id).value=value});
if(!$('date').value){const today=new Date();$('date').min=today.getFullYear()+'-'+String(today.getMonth()+1).padStart(2,'0')+'-'+String(today.getDate()).padStart(2,'0')}
function chosenVehicle(){return document.querySelector('input[name="vehicle"]:checked').value}
function sync(){const pickup=$('direction').value==='jemput';$('flightField').hidden=!pickup;$('flight').required=pickup;$('addressLabel').textContent=pickup?'Hotel / destination address *':'Pickup address (hotel / villa) *'}
function vehicleRules(){const p=+$('passengers').value;const radios=[...document.querySelectorAll('input[name="vehicle"]')];if(p>=6){radios.forEach(r=>{r.checked=r.value==='hiace';r.disabled=true})}else{radios.forEach(r=>r.disabled=false);if(lastPassengers>=6){radios.forEach(r=>r.checked=r.value==='standard')}}lastPassengers=p}
function recalc(){
vehicleRules();
const p=+$('passengers').value,v=chosenVehicle(),z=zoneFor($('address').value),t=$('time').value||'09:00',mins=Number(t.slice(0,2))*60+Number(t.slice(3,5));
if(!z){quote=null;$('price').textContent='—';$('priceNote').textContent='Enter a supported Bali destination area to calculate the estimated fare.';return}
const night=$('direction').value==='jemput'?(mins>=1320?30000:mins<120?40000:mins<300?50000:0):0;
const base=z[2]+($('direction').value==='jemput'?25000:0);
const up=p>=6?0:(upgrades[v]||0);
quote={zone:z[0],vehicle:v,p,total:base+night+up,night,up};
$('price').textContent=money(quote.total);
$('priceNote').textContent='Route estimate for '+z[0]+(night?' · includes late-night pickup adjustment':'')+(up?' · includes vehicle selection':'')+'. Final fare and any stop charge are confirmed by the team.';
}
function setStep(n){const first=n===1;$('step1').hidden=!first;$('step2').hidden=first;$('progress1').classList.toggle('active',first);$('progress2').classList.toggle('active',!first);$('progress1').classList.toggle('done',!first);$('step1Status').textContent='';$('step2Status').textContent='';window.scrollTo({top:0,behavior:'smooth'})}
function syncBookingFor(){const other=document.querySelector('input[name="bookingFor"]:checked').value==='someone';$('guestFields').hidden=!other;$('guestName').required=other;$('guestPhone').required=other}
function valid(ids){for(const id of ids){const el=$(id);if(!el.checkValidity()){el.reportValidity();el.focus();return false}}return true}
const step1Fields=['direction','terminal','date','time','passengers','address'];
['direction','terminal','date','time','passengers','address'].forEach(id=>$(id).addEventListener('input',()=>{sync();recalc()}));
document.querySelectorAll('input[name="vehicle"]').forEach(el=>el.addEventListener('change',recalc));
$('stopover').addEventListener('change',()=>{$('stopoverField').hidden=!$('stopover').checked;$('stopoverDetails').required=$('stopover').checked});
$('nextButton').addEventListener('click',()=>{sync();recalc();if(!valid(step1Fields))return;if($('flight').required&&!valid(['flight']))return;if($('stopover').checked&&!valid(['stopoverDetails']))return;if(!quote){$('step1Status').textContent='Please enter a supported destination area so the estimated fare can be calculated.';return}setStep(2)});
$('backButton').addEventListener('click',()=>setStep(1));
document.querySelectorAll('input[name="bookingFor"]').forEach(el=>el.addEventListener('change',syncBookingFor));
$('checkoutForm').addEventListener('submit',e=>{
e.preventDefault();$('step2Status').textContent='';
syncBookingFor();
if(!valid(['name','phone']))return;
const bookingFor=document.querySelector('input[name="bookingFor"]:checked').value;
if(bookingFor==='someone'&&!valid(['guestName','guestPhone']))return;
if(!$('terms').checked){$('terms').reportValidity();$('step2Status').textContent='Please accept the Terms & Conditions before continuing.';return}
recalc();
if(!quote){setStep(1);$('step1Status').textContent='Please check the destination so the fare can be calculated.';return}
const pickup=$('direction').value==='jemput';
const payment=document.querySelector('input[name="payment"]:checked').value;
const lines=['Hello Bali Trans, I would like to request an airport transfer booking.','Booking for: '+(bookingFor==='someone'?'Someone else':'Myself'),'Booker name: '+$('name').value,'Booker WhatsApp: '+$('phone').value,bookingFor==='someone'?'Guest name: '+$('guestName').value:'',bookingFor==='someone'?'Guest phone: '+$('guestPhone').value:'','Trip: '+(pickup?'Airport to hotel':'Hotel to airport'),'Terminal: '+$('terminal').value,'Date: '+$('date').value,'Time: '+$('time').value,pickup?'Flight number: '+$('flight').value:'','Address: '+$('address').value,'Passengers: '+$('passengers').value,'Vehicle: '+vehicleNames[chosenVehicle()],'Estimated fare: '+money(quote.total),'Area: '+quote.zone,'Additional stop: '+($('stopover').checked?$('stopoverDetails').value+' (additional charge to be confirmed)':'None'),'Payment preference: '+payment,payment==='Pay at pickup'?'Customer plans to pay on the day of pickup.':'Online payment is under maintenance; please confirm payment arrangements via WhatsApp.',$('notes').value?'Special request: '+$('notes').value:'','Terms & Conditions accepted: Yes'].filter(Boolean);
window.location.href='https://wa.me/'+(window.BALI_TRANS_WHATSAPP_NUMBER||'628218187917')+'?text='+encodeURIComponent(lines.join('\n'));
});
sync();syncBookingFor();recalc();
})();
