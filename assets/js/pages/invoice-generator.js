const ids=['number','date','guest','phone','tour','traveldate','guests','pickup','packageprice','extras','discount','paid','status','paymentstatus','paymentmethod','notes'];
const el=id=>document.getElementById(id);
const money=n=>'IDR '+Math.max(0,Number(n)||0).toLocaleString('en-US');
const dateFmt=v=>{if(!v)return '—';const d=new Date(v+'T12:00:00');return isNaN(d)?v:d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});};
function val(id){return el(id).value.trim()}
function update(){
 const subtotal=Math.max(0,Number(val('packageprice'))||0)+Math.max(0,Number(val('extras'))||0);
 const total=Math.max(0,subtotal-Math.max(0,Number(val('discount'))||0));
 const paid=Math.max(0,Number(val('paid'))||0), balance=Math.max(0,total-paid);
 const status=val('status'), ps=val('paymentstatus');
 const map={'Pending':'PENDING','Confirmed':'CONFIRMED','Completed':'COMPLETED','Cancelled':'CANCELLED'};
 el('v-number').textContent=val('number')||'—';el('v-guest').textContent=val('guest')||'Guest name';
 el('v-phone').textContent=val('phone');el('v-date').textContent=dateFmt(val('date'));el('v-traveldate').textContent=dateFmt(val('traveldate'));
 el('v-tour').textContent=val('tour')||'Tour / service';el('v-tourdesc').textContent=val('tour')||'Tour / service';el('v-guests').textContent=val('guests');el('v-pickup').textContent=val('pickup')||'To be confirmed';
 el('v-packageprice').textContent=money(val('packageprice'));el('v-extras').textContent=money(val('extras'));el('v-discount').textContent='− '+money(val('discount'));el('v-total').textContent=money(total);el('v-paid').textContent=money(paid);el('v-balance').textContent=money(balance);
 el('v-paymentmethod').textContent=val('paymentmethod');el('v-notes').textContent=val('notes');el('v-paystatus').textContent='PAYMENT: '+ps.toUpperCase();
 const badge=el('v-status');badge.textContent=map[status]||status.toUpperCase();badge.className='status'+(status==='Completed'||ps==='Paid'?' paid':status==='Confirmed'?' confirmed':'');
}
ids.forEach(id=>el(id).addEventListener('input',update));ids.forEach(id=>el(id).addEventListener('change',update));
function createInvoiceLink(){
 const params=new URLSearchParams({n:val('number'),d:val('date'),g:val('guest'),ph:val('phone'),t:val('tour'),td:val('traveldate'),gu:val('guests'),pu:val('pickup'),pp:val('packageprice'),ex:val('extras'),di:val('discount'),pa:val('paid'),s:val('status'),ps:val('paymentstatus'),pm:val('paymentmethod'),nt:val('notes')});
 return new URL('./invoice.html?'+params.toString(),location.href).href;
}
async function copyInvoiceLink(){
 const link=createInvoiceLink();
 try{await navigator.clipboard.writeText(link);alert('Digital invoice link copied. Paste it into WhatsApp to share.');}
 catch(e){prompt('Copy this digital invoice link:',link);}
}
function shareWhatsApp(){
 update();
 const invoiceUrl=createInvoiceLink();
 const subtotal=Math.max(0,Number(val('packageprice'))||0)+Math.max(0,Number(val('extras'))||0);
 const total=Math.max(0,subtotal-Math.max(0,Number(val('discount'))||0));
 const paid=Math.max(0,Number(val('paid'))||0),balance=Math.max(0,total-paid);
 const lines=['*BALI TRANS | DIGITAL INVOICE*','', 'Dear '+(val('guest')||'Guest')+',','Thank you for choosing Bali Trans. Your digital invoice is available at the link below.','', '*Invoice:* '+(val('number')||'—'),'*Tour:* '+(val('tour')||'—'),'*Travel date:* '+dateFmt(val('traveldate')),'*Guests:* '+(val('guests')||'—'),'*Total:* '+money(total),'*Balance due:* '+money(balance),'*Booking status:* '+val('status'),'*Payment status:* '+val('paymentstatus'),'', 'View your invoice: '+invoiceUrl,'','Please contact us if you need any assistance.','', 'Kind regards,','*Bali Trans Team*'].filter(Boolean);
 const phone=val('phone').replace(/\\D/g,'');
 const url='https://wa.me/'+phone+'?text='+encodeURIComponent(lines.join('\\n'));
 window.open(url,'_blank','noopener');
}
function resetDemo(){
 const defaults={number:'BT-261024-001',date:'2026-10-24',guest:'Guest Name',phone:'',tour:'Lovina Dolphin Tour',traveldate:'2026-10-28',guests:'2 adults',pickup:'Hotel in Ubud',packageprice:'1200000',extras:'0',discount:'0',paid:'0',status:'Pending',paymentstatus:'Pending',paymentmethod:'Please contact Bali Trans via WhatsApp to confirm the available payment method.',notes:''};
 Object.entries(defaults).forEach(([k,v])=>el(k).value=v);update();
}
update();
