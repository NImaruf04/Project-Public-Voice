const modal = document.querySelector('#complaintModal');
const formModal = document.querySelector('#formModal');
const accountModal = document.querySelector('#accountModal');
const notificationModal = document.querySelector('#notificationModal');
const sidebarSize = document.querySelector('#sidebarSize');
const sidebarSizeValue = document.querySelector('#sidebarSizeValue');
const sampleEvidence = {
  'পানির সমস্যার ছবি.jpg': { type: 'image/svg+xml', data: 'assets/water-complaint.svg', size: 'ছবি' },
  'ভাঙা রাস্তার ছবি.jpg': { type: 'image/svg+xml', data: 'assets/road-complaint.svg', size: 'ছবি' }
};
const toast = document.querySelector('#toast');
const list = document.querySelector('#complaintList');
const languageSelector = document.querySelector('#languageSelector');
let currentLanguage = localStorage.getItem('publicVoiceLanguage') || 'bn';

const translations = {
  en: {
    dashboard: 'Dashboard', myComplaints: 'My complaints', newComplaint: 'New complaint', notifications: 'Notifications',
    help: 'Need help?', hotline: 'Hotline 333 · 24 hours', citizenAccount: 'Citizen account', portal: 'CITIZEN COMPLAINT PORTAL',
    heroTitle: 'Make your voice reach<br />the right place.', heroText: 'File a complaint, see its progress, and stay with every step towards a solution.',
    submitNew: '+ Submit a complaint', total: 'Total complaints', inProgress: 'In progress', solved: 'Resolved',
    recent: 'My recent complaints', recentSub: 'The latest status of your complaints', viewAll: 'View all',
    'অ্যাকাউন্ট খুলুন': 'Create account', 'অ্যাকাউন্ট': 'Account', 'তদন্ত চলছে': 'Investigation in progress', 'সিদ্ধান্তের অপেক্ষায়': 'Awaiting decision',
    'ধাপ ৩ / ৫': 'Step 3 / 5', 'তদন্ত কর্মকর্তা: ইঞ্জি. নাজমুল হক': 'Investigator: Eng. Nazmul Haque',
    'ধাপ ৪ / ৫': 'Step 4 / 5', 'ইউএনও কার্যালয়ে সিদ্ধান্তের জন্য প্রেরিত': 'Sent to the UNO office for a decision',
    'আমাদের এলাকায় বিশুদ্ধ পানির সংকট': 'Shortage of safe water in our area', 'পর্যালোচনায়': 'Under review',
    'জমা: ১৮ সেপ্টেম্বর, ২০২৬': 'Submitted: 18 September, 2026', 'ধাপ ২ / ৪': 'Step 2 / 4',
    'উপজেলা জনস্বাস্থ্য প্রকৌশল অধিদপ্তর': 'Upazila Public Health Engineering Department', 'বিস্তারিত': 'Details',
    'সড়কের ভাঙা অংশ মেরামতের আবেদন': 'Request to repair damaged road section', 'প্রেরিত হয়েছে': 'Forwarded',
    'জমা: ১২ সেপ্টেম্বর, ২০২৬': 'Submitted: 12 September, 2026', 'ধাপ ৩ / ৪': 'Step 3 / 4',
    'জেলা সড়ক ও জনপথ বিভাগে প্রেরিত': 'Forwarded to the District Roads and Highways Department',
    'রাস্তার বাতি অকেজো থাকার অভিযোগ': 'Complaint about non-functioning street lights', 'সমাধান হয়েছে': 'Resolved',
    'জমা: ০২ সেপ্টেম্বর, ২০২৬': 'Submitted: 02 September, 2026', 'সমাধান:': 'Resolution:', '৮টি নতুন LED বাতি স্থাপন করা হয়েছে': '8 new LED lights have been installed',
    'অভিযোগের অগ্রগতি': 'COMPLAINT PROGRESS', 'অভিযোগ গ্রহণ করা হয়েছে': 'Complaint received',
    'নাগরিক সেবা কেন্দ্র': 'Citizen Service Centre', 'বিষয়টি পর্যালোচনায় আছে': 'The matter is under review',
    'জনস্বাস্থ্য প্রকৌশল অধিদপ্তর': 'Public Health Engineering Department', 'দায়িত্বপ্রাপ্ত: ইঞ্জি. নাজমুল হক': 'Assigned to: Eng. Nazmul Haque',
    'সরেজমিন তদন্ত ও ব্যবস্থা': 'On-site inspection and action', 'পরবর্তী ধাপ': 'Next step',
    'সমাধান ও আপনার মতামত': 'Resolution and your feedback', 'চূড়ান্ত ধাপ': 'Final step',
    'সময়মতো সমাধান না হলে কী হবে?': 'What happens if it is not resolved on time?',
    'নির্ধারিত সময় পার হলে অভিযোগটি স্বয়ংক্রিয়ভাবে ঊর্ধ্বতন কর্তৃপক্ষের কাছে পাঠানো হবে।': 'After the deadline, the complaint will be automatically sent to the higher authority.',
    'অগ্রগতির আপডেট চাই': 'Request a progress update', 'নাগরিক সেবা': 'CITIZEN SERVICE', 'নতুন অভিযোগ জানান': 'Submit a new complaint',
    'সঠিক তথ্য দিলে আমরা দ্রুত সঠিক কর্তৃপক্ষের কাছে পৌঁছে দিতে পারব।': 'Accurate information helps us reach the right authority faster.',
    'অভিযোগের বিষয়': 'Complaint subject', 'বিভাগ নির্বাচন করুন': 'Choose a department', 'বিস্তারিত লিখুন': 'Write the details',
    'ছবি বা নথি যুক্ত করুন': 'Attach photos or documents', 'ছবি, PDF বা Word ফাইল · সর্বোচ্চ ১০ MB': 'Images, PDF or Word files · Maximum 10 MB',
    'অভিযোগ জমা দিন': 'Submit complaint', 'আপনার অভিযোগটি সফলভাবে জমা হয়েছে।': 'Your complaint has been submitted successfully.',
    'তদন্ত কর্মকর্তা নিয়োগ করা হয়েছে': 'An investigating officer has been assigned', 'সরেজমিন তদন্ত চলছে': 'On-site investigation in progress',
    'প্রমাণ যাচাই ও সংশ্লিষ্ট পক্ষের বক্তব্য নেওয়া হচ্ছে': 'Evidence is being verified and statements are being collected.',
    'কর্তৃপক্ষের সিদ্ধান্ত / বিচার': 'Authority decision / adjudication', 'তদন্ত প্রতিবেদন পর্যালোচনা করে আদেশ দেওয়া হবে': 'An order will be issued after reviewing the investigation report.',
    'আদেশ বাস্তবায়ন ও সমাপ্তি': 'Order implementation and closure', 'ফলাফল দেখে আপনি মতামত জানাতে পারবেন': 'You can provide feedback after reviewing the result.',
    'নিবন্ধন': 'REGISTRATION', 'নতুন অ্যাকাউন্ট খুলুন': 'Create a new account',
    'আপনার ভূমিকা বাছাই করুন। নাগরিক অভিযোগ জানাতে পারবেন, আর অনুমোদিত কর্তৃপক্ষ অভিযোগ তদন্ত ও সিদ্ধান্ত দিতে পারবেন।': 'Choose your role. Citizens can submit and monitor complaints; verified authorities can investigate and issue decisions.',
    'পূর্ণ নাম': 'Full name', 'মোবাইল নম্বর': 'Mobile number', 'আপনার ভূমিকা': 'Your role', 'কর্তৃপক্ষের ধরন': 'Authority type',
    'অ্যাকাউন্ট তৈরি করুন': 'Create account', 'নাগরিক — অভিযোগ জানাবেন ও অগ্রগতি দেখবেন': 'Citizen — submit complaints and see progress',
    'কর্তৃপক্ষ — তদন্ত, প্রতিবেদন ও সিদ্ধান্ত দেবেন': 'Authority — investigate, report and issue decisions',
    'ইউএনও কার্যালয়': 'UNO office', 'পুলিশ': 'Police', 'ভোক্তা অধিকার': 'Consumer Rights', 'স্থানীয় সরকার': 'Local Government'
  }
};

