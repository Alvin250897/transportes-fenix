
const cfg=window.FENIX_CONFIG;
const sb=supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_KEY);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const fmtMoney=n=>n==null?'':new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(Number(n));
const fmtDate=d=>d?new Intl.DateTimeFormat('es-MX',{dateStyle:'medium',timeStyle:'short'}).format(new Date(d)):'';
async function getSessionUser(){const {data:{user}}=await sb.auth.getUser();return user}
async function getProfile(user){if(!user)return null;const {data,error}=await sb.from('fenix_profiles').select('*').eq('id',user.id).maybeSingle();if(error)throw error;return data}
async function uploadImage(file,folder='general'){if(!file)return null;const ext=(file.name.split('.').pop()||'jpg').toLowerCase();const path=`${folder}/${crypto.randomUUID()}.${ext}`;const {error}=await sb.storage.from(cfg.MEDIA_BUCKET).upload(path,file,{upsert:false});if(error)throw error;return sb.storage.from(cfg.MEDIA_BUCKET).getPublicUrl(path).data.publicUrl}
