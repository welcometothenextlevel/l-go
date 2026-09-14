document.documentElement.classList.add('js');

const body = document.body;
const base = body.dataset.base || '/';
const page = body.dataset.page || '';
const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  document.querySelectorAll('video[autoplay]').forEach(video => {
    video.removeAttribute('autoplay');
    video.pause();
  });
}

const header = document.querySelector('[data-header]');
if (header) {
  const setHeader = () => header.classList.toggle('scrolled', scrollY > 24);
  setHeader();
  addEventListener('scroll', setHeader, { passive:true });
}

const navKey = ['cours-de-conduite','moto','sensibilisation','premiers-secours','theorie'].includes(page) ? 'cours' : page === 'packs-tarifs' ? 'packs' : page;
document.querySelectorAll(`[data-nav="${navKey}"]`).forEach(link => link.classList.add('active'));

const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
function closeMenu() {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute('aria-expanded','false');
  menuToggle.setAttribute('aria-label','Ouvrir le menu');
  mobileMenu.setAttribute('aria-hidden','true');
  body.classList.remove('menu-open');
}
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded',String(!open));
    menuToggle.setAttribute('aria-label',open ? 'Ouvrir le menu' : 'Fermer le menu');
    mobileMenu.setAttribute('aria-hidden',String(open));
    body.classList.toggle('menu-open',!open);
    if (!open) mobileMenu.querySelector('a')?.focus();
  });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
}

addEventListener('keydown', event => {
  if (event.key === 'Escape') { closeMenu(); closeChat(); }
});

const revealItems = document.querySelectorAll('.reveal');
if (prefersReducedMotion || !('IntersectionObserver' in window)) revealItems.forEach(item=>item.classList.add('is-visible'));
else {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold:.12 });
  revealItems.forEach(item=>observer.observe(item));
}

const quick = document.querySelector('[data-quick-booking]');
if (quick) {
  const date = quick.elements.date;
  const today = new Date();
  date.min = formatDate(today);
  quick.addEventListener('submit', event => {
    event.preventDefault();
    if (!quick.reportValidity()) return;
    const values = Object.fromEntries(new FormData(quick));
    localStorage.setItem('lgo-booking', JSON.stringify(values));
    const query = new URLSearchParams(values);
    location.href = `${base}reservation/?${query}`;
  });
}

document.querySelectorAll('[data-demo-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    form.querySelector('.form-success').hidden = false;
    form.querySelector('button[type="submit"]').disabled = true;
    form.querySelector('.form-success').scrollIntoView({ behavior:prefersReducedMotion?'auto':'smooth', block:'center' });
  });
});

const chatPanel = document.querySelector('.chat-panel');
const chatOpen = document.querySelector('[data-chat-open]');
const chatClose = document.querySelector('[data-chat-close]');
const chatMessages = document.querySelector('[data-chat-messages]');
const chatForm = document.querySelector('[data-chat-form]');
const chatNudge = document.querySelector('[data-chat-nudge]');
let chatStarted = false;
let chatNudgeTimer;

function hideChatNudge() {
  if (!chatNudge) return;
  chatNudge.hidden = true;
  clearTimeout(chatNudgeTimer);
}

if (chatNudge && matchMedia('(max-width: 820px)').matches) {
  let alreadySeen = false;
  try { alreadySeen = sessionStorage.getItem('lgo-chat-nudge-seen') === 'true'; } catch {}
  if (!alreadySeen) {
    chatNudgeTimer = setTimeout(() => {
      if (chatPanel?.getAttribute('aria-hidden') !== 'false') {
        chatNudge.hidden = false;
        try { sessionStorage.setItem('lgo-chat-nudge-seen','true'); } catch {}
        chatNudgeTimer = setTimeout(hideChatNudge, 9000);
      }
    }, 30000);
  }
}

