/* shared-nav.js — inject sidebar into every app page */
(function() {
  const user = JSON.parse(sessionStorage.getItem('tnx_user') || '{"name":"Demo User","role":"Administrator","branch":"Blantyre HQ"}');
  const initials = user.name.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase();

  const nav = `
  <aside class="sidebar">
    <div class="sidebar-brand">
      <a class="brand-logo" href="dashboard.html">
        <div class="brand-icon">🏛️</div>
        <div class="brand-text">
          <div class="brand-name">InsureSuite</div>
          <div class="brand-sub">TechNexus Malawi</div>
        </div>
      </a>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section">Main</div>
      <a class="nav-item" href="dashboard.html" data-page="dashboard.html">
        <span class="nav-icon">📊</span><span>Dashboard</span>
      </a>

      <div class="nav-section">Operations</div>
      <a class="nav-item" href="claims.html" data-page="claims.html">
        <span class="nav-icon">📋</span><span>Claims</span>
        <span class="nav-badge">5</span>
      </a>
      <a class="nav-item" href="policies.html" data-page="policies.html">
        <span class="nav-icon">📄</span><span>Policies</span>
      </a>
      <a class="nav-item" href="portfolio.html" data-page="portfolio.html">
        <span class="nav-icon">🔄</span><span>Portfolio Transfer</span>
        <span class="nav-badge warn">3</span>
      </a>
      <a class="nav-item" href="documents.html" data-page="documents.html">
        <span class="nav-icon">🗂️</span><span>Documents</span>
      </a>
      <a class="nav-item" href="crm.html" data-page="crm.html">
        <span class="nav-icon">👥</span><span>CRM &amp; Renewals</span>
        <span class="nav-badge blue">12</span>
      </a>

      <div class="nav-section">Management</div>
      <a class="nav-item" href="audit.html" data-page="audit.html">
        <span class="nav-icon">🔍</span><span>Audit &amp; Reports</span>
      </a>
      <a class="nav-item" href="#" onclick="showToast('Settings module coming in Phase 2.','info');return false;">
        <span class="nav-icon">⚙️</span><span>Settings</span>
      </a>
      <a class="nav-item" href="index.html">
        <span class="nav-icon">🚪</span><span>Sign Out</span>
      </a>
    </nav>
    <div class="sidebar-footer">
      <div class="user-block">
        <div class="user-avatar">${initials}</div>
        <div class="user-info">
          <div class="user-name">${user.name}</div>
          <div class="user-role">${user.role}</div>
        </div>
      </div>
    </div>
  </aside>`;

  document.getElementById('sidebar-mount').innerHTML = nav;

  // Set active nav
  const page = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item').forEach(el => {
    if ((el.getAttribute('href') || '').includes(page)) el.classList.add('active');
  });

  // Populate topbar user info
  const branchEl = document.getElementById('topbar-branch');
  if (branchEl) branchEl.textContent = user.branch;
})();
