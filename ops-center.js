// Transportes Fenix - Centro Operativo
window.FENIX_OPS_CENTER = true;
function fenixOpsSection(id,html){
  if(document.getElementById(id)) return;
  const s=document.createElement('section');s.id=id;s.className='adminSection';s.innerHTML=html;
  document.querySelector('main.admin')?.appendChild(s);
}
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
  tabs.forEach(([id,label])=>{
    if(document.querySelector(`[data-tab="${id}"]`)) return;
    const a=document.createElement('a');
    a.href='#';a.dataset.tab=id;a.textContent=label;
    a.onclick=e=>{e.preventDefault();document.querySelectorAll('aside a').forEach(x=>x.classList.remove('active'));a.classList.add('active');document.querySelectorAll('.adminSection').forEach(x=>x.classList.remove('active'));document.getElementById(id)?.classList.add('active');window[`loadFenix_${id}`]?.();};
    aside.appendChild(a);
  });
});
