// Transportes Fenix - Centro Operativo
window.FENIX_OPS_CENTER = true;
function fenixOpsSection(id,html){
  if(document.getElementById(id)) return;
  const s=document.createElement('section');s.id=id;s.className='adminSection';s.innerHTML=html;
  document.querySelector('main.admin')?.appendChild(s);
}
const fenixOpsEsc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
window.loadFenix_operations=async()=>{
  const [sv,rt,mt,ic]=await Promise.all([
    sb.from('fenix_service_operations').select('*').not('status','in','(finalizado,cancelado)').order('scheduled_start',{ascending:true}).limit(25),
    sb.from('fenix_routes').select('id',{count:'exact',head:true}).eq('active',true),
    sb.from('fenix_maintenance').select('id',{count:'exact',head:true}).neq('status','completado'),
    sb.from('fenix_incidents').select('id',{count:'exact',head:true}).neq('status','cerrada')
  ]);
  document.getElementById('opsServices').textContent=(sv.data||[]).length;
  document.getElementById('opsRoutes').textContent=rt.count||0;
  document.getElementById('opsMaintenance').textContent=mt.count||0;
  document.getElementById('opsIncidents').textContent=ic.count||0;
  document.getElementById('opsServiceRows').innerHTML=(sv.data||[]).map(x=>`<div class="rowCard"><b>${fenixOpsEsc(x.service_folio||'Servicio')}</b><div>${fenixOpsEsc(x.origin||'—')} → ${fenixOpsEsc(x.destination||'—')}</div><div class="muted small">${fenixOpsEsc(x.client_name||'')} · ${fenixOpsEsc(x.status)}</div></div>`).join('')||'<p class="muted">Sin servicios operativos activos.</p>';
};
window.loadFenix_routes=async()=>{const {data,error}=await sb.from('fenix_routes').select('*').order('created_at',{ascending:false});document.getElementById('opsRouteRows').innerHTML=error?fenixOpsEsc(error.message):(data||[]).map(x=>`<div class="rowCard"><b>${fenixOpsEsc(x.name)}</b><div>${fenixOpsEsc(x.origin)} → ${fenixOpsEsc(x.destination)}</div><div class="muted small">${fenixOpsEsc(x.client_name||'')} · ${fenixOpsEsc(x.service_type||'')} · ${x.active?'Activa':'Inactiva'}</div></div>`).join('')||'<p class="muted">Sin rutas registradas.</p>';};
window.loadFenix_operators=async()=>{const {data,error}=await sb.from('fenix_operators').select('*').order('full_name');document.getElementById('opsOperatorRows').innerHTML=error?fenixOpsEsc(error.message):(data||[]).map(x=>`<div class="rowCard"><b>${fenixOpsEsc(x.full_name)}</b><div>${fenixOpsEsc(x.phone||'Sin teléfono')}</div><div class="muted small">Licencia: ${fenixOpsEsc(x.license_number||'—')} · ${fenixOpsEsc(x.status)}</div></div>`).join('')||'<p class="muted">Sin operadores registrados.</p>';};
window.loadFenix_maintenance=async()=>{const {data,error}=await sb.from('fenix_maintenance').select('*,fenix_vehicles(name)').order('scheduled_on',{ascending:false});document.getElementById('opsMaintenanceRows').innerHTML=error?fenixOpsEsc(error.message):(data||[]).map(x=>`<div class="rowCard"><b>${fenixOpsEsc(x.fenix_vehicles?.name||'Unidad')}</b><div>${fenixOpsEsc(x.maintenance_type)}</div><div class="muted small">${fenixOpsEsc(x.scheduled_on||'Sin fecha')} · ${fenixOpsEsc(x.status)} · ${typeof fmtMoney==='function'?fmtMoney(x.cost||0):x.cost||0}</div></div>`).join('')||'<p class="muted">Sin mantenimientos registrados.</p>';};
window.loadFenix_incidents=async()=>{const {data,error}=await sb.from('fenix_incidents').select('*,fenix_vehicles(name)').order('occurred_at',{ascending:false});document.getElementById('opsIncidentRows').innerHTML=error?fenixOpsEsc(error.message):(data||[]).map(x=>`<div class="rowCard"><b>${fenixOpsEsc(x.incident_type)}</b><div>${fenixOpsEsc(x.description)}</div><div class="muted small">${fenixOpsEsc(x.fenix_vehicles?.name||'Sin unidad')} · ${fenixOpsEsc(x.severity)} · ${fenixOpsEsc(x.status)}</div></div>`).join('')||'<p class="muted">Sin incidencias registradas.</p>';};
window.addEventListener('load',()=>{
  if(!location.pathname.endsWith('admin.html')) return;
  const aside=document.querySelector('.shell aside');
  const main=document.querySelector('main.admin');
  if(!aside||!main) return;
  fenixOpsSection('operations','<div class="eyebrow">Operación Fénix</div><h2>Centro operativo</h2><div class="grid4"><div class="stat"><strong id="opsServices">0</strong><span class="muted">Servicios activos</span></div><div class="stat"><strong id="opsRoutes">0</strong><span class="muted">Rutas activas</span></div><div class="stat"><strong id="opsMaintenance">0</strong><span class="muted">Mantenimientos pendientes</span></div><div class="stat"><strong id="opsIncidents">0</strong><span class="muted">Incidencias abiertas</span></div></div><div id="opsServiceRows" class="panel" style="margin-top:18px"></div>');
  fenixOpsSection('routes','<h2>Rutas</h2><div id="opsRouteRows" class="panel"></div>');
  fenixOpsSection('operators','<h2>Operadores</h2><div id="opsOperatorRows" class="panel"></div>');
  fenixOpsSection('maintenance','<h2>Mantenimiento</h2><div id="opsMaintenanceRows" class="panel"></div>');
  fenixOpsSection('incidents','<h2>Incidencias</h2><div id="opsIncidentRows" class="panel"></div>');
  const tabs=[['operations','Centro operativo'],['routes','Rutas'],['operators','Operadores'],['maintenance','Mantenimiento'],['incidents','Incidencias']];
  tabs.forEach(([id,label])=>{if(document.querySelector(`[data-tab="${id}"]`))return;const a=document.createElement('a');a.href='#';a.dataset.tab=id;a.textContent=label;a.onclick=e=>{e.preventDefault();document.querySelectorAll('aside a').forEach(x=>x.classList.remove('active'));a.classList.add('active');document.querySelectorAll('.adminSection').forEach(x=>x.classList.remove('active'));document.getElementById(id)?.classList.add('active');window[`loadFenix_${id}`]?.();};aside.appendChild(a);});
});