function openChat() {
  if (!chatPanel || !chatOpen) return;
  hideChatNudge();
  chatPanel.setAttribute('aria-hidden','false');
  chatOpen.setAttribute('aria-expanded','true');
  chatOpen.setAttribute('aria-label','Fermer l’assistant L-GO');
  body.classList.add('chat-open');
  if (!chatStarted) {
    addChatMessage('Salut 👋 Je suis l’assistant L-GO. Comment puis-je t’aider ?');
    chatStarted = true;
  }
  setTimeout(()=>chatForm?.elements.question?.focus(),120);
}
function closeChat() {
  if (!chatPanel || !chatOpen) return;
  chatPanel.setAttribute('aria-hidden','true');
  chatOpen.setAttribute('aria-expanded','false');
  chatOpen.setAttribute('aria-label','Ouvrir l’assistant L-GO');
  body.classList.remove('chat-open');
}
function addChatMessage(text, user=false, links=[]) {
  if (!chatMessages) return;
  const bubble = document.createElement('div');
  bubble.className = `chat-message${user?' user':''}`;
  bubble.textContent = text;
  if (links.length) {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;flex-wrap:wrap;gap:7px;margin-top:10px';
    links.forEach(([label,href]) => {
      const link = document.createElement('a');
      link.href = href; link.textContent = label;
      link.style.cssText = 'border-bottom:1px solid currentColor;font-weight:600';
      row.append(link);
    });
    bubble.append(row);
  }
  chatMessages.append(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function botReply(text, links=[]) {
  if (!chatMessages) return;
  const typing = document.createElement('div');
  typing.className = 'chat-message typing';
  typing.innerHTML = '<i></i><i></i><i></i>';
  chatMessages.append(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  setTimeout(()=>{ typing.remove(); addChatMessage(text,false,links); }, prefersReducedMotion?0:420);
}
const chatResponses = {
  reservation:['Choisis ton service, puis une date et une heure dans notre calendrier de démonstration.',[['Réserver',`${base}reservation/`]]],
  packs:['L-GO publie quatre packs à CHF 300, CHF 450, CHF 720 et CHF 1’000.',[['Voir les packs',`${base}packs-tarifs/`],['Réserver',`${base}reservation/`]]],
  conduite:['Les cours de conduite travaillent la position sur la route, les commandes et la maniabilité en situations variées.',[['Voir les cours',`${base}cours-de-conduite/`],['Réserver',`${base}reservation/?service=cours-de-conduite`]]],
  moto:['Les cours moto portent sur l’équilibre, la maniabilité, le changement de vitesse et le contrôle du deux-roues.',[['Voir le cours',`${base}moto/`],['Réserver',`${base}reservation/?service=moto`]]],
  secours:['Le cours publié couvre les gestes de premiers secours essentiels, y compris la réanimation.',[['Découvrir',`${base}premiers-secours/`],['Réserver',`${base}reservation/?service=premiers-secours`]]],
  sensibilisation:['Le cours aborde les conséquences de l’alcool, de la fatigue et des distractions.',[['Découvrir',`${base}sensibilisation/`],['Réserver',`${base}reservation/?service=sensibilisation`]]],
  contact:['Tu peux appeler L-GO au 079 913 63 99 ou utiliser la page contact.',[['Contacter L-GO',`${base}contact/`]]],
};
document.querySelectorAll('[data-chat-action]').forEach(button => button.addEventListener('click',()=>{
  const key = button.dataset.chatAction;
  addChatMessage(button.textContent,true);
  botReply(...chatResponses[key]);
}));
chatOpen?.addEventListener('click',()=>chatPanel?.getAttribute('aria-hidden')==='false'?closeChat():openChat());
chatNudge?.addEventListener('click',openChat);
chatClose?.addEventListener('click',closeChat);
chatForm?.addEventListener('submit',event=>{
  event.preventDefault();
  const input = chatForm.elements.question;
  const value = input.value.trim();
  if (!value) return;
  addChatMessage(value,true); input.value='';
  const term = value.toLowerCase();
  const key = term.includes('moto')?'moto':term.includes('secour')?'secours':term.includes('sensib')||term.includes('alcool')||term.includes('fatigue')?'sensibilisation':term.includes('prix')||term.includes('tarif')||term.includes('pack')?'packs':term.includes('réserv')||term.includes('date')||term.includes('heure')?'reservation':term.includes('condu')||term.includes('voiture')?'conduite':term.includes('contact')||term.includes('téléphone')?'contact':null;
  if (key) botReply(...chatResponses[key]); else botReply('Je peux t’aider avec les cours, les tarifs, les moniteurs ou une réservation.');
});

const wizard = document.querySelector('[data-booking-wizard]');
if (wizard) initBooking(wizard);

function initBooking(form) {
  const params = new URLSearchParams(location.search);
  let stored = {};
  try { stored = JSON.parse(localStorage.getItem('lgo-booking') || '{}'); } catch {}
  let state = {
    service:params.get('service') || stored.service || '',
    instructor:'', date:params.get('date') || stored.date || '', time:'', step:1,
  };
  let month = new Date(); month = new Date(month.getFullYear(),month.getMonth(),1);
  const serviceInput = state.service && form.querySelector(`input[name="booking-service"][value="${CSS.escape(state.service)}"]`);
  if (serviceInput) serviceInput.checked = true;
  renderCalendar();
  updateStep();

  form.querySelector('[data-booking-next]').addEventListener('click',next);
  form.querySelector('[data-booking-back]').addEventListener('click',back);
  form.querySelector('[data-booking-reset]').addEventListener('click',()=>{ localStorage.removeItem('lgo-booking'); location.href=`${base}reservation/`; });
  form.querySelector('[data-month-prev]').addEventListener('click',()=>{ month=new Date(month.getFullYear(),month.getMonth()-1,1);renderCalendar(); });
  form.querySelector('[data-month-next]').addEventListener('click',()=>{ month=new Date(month.getFullYear(),month.getMonth()+1,1);renderCalendar(); });
  form.addEventListener('change',()=>{ form.querySelector('[data-booking-error]').textContent=''; });

  function relevantInstructor() { return ['cours-de-conduite','moto'].includes(state.service); }
  function visibleSteps() { return relevantInstructor() ? [1,2,3,4,5,6] : [1,3,4,5,6]; }
  function syncState() {
    state.service = form.elements['booking-service']?.value || state.service;
    state.instructor = form.elements['booking-instructor']?.value || '';
    state.time = form.elements['booking-time']?.value || '';
  }
  function validate() {
    syncState(); let message='';
    if (state.step===1 && !state.service) message='Choisis un service pour continuer.';
    if (state.step===2 && relevantInstructor() && !state.instructor) message='Choisis un moniteur ou “Premier disponible”.';
    if (state.step===3 && !state.date) message='Choisis une date disponible.';
    if (state.step===4 && !state.time) message='Choisis un créneau horaire.';
    if (state.step===5) {
      const fields = [...form.querySelectorAll('[data-step="5"] input[required]')];
      const invalid = fields.find(field=>!field.checkValidity());
      if (invalid) { invalid.reportValidity(); message='Complète les coordonnées demandées.'; }
    }
    form.querySelector('[data-booking-error]').textContent=message;
    return !message;
  }
  function next() {
    if (!validate()) return;
    if (state.step===6) { state.step=7; updateStep(); return; }
    const steps=visibleSteps(); const index=steps.indexOf(state.step); state.step=steps[index+1] || 6;
    if (state.step===6) renderReview();
    persist(); updateStep();
  }
  function back() {
    const steps=visibleSteps(); const index=steps.indexOf(state.step); state.step=steps[Math.max(0,index-1)] || 1; updateStep();
  }
  function updateStep() {
    form.querySelectorAll('[data-step]').forEach(section=>section.classList.toggle('is-active',Number(section.dataset.step)===state.step));
    const steps=visibleSteps(); const visibleIndex=Math.max(0,steps.indexOf(state.step));
    const current = state.step===7?steps.length:visibleIndex+1;
    document.querySelector('[data-step-number]').textContent=String(current);
    document.querySelector('.booking-top small').innerHTML=`Étape <span data-step-number>${current}</span> sur ${steps.length}`;
    document.querySelector('[data-progress]').style.width=`${(current/steps.length)*100}%`;
    const controls=form.querySelector('[data-booking-controls]'); controls.hidden=state.step===7;
    const backButton=form.querySelector('[data-booking-back]'); backButton.style.visibility=state.step===1?'hidden':'visible';
    const nextButton=form.querySelector('[data-booking-next]'); nextButton.innerHTML=state.step===6?'Confirmer la démo <span>✓</span>':'Continuer <span>→</span>';
    form.querySelector('[data-booking-error]').textContent='';
    scrollTo({top:0,behavior:prefersReducedMotion?'auto':'smooth'});
  }
  function renderCalendar() {
    const label = form.querySelector('[data-month-label]'); const grid=form.querySelector('[data-calendar-grid]');
    const names=['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'];
    label.textContent=new Intl.DateTimeFormat('fr-CH',{month:'long',year:'numeric'}).format(month);
    grid.replaceChildren();
    ['L','M','M','J','V','S','D'].forEach(day=>{const el=document.createElement('span');el.textContent=day;grid.append(el)});
    const first=(month.getDay()+6)%7; for(let i=0;i<first;i++)grid.append(document.createElement('span'));
    const days=new Date(month.getFullYear(),month.getMonth()+1,0).getDate(); const today=new Date(); today.setHours(0,0,0,0);
    for(let day=1;day<=days;day++){
      const date=new Date(month.getFullYear(),month.getMonth(),day); const button=document.createElement('button');button.type='button';button.textContent=String(day);
      const available=date>=today && date.getDay()!==0 && (day+date.getMonth())%3!==0;
      button.disabled=!available; if(available)button.className='available';
      const iso=formatDate(date); if(iso===state.date)button.classList.add('selected');
      button.setAttribute('aria-label',`${names[date.getDay()]} ${day} ${label.textContent}${available?' disponible':' indisponible'}`);
      button.addEventListener('click',()=>{state.date=iso;renderCalendar();form.querySelector('[data-booking-error]').textContent='';});grid.append(button);
    }
  }
  function renderReview() {
    syncState(); const data=[['Service',labelForService(state.service)],['Moniteur',relevantInstructor()?(state.instructor||'Premier disponible'):'Non applicable'],['Date',new Intl.DateTimeFormat('fr-CH',{dateStyle:'long'}).format(new Date(`${state.date}T12:00:00`))],['Heure',state.time],['Nom',`${form.elements.firstname.value} ${form.elements.lastname.value}`],['Téléphone',form.elements.phone.value],['Email',form.elements.email.value]];
    const review=form.querySelector('[data-booking-review]');review.replaceChildren();data.forEach(([key,value])=>{const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=key;dd.textContent=value;row.append(dt,dd);review.append(row)});
  }
  function persist(){localStorage.setItem('lgo-booking',JSON.stringify({service:state.service,date:state.date,time:state.time,instructor:state.instructor}))}
}

function labelForService(slug){return ({'cours-de-conduite':'Cours de conduite','moto':'Cours de moto','sensibilisation':'Cours de sensibilisation','premiers-secours':'Premiers secours','theorie':'Cours de théorie'})[slug]||slug}
function formatDate(date){const y=date.getFullYear(),m=String(date.getMonth()+1).padStart(2,'0'),d=String(date.getDate()).padStart(2,'0');return `${y}-${m}-${d}`}
