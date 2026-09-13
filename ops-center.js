// Transportes Fenix - Centro Operativo
window.FENIX_OPS_CENTER = true;
window.addEventListener('load',()=>{
  if(!location.pathname.endsWith('admin.html')) return;
  const aside=document.querySelector('.shell aside');
  const main=document.querySelector('main.admin');
  if(!aside||!main) return;
  const tabs=[['operations','Centro operativo'],['routes','Rutas'],['operators','Operadores'],['maintenance','Mantenimiento'],['incidents','Incidencias']];
  tabs.forEach(([id,label])=>{
    if(document.querySelector(`[data-tab="${id}"]`)) return;
    const a=document.createElement('a');
    a.href='#';a.dataset.tab=id;a.textContent=label;
    a.onclick=e=>{e.preventDefault();document.querySelectorAll('aside a').forEach(x=>x.classList.remove('active'));a.classList.add('active');document.querySelectorAll('.adminSection').forEach(x=>x.classList.remove('active'));document.getElementById(id)?.classList.add('active');window[`loadFenix_${id}`]?.();};
    aside.appendChild(a);
  });
});
