const q=new URLSearchParams(location.search),get=k=>q.get(k)||'',num=k=>Math.max(0,Number(get(k))||0),money=n=>'IDR '+n.toLocaleString('en-US');
function fmt(s){if(!s)return '—';const d=new Date(s+'T12:00:00');return isNaN(d)?s:d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}
if(!get('n')&&!get('g')&&!get('t')){document.getElementById('sheet').style.display='none';document.getElementById('empty').style.display='block'}
const set=(id,v)=>document.getElementById(id).textContent=v;
set('number',get('n')||'—');set('guest',get('g')||'Guest');set('phone',get('ph'));set('date',fmt(get('d')));set('traveldate',fmt(get('td')));set('tour',get('t')||'Tour / service');set('tourdesc',get('t'));set('guests',get('gu') );set('pickup',get('pu')||'To be confirmed');
const subtotal=num('pp')+num('ex'),total=Math.max(0,subtotal-num('di')),paid=num('pa'),balance=Math.max(0,total-paid);
set('packageprice',money(num('pp')));set('extras',money(num('ex')));set('discount','− '+money(num('di')));set('total',money(total));set('paid',money(paid));set('balance',money(balance));set('paymentmethod',get('pm')||'Please contact Bali Trans to confirm the available payment method.');set('notes',get('nt'));set('paystatus','PAYMENT: '+(get('ps')||'Pending').toUpperCase());
const st=get('s')||'Pending';set('status',st.toUpperCase());document.getElementById('status').className='pill'+(st==='Confirmed'?' confirmed':(st==='Completed'||get('ps')==='Paid'?' paid':''));
