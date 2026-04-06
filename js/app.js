
document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle (public pages)
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if(toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));

  // Sidebar toggle (ERP pages)
  const sideToggle = document.getElementById('sideToggle');
  const sidebar    = document.querySelector('.sidebar');
  if(sideToggle && sidebar) sideToggle.addEventListener('click', () => sidebar.classList.toggle('open'));

  // Mark active sidebar link
  const current = location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    if(a.getAttribute('href') === current) a.classList.add('active');
  });

  // Login form
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const pass  = document.getElementById('password').value;
      const valid = [
        {e:'admin@insuresuite.mw', p:'Admin@2026'},
        {e:'broker@insuresuite.mw', p:'Broker@2026'},
        {e:'customer@insuresuite.mw', p:'Customer@2026'},
      ];
      if(valid.some(v => v.e===email && v.p===pass)){
        sessionStorage.setItem('is_logged_in','1');
        location.href='dashboard.html';
      } else {
        document.getElementById('loginError').style.display='block';
      }
    });
  }

  // Guard ERP pages
  const erp = ['dashboard.html','policies.html','claims.html','customers.html','brokers.html'];
  const pg  = location.pathname.split('/').pop();
  if(erp.includes(pg) && !sessionStorage.getItem('is_logged_in')){
    location.href='login.html';
  }

  // Logout
  document.querySelectorAll('.logout-btn').forEach(b => b.addEventListener('click', () => {
    sessionStorage.removeItem('is_logged_in');
    location.href='login.html';
  }));

  // Quote form
  const qf = document.getElementById('quoteForm');
  if(qf){
    qf.addEventListener('submit', e => {
      e.preventDefault();
      document.getElementById('quoteSuccess').style.display='block';
      qf.reset();
    });
  }

  // Render tables if IS data available
  if(typeof IS === 'undefined') return;

  renderTable('policiesTable', IS.policies, ['id','customer','type','premium','status','start','end']);
  renderTable('claimsTable',   IS.claims,   ['id','policy','customer','type','amount','status','filed']);
  renderTable('customersTable',IS.customers,['id','name','email','phone','policies','status']);
  renderTable('brokersTable',  IS.brokers,  ['id','name','contact','phone','policies','commission','status']);

  // Dashboard metrics
  const setEl = (id,v) => { const el=document.getElementById(id); if(el) el.textContent=v; };
  setEl('totalPolicies', IS.policies.length);
  setEl('activePolicies', IS.policies.filter(p=>p.status==='active').length);
  setEl('pendingClaims', IS.claims.filter(c=>c.status==='pending').length);
  setEl('totalCustomers', IS.customers.length);
});

function renderTable(id, data, cols){
  const el = document.getElementById(id);
  if(!el || !data) return;
  const statusBadge = s => {
    const map={active:'badge-active',pending:'badge-pending',approved:'badge-active',
                rejected:'badge-claims',broker:'badge-broker'};
    return `<span class="badge ${map[s]||'badge-pending'}">${s}</span>`;
  };
  el.innerHTML = data.map(row =>
    `<tr>${cols.map(c => `<td>${c==='status'?statusBadge(row[c]):row[c]}</td>`).join('')}</tr>`
  ).join('');
}