function translatePage() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = currentLanguage === 'en' ? translations.en[el.dataset.i18n] : el.dataset.i18nValue || el.textContent; });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = currentLanguage === 'en' ? translations.en[el.dataset.i18nHtml] : 'আপনার কথা পৌঁছাক<br>সঠিক জায়গায়।'; });
  if (currentLanguage === 'bn') document.querySelectorAll('[data-i18n]').forEach(el => { if (!el.dataset.i18nValue) el.dataset.i18nValue = el.textContent; el.textContent = el.dataset.i18nValue; });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    const key = node.nodeValue.trim(); if (!key) return;
    if (!node.dataset) node.__bnText = node.__bnText || key;
    const bn = node.__bnText || key;
    if (currentLanguage === 'en' && translations.en[bn]) node.nodeValue = node.nodeValue.replace(key, translations.en[bn]);
    if (currentLanguage === 'bn' && node.__bnText) node.nodeValue = node.nodeValue.replace(key, node.__bnText);
  });
}

function updateClock() {
  const now = new Date(); const hour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dhaka', hour: 'numeric', hour12: false }).format(now));
  const greeting = currentLanguage === 'en' ? (hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : hour < 20 ? 'Good evening' : 'Good night') : (hour < 12 ? 'শুভ সকাল' : hour < 17 ? 'শুভ দুপুর' : hour < 20 ? 'শুভ সন্ধ্যা' : 'শুভ রাত্রি');
  const locale = currentLanguage === 'en' ? 'en-GB' : 'bn-BD';
  document.querySelector('#timeGreeting').textContent = greeting;
  document.querySelector('#liveDateTime').textContent = new Intl.DateTimeFormat(locale, { timeZone: 'Asia/Dhaka', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(now);
}

languageSelector.value = currentLanguage;
languageSelector.addEventListener('change', () => { currentLanguage = languageSelector.value; localStorage.setItem('publicVoiceLanguage', currentLanguage); translatePage(); updateClock(); });
translatePage(); updateClock(); setInterval(updateClock, 1000);

const savedSidebarSize = localStorage.getItem('publicVoiceSidebarSize') || sidebarSize.value;
function setSidebarSize(size) { document.documentElement.style.setProperty('--sidebar-width', `${size}px`); sidebarSize.value = size; sidebarSizeValue.textContent = `${size}px`; }
setSidebarSize(savedSidebarSize);
sidebarSize.addEventListener('input', () => { setSidebarSize(sidebarSize.value); localStorage.setItem('publicVoiceSidebarSize', sidebarSize.value); });

function openModal(target) { target.classList.add('show'); target.setAttribute('aria-hidden', 'false'); }
function closeModal(target) { target.classList.remove('show'); target.setAttribute('aria-hidden', 'true'); }
function escapeHtml(value) { return value.replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char])); }
function renderEvidence(attachments) {
  const evidenceList = document.querySelector('#evidenceList');
  if (!attachments.length) { evidenceList.innerHTML = '<p class="no-evidence">এই অভিযোগে কোনো ছবি বা নথি যুক্ত করা হয়নি।</p>'; return; }
  evidenceList.innerHTML = attachments.map(item => item.data && item.type.startsWith('image/')
    ? `<a class="evidence-card image-evidence" href="${item.data}" target="_blank"><img src="${item.data}" alt="${escapeHtml(item.name)}"><span>${escapeHtml(item.name)}</span></a>`
    : `<div class="evidence-card"><b>${item.name.endsWith('.pdf') ? 'PDF' : 'DOC'}</b><span>${escapeHtml(item.name)}</span><small>${item.size || 'সংযুক্ত নথি'}</small></div>`).join('');
}
function openComplaintDetails(card) {
  document.querySelector('#modalTitle').textContent = card.querySelector('h3').textContent;
  document.querySelector('#modalId').textContent = card.dataset.id;
  let description = document.querySelector('#complaintDescription');
  if (!description) {
    const section = document.createElement('section'); section.className = 'complaint-description';
    section.innerHTML = '<h3>অভিযোগের বিস্তারিত</h3><p id="complaintDescription"></p>';
    document.querySelector('.evidence-section').before(section); description = section.querySelector('p');
  }
  description.textContent = card.dataset.description || 'এই অভিযোগের বিস্তারিত বিবরণ সংযুক্ত করা হয়নি।';
  const uploaded = card._attachments || [];
  const sample = (card.dataset.attachments || '').split('|').filter(Boolean).map(name => ({ name, ...(sampleEvidence[name] || { type: 'application/pdf', size: 'সংযুক্ত নথি' }) }));
  renderEvidence(uploaded.length ? uploaded : sample); openModal(modal);
}
function readFile(file) { return new Promise(resolve => { const reader = new FileReader(); reader.onload = () => resolve({ name: file.name, type: file.type || 'application/octet-stream', size: `${Math.ceil(file.size / 1024)} KB`, data: reader.result }); reader.readAsDataURL(file); }); }
function incrementCount(element) { const bn = '০১২৩৪৫৬৭৮৯'; const value = [...element.textContent].map(char => bn.includes(char) ? bn.indexOf(char) : char).join(''); element.textContent = String(Number(value) + 1).replace(/\d/g, digit => bn[digit]); }
document.querySelectorAll('.close').forEach(button => button.addEventListener('click', () => closeModal(button.closest('.modal'))));
document.querySelectorAll('.modal').forEach(layer => layer.addEventListener('click', e => { if(e.target === layer) closeModal(layer); }));
document.querySelectorAll('.details').forEach(button => button.addEventListener('click', () => openComplaintDetails(button.closest('.complaint-card'))));
document.querySelectorAll('a[href="#new-complaint"]').forEach(link => link.addEventListener('click', e => { e.preventDefault(); openModal(formModal); }));
function setActiveNav(link) { document.querySelectorAll('.sidebar nav a').forEach(item => item.classList.remove('active')); link.classList.add('active'); }
document.querySelector('#navDashboard').addEventListener('click', () => setActiveNav(document.querySelector('#navDashboard')));
document.querySelector('#navComplaints').addEventListener('click', e => {
  e.preventDefault(); setActiveNav(e.currentTarget); showComplaintsPage();
});
document.querySelector('#navNewComplaint').addEventListener('click', e => setActiveNav(e.currentTarget));
document.querySelector('#navNotifications').addEventListener('click', e => {
  e.preventDefault(); setActiveNav(e.currentTarget); openModal(notificationModal);
  const badge = e.currentTarget.querySelector('.orange'); if (badge) badge.textContent = '0';
});
const dashboardComplaintSection = document.querySelector('#dashboardComplaintSection');
const myComplaintsPage = document.querySelector('#myComplaintsPage');
const myComplaintMount = document.querySelector('#myComplaintMount');
function showComplaintsPage() {
  document.querySelector('#dashboard').hidden = true;
  document.querySelector('.stats').hidden = true;
  myComplaintMount.append(dashboardComplaintSection);
  myComplaintsPage.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function showDashboard() {
  document.querySelector('#dashboard').hidden = false;
  document.querySelector('.stats').hidden = false;
  myComplaintsPage.before(dashboardComplaintSection);
  myComplaintsPage.hidden = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.querySelector('#navDashboard').addEventListener('click', showDashboard);
document.querySelector('#viewAll').addEventListener('click', showComplaintsPage);
document.querySelector('#backToDashboard').addEventListener('click', () => { setActiveNav(document.querySelector('#navDashboard')); showDashboard(); });
document.querySelector('#openAccount').addEventListener('click', () => openModal(accountModal));
const accountRole = document.querySelector('#accountRole');
const authorityType = document.querySelector('#authorityType');
const identityType = document.querySelector('#identityType');
const identityNumberLabel = document.querySelector('#identityNumberLabel');
function updateRoleFields() { authorityType.classList.toggle('is-hidden', accountRole.value !== 'authority'); }
accountRole.addEventListener('change', updateRoleFields); updateRoleFields();
function updateIdentityFields() {
  const birth = identityType.value === 'birth';
  identityNumberLabel.firstChild.textContent = birth ? 'জন্ম নিবন্ধন নম্বর' : 'NID নম্বর';
  document.querySelector('#identityNumber').placeholder = birth ? '১৭ সংখ্যার জন্ম নিবন্ধন নম্বর' : '১০ বা ১৭ সংখ্যার NID নম্বর';
}
identityType.addEventListener('change', updateIdentityFields); updateIdentityFields();
document.querySelector('#accountForm').addEventListener('submit', e => {
  e.preventDefault();
  closeModal(accountModal);
  toast.textContent = 'আপনার পরিচয়পত্র ও account আবেদন যাচাইয়ের জন্য পাঠানো হয়েছে।';
  toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3500);
  e.target.reset(); updateRoleFields();
});
document.querySelector('#complaintForm').addEventListener('submit', async e => {
  e.preventDefault();
  const subject = document.querySelector('#subject').value.trim();
  const dept = document.querySelector('#department').value;
  const description = document.querySelector('#complaintForm textarea').value.trim();
  const attachments = await Promise.all([...document.querySelector('#evidenceFiles').files].map(readFile));
  const code = `GV-2026-${String(Math.floor(Math.random()*9000)+1000)}`;
  const card = document.createElement('article');
  card.className = 'complaint-card'; card.dataset.id = code;
  card.dataset.description = description;
  card._attachments = attachments;
  card.innerHTML = `<div class="category road">⌁</div><div class="complaint-main"><div class="complaint-title"><h3>${escapeHtml(subject)}</h3><span class="badge review">গ্রহণ করা হয়েছে</span></div><p>${code} &nbsp;·&nbsp; এইমাত্র জমা হয়েছে</p><div class="mini-progress"><i style="width:25%"></i></div><small><b>ধাপ ১ / ৫</b> — ${escapeHtml(dept)}-এ যাচাইয়ের জন্য পাঠানো হয়েছে</small></div><button class="details">বিস্তারিত <span>→</span></button>`;
  list.prepend(card);
  incrementCount(document.querySelector('#totalCount'));
  incrementCount(document.querySelector('#progressCount'));
  card.querySelector('.details').addEventListener('click', () => openComplaintDetails(card));
  closeModal(formModal); e.target.reset(); toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3500);
});
document.querySelector('.menu').addEventListener('click', () => document.querySelector('.sidebar').classList.toggle('open'));
