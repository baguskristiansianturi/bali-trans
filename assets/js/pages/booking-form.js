(function(){'use strict';
const q=new URLSearchParams(location.search),$=id=>document.getElementById(id),form=$('guestBookingForm');
const service=q.get('service')||'airport-transfer',rental=service==='car-rental',tour=service==='full-day-tour'||service==='dolphin-tour',dolphinTour=service==='full-day-tour'&&q.get('tourId')==='lovina-dolphin-tour';
const tourName=q.get('tourName')||(service==='dolphin-tour'?'Bali Dolphin Tour':service==='full-day-tour'?'Private Full Day Tour':'');
const fromAvailability=q.get('locked')==='1',selectedFare=Number(q.get('fare')),selectedVehicleName=q.get('vehicleName')||(rental?q.get('vehicle')||'':'');
let addonItems=[];try{addonItems=JSON.parse(q.get('addons')||'[]');if(!Array.isArray(addonItems))addonItems=[];}catch(_){addonItems=[];}
const packageType=q.get('package')||'regular',guestType=q.get('guestType')||'local';
const fields={vehicle:$('vehicle'),passengers:$('passengers'),adults:$('adults'),children:$('children'),date:$('travelDate'),time:$('travelTime'),direction:$('direction'),destination:$('destination'),terminal:$('terminal'),stop:$('stopHours'),flight:$('flightNumber')};
const serviceLabel=service==='dolphin-tour'?tourName:service==='full-day-tour'?tourName: rental?'Car rental with driver':'Airport transfer';
$('summaryService').textContent=serviceLabel;
if(tour){
  $('summaryPackageRow').hidden=false;$('summaryPackage').textContent=q.get('packageLabel')||(packageType==='inclusive'?'All-Inclusive Tour':'Regular Private Tour');
  if(addonItems.length){$('summaryAddonsRow').hidden=false;$('summaryAddons').textContent=addonItems.map(a=>a.name||a.label||'Extra').join(', ');}
  $('passengersField').hidden=true;$('passengersField').querySelector('select').required=false;
  $('adultsField').hidden=false;$('childrenField').hidden=false;fields.adults.required=true;
  $('directionField').hidden=true;$('terminalField').hidden=true;$('stopField').hidden=true;$('flightField').hidden=true;
  fields.direction.required=false;fields.terminal.required=false;fields.stop.required=false;fields.flight.required=false;
  if(dolphinTour){fields.time.required=false;fields.time.value='';fields.time.closest('label').hidden=true;}
  $('locationLabel').innerHTML='Pickup area / accommodation <b>*</b>';
  fields.destination.placeholder='Hotel, villa or pickup area in Bali';
  $('summaryDuration').textContent=q.get('duration')||'Full day';
  $('bookingBack').href=q.get('back')||'./bali-private-day-tour.html';
  $('continueButton').innerHTML='Continue to guest details <span>→</span>';
  const guestCount=Math.max(1,Number(q.get('adults')||q.get('guests')||1));fields.adults.value=String(Math.min(14,guestCount));
  fields.children.value=String(Math.min(8,Math.max(0,Number(q.get('children')||0))));
}else if(rental){
  $('summaryDuration').textContent=q.get('duration')||'8 hours';
  $('bookingBack').href='./car-rental.html';$('locationLabel').innerHTML='Pickup location <b>*</b>';
  $('directionField').hidden=true;$('terminalField').hidden=true;fields.direction.required=false;
}else{
  $('summaryDuration').textContent='Not applicable';
}
const localISO=d=>{const x=new Date(d.getTime()-d.getTimezoneOffset()*60000);return x.toISOString().slice(0,10)};
const minBookingDate=()=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()+3);return d};
const earliestDate=localISO(minBookingDate());fields.date.min=earliestDate;
if(!q.get('date'))fields.date.value=earliestDate;
function validateBookingDate(showMessage=false){fields.date.setCustomValidity(fields.date.value&&fields.date.value<earliestDate?'Please choose a date at least three days from today.':'');if(showMessage&&!fields.date.checkValidity())fields.date.reportValidity();return fields.date.checkValidity()}
function updateDateAvailability(){const min=localISO(minBookingDate());fields.date.min=min;const old=!!fields.date.value&&fields.date.value<min;let status=$('dateAvailabilityStatus');if(!status){status=document.createElement('p');status.id='dateAvailabilityStatus';status.style.cssText='grid-column:1/-1;margin:-6px 0 2px;font-size:12px;line-height:1.6';fields.date.closest('label').insertAdjacentElement('afterend',status)}status.textContent=old?'This date is not eligible for a booking request. Please choose '+min+' or later.':'This date meets the 3-day booking notice. Final availability will be confirmed by our team.';status.style.color=old?'#a33d45':'#526b88';return !old}
fields.date.addEventListener('change',()=>{validateBookingDate();updateDateAvailability()});window.addEventListener('focus',updateDateAvailability);document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateDateAvailability()});
function setIf(el,val){if(val!==null&&val!==''&&el)el.value=val}
if(!tour)setIf(fields.vehicle,rental?(selectedVehicleName.includes('HiAce')?'Karoseri / HiAce':/Innova|Alphard/i.test(selectedVehicleName)?'Premium Car':'Regular Car'):q.get('vehicle'));
setIf(fields.passengers,q.get('passengers'));setIf(fields.date,q.get('date'));setIf(fields.time,q.get('time'));setIf(fields.direction,q.get('direction'));setIf(fields.destination,q.get('destination')||q.get('pickup'));setIf(fields.terminal,q.get('terminal'));if(q.get('mealStop')==='yes')setIf(fields.stop,q.get('mealHours')||'1');
function configureTourVehicle(){
  if(!dolphinTour)return;
  const adults=Math.max(1,Number(fields.adults.value||1));
  let children=Math.max(0,Number(fields.children.value||0));
  if(adults+children>14){children=Math.max(0,14-adults);fields.children.value=String(children);}
  const guests=adults+children,previous=fields.vehicle.value;
  fields.vehicle.innerHTML='';
  const addVehicle=(value,label)=>{const option=document.createElement('option');option.value=value;option.textContent=label;fields.vehicle.appendChild(option);};
  if(guests>=7){addVehicle('Minivan','Minivan');fields.vehicle.value='Karoseri / HiAce';}
  else{
    addVehicle('Regular Car','Regular Car');
    addVehicle('Premium Car','Premium Car');
    
    
    fields.vehicle.value=previous==='Premium Car'?'Premium Car':'Regular Car';
  }
}
if(dolphinTour){configureTourVehicle();}else if(tour){
  const vehicleCode=q.get('vehicle')||'avanza';
  const category=/hiace|bus|minivan/i.test(vehicleCode+' '+selectedVehicleName)?'Karoseri / HiAce':/innova|premium|zenix|reborn|fortuner|alphard/i.test(vehicleCode+' '+selectedVehicleName)?'Premium Car':'Regular Car';
  fields.vehicle.value=category;
  if(selectedVehicleName){const opt=[...fields.vehicle.options].find(o=>o.value===category);if(opt)opt.textContent=selectedVehicleName;}
}else if(fromAvailability){const option=[...fields.vehicle.options].find(o=>o.value===fields.vehicle.value);if(option&&selectedVehicleName)option.textContent=selectedVehicleName+' · '+option.textContent+' (selected)';fields.vehicle.disabled=true;const note=document.createElement('small');note.className='availability-locked-note';note.textContent='Vehicle locked from your availability search: '+(selectedVehicleName||fields.vehicle.value)+'. To change vehicles, return to the search results.';note.style.cssText='display:block;margin-top:7px;color:#526b88;font-size:12px;line-height:1.5';fields.vehicle.closest('label').appendChild(note)}
updateDateAvailability();
function guestCount(){return tour?Math.max(1,Number(fields.adults.value||1)+Number(fields.children.value||0)):Math.max(1,Number(fields.passengers.value||1))}
function syncTripSummary(){const selectedOption=fields.vehicle.options[fields.vehicle.selectedIndex];const vehicleName=dolphinTour?(selectedOption?selectedOption.textContent:fields.vehicle.value):((fromAvailability||rental||tour)&&selectedVehicleName?selectedVehicleName:fields.vehicle.value);$('summaryVehicle').textContent=vehicleName;$('summaryLocation').textContent=fields.destination.value.trim()||'Not set';const dateText=fields.date.value?(fields.date.value+(dolphinTour?'':(fields.time.value?' · '+fields.time.value:''))):'Not set';$('summaryDate').textContent=dateText;if(tour)$('summaryDuration').textContent=q.get('duration')||'Full day';}
[fields.vehicle,fields.destination,fields.date,fields.time,fields.adults,fields.children,fields.passengers].forEach(el=>el.addEventListener('input',syncTripSummary));
syncTripSummary();
const money=n=>'Rp '+Math.round(n).toLocaleString('id-ID'),moneyOrQuote=n=>n===null||n===undefined?'To be confirmed':money(n);
function calc(){
 if(tour){
   const guests=guestCount();
   let base=null;
   if(!dolphinTour&&Number.isFinite(selectedFare)&&selectedFare>0){base=selectedFare;}
   const extras=addonItems.reduce((sum,a)=>sum+Number(a.price||0)*(a.mode==='person'?guests:1),0);
   const fareLabel=$('baseFare').previousElementSibling;if(fareLabel)fareLabel.textContent=packageType==='inclusive'?'Package estimate':'Tour estimate';
   const stopLabel=$('stopFare').previousElementSibling;if(stopLabel)stopLabel.textContent='Selected extras';
   const note=$('totalFare').closest('.fare-breakdown').querySelector('p');
   if(base===null){
     $('baseFare').textContent='To be confirmed';$('stopFare').textContent=money(extras);$('totalFare').textContent='To be confirmed';$('summaryFare').textContent='To be confirmed';
     if(note)note.textContent='Share your trip details and our team will confirm the package price and final arrangements.';
     return {base:null,stop:extras,total:null};
   }
   const total=base+extras;
   $('baseFare').textContent=money(base);$('stopFare').textContent=money(extras);$('totalFare').textContent=money(total);$('summaryFare').textContent=money(total);
   if(note)note.textContent='Illustrative estimate based on the selected package and extras. The team will confirm the final arrangements.';
   return {base,stop:extras,total};
 }
 const v=fields.vehicle.value,base=fromAvailability&&Number.isFinite(selectedFare)&&selectedFare>0?selectedFare:(v.includes('Premium')?500000:v.includes('HiAce')?650000:350000),stop=Number(fields.stop.value||0)*50000;
 $('baseFare').textContent=money(base);$('stopFare').textContent=money(stop);$('totalFare').textContent=money(base+stop);$('summaryFare').textContent=money(base+stop);return {base,stop,total:base+stop};
}
[fields.vehicle,fields.stop].forEach(el=>el.addEventListener('change',calc));
fields.passengers.addEventListener('change',()=>{const pax=Number(fields.passengers.value);if(!fromAvailability){if(pax>5)fields.vehicle.value='Karoseri / HiAce';else if(fields.vehicle.value==='Karoseri / HiAce')fields.vehicle.value='Regular Car'}calc();});
[fields.adults,fields.children].forEach(el=>el.addEventListener('change',()=>{if(dolphinTour)configureTourVehicle();calc();syncTripSummary()}));
fields.direction.addEventListener('change',()=>{$('locationLabel').innerHTML=(fields.direction.value==='from'?'Destination / hotel':'Pickup location in Bali')+' <b>*</b>';fields.destination.placeholder=fields.direction.value==='from'?'Hotel, villa or area in Bali':'Hotel, villa or pickup area';});
function syncBookingFor(){const other=$('bookingFor').value==='someone-else';$('otherGuestFields').hidden=!other;$('travellerName').required=other;$('travellerPhone').required=other;const nameLabel=form.querySelector('[name="bookerName"]').closest('label').querySelector('span'),phoneLabel=form.querySelector('[name="bookerPhone"]').closest('label').querySelector('span');nameLabel.innerHTML=(other?'Booker full name':'Your full name')+' <b>*</b>';phoneLabel.innerHTML=(other?'Booker WhatsApp':'Your WhatsApp number')+' <b>*</b>';const heading=$('guestStage').querySelector('.form-section-title p');if(heading)heading.textContent=other?'Enter your contact details and the details of the person travelling.':'Enter your contact details. These will also be used as the traveller details for this trip.';}
$('bookingFor').addEventListener('change',syncBookingFor);syncBookingFor();
function stage(n){document.querySelectorAll('[data-stage]').forEach(el=>el.hidden=Number(el.dataset.stage)!==n);document.querySelectorAll('[data-progress]').forEach(el=>{el.classList.toggle('is-current',Number(el.dataset.progress)===n);el.classList.toggle('is-done',Number(el.dataset.progress)<n)});$('pageTitle').textContent=n===1?(tour?'Review your tour':'Review your trip'):'Guest details & payment';$('pageIntro').textContent=n===1?'Adjust the details below and review your estimated total before continuing.':'Check your contact details and choose how you would like to arrange payment.';window.scrollTo({top:0,behavior:'smooth'});}
$('continueButton').addEventListener('click',()=>{if(!validateBookingDate(true))return;const required=dolphinTour?[fields.adults,fields.date,fields.destination]:tour?[fields.adults,fields.date,fields.time,fields.destination]:[fields.vehicle,fields.passengers,fields.date,fields.time,fields.destination];for(const el of required)if(!el.checkValidity()){el.reportValidity();return}stage(2)});
$('backToTrip').addEventListener('click',()=>stage(1));
form.addEventListener('submit',e=>{e.preventDefault();if(!validateBookingDate(true)||!updateDateAvailability()||!form.reportValidity())return;const d=new FormData(form),fare=calc();const selectedVehicle=fields.vehicle.options[fields.vehicle.selectedIndex];d.set('vehicle',dolphinTour?(selectedVehicle?selectedVehicle.textContent:fields.vehicle.value):(selectedVehicleName||fields.vehicle.value));const dateText=dolphinTour?fields.date.value:fields.date.value+' at '+fields.time.value;const lines=['BALI TRANS | BOOKING REQUEST','━━━━━━━━━━━━━━━━━━━━','','TRIP DETAILS','Service: '+serviceLabel];
if(tour){lines.push('Tour: '+tourName,'Package: '+(q.get('packageLabel')||(packageType==='inclusive'?'All-Inclusive Tour':'Regular Private Tour')),'Adults: '+fields.adults.value,'Children: '+fields.children.value,'Guests: '+guestCount(),'Pickup area / accommodation: '+fields.destination.value,'Vehicle: '+(selectedVehicleName||fields.vehicle.value));if(addonItems.length)lines.push('Selected extras: '+addonItems.map(a=>(a.name||a.label)+' ('+money(Number(a.price||0))+')').join(', '));}
else{lines.push('Vehicle: '+(selectedVehicleName?selectedVehicleName+' ('+fields.vehicle.value+')':fields.vehicle.value),'Passengers: '+fields.passengers.value,'Direction: '+(rental?'Rental':fields.direction.value==='from'?'Airport to destination':'Destination to airport'),'Pickup / destination: '+fields.destination.value,'Airport terminal: '+(fields.terminal.value||'Not applicable'));}
lines.push(dolphinTour?'Travel date: '+dateText+' (pickup follows the published itinerary)':'Date & time: '+dateText,'','━━━━━━━━━━━━━━━━━━━━','','FARE ESTIMATE',(tour?'Package / tour estimate: ':'Transfer fare: ')+moneyOrQuote(fare.base),(tour?'Selected extras: ':'Extra stop: ')+moneyOrQuote(fare.stop),'ESTIMATED TOTAL: '+moneyOrQuote(fare.total),'Final fare: Pending confirmation','','━━━━━━━━━━━━━━━━━━━━','','CONTACT DETAILS','Booking for: '+d.get('bookingFor'),'Booker: '+d.get('bookerName'),'WhatsApp: '+d.get('bookerPhone'),'Email: '+(d.get('bookerEmail')||'Not provided'));
if(d.get('bookingFor')==='someone-else')lines.push('','TRAVELLER DETAILS','Traveller: '+d.get('travellerName'),'Traveller WhatsApp: '+d.get('travellerPhone'));else lines.push('','TRAVELLER DETAILS','Traveller: Same as booker','Traveller WhatsApp: Same as booker WhatsApp');
if(d.get('flightNumber'))lines.push('Flight number: '+d.get('flightNumber'));if(d.get('notes'))lines.push('Additional notes: '+d.get('notes'));lines.push('','━━━━━━━━━━━━━━━━━━━━','','PAYMENT','Preference: '+d.get('payment'),'','Please confirm availability, final fare and arrangements. This is a booking request, not a confirmed reservation.');location.href='https://wa.me/'+(window.BALI_TRANS_WHATSAPP_NUMBER||'628218187917')+'?text='+encodeURIComponent(lines.join('\n'));});
calc();
})();