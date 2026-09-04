window.FENIX_CONFIG = {
  SUPABASE_URL: 'https://aassmaezosiyjypbqjuu.supabase.co',
  SUPABASE_KEY: 'sb_publishable_5azdHtmeQw-1YwGz0_7lyw_54WY8kxv',
  MEDIA_BUCKET: 'fenix-media',
  SITE_URL: 'https://transportes-fenix.vercel.app'
};
window.addEventListener('load',()=>{
  const s=document.createElement('script');
  s.src='fenix-fix.js';
  s.onload=()=>{
    if(typeof fenixLoadCosts==='function') window.loadQuoteCosts=fenixLoadCosts;
    if(typeof fenixFinance==='function') window.loadFinance=fenixFinance;
  };
  document.body.appendChild(s);
});
