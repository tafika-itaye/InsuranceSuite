// Simple app state manager
const app = {
  currentSession: null,

  init: function () {
    this.initLogin();
    this.initBranchDropdown();
    this.addEventHandlers();
  },

  hasSession: function () {
    const session = localStorage.getItem("insuresuite-session");
    return !!session;
  },

  createSession: function (branchId, role, userId) {
    const session = { branchId, role, userId, timestamp: Date.now() };
    localStorage.setItem("insuresuite-session", JSON.stringify(session));
    this.currentSession = session;
  },

  loadSession: function () {
    const session = localStorage.getItem("insuresuite-session");
    if (session) {
      this.currentSession = JSON.parse(session);
    }
  },

  clearSession: function () {
    localStorage.removeItem("insuresuite-session");
    this.currentSession = null;
  },

  // Menus and role visibility
  updateMainMenu: function () {
    const role = this.currentSession?.role;
    const claimsMenu  = document.getElementById("claimsMenu");
    const policiesMenu = document.getElementById("policiesMenu");
    const crmMenu      = document.getElementById("crmMenu");
    const portfolioMenu = document.getElementById("portfolioMenu");
    const documentsMenu = document.getElementById("documentsMenu");
    const adminMenu    = document.getElementById("adminMenu");
    const currentRole  = document.getElementById("currentRole");

    if (currentRole) {
      currentRole.textContent = role;
    }

    if (role === "ReadOnly") {
      [claimsMenu, policiesMenu, crmMenu, portfolioMenu, documentsMenu].forEach(el => {
        if (el) el.style.display = "none";
      });
    }

    if (["SuperAdmin", "BranchManager"].includes(role)) {
      if (adminMenu) adminMenu.style.display = "block";
    } else {
      if (adminMenu) adminMenu.style.display = "none";
    }
  },

  // Login form
  initLogin: function () {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const branchSelect = document.getElementById("branchSelect");
      const roleSelect   = document.getElementById("roleSelect");
      const branchId     = parseInt(branchSelect.value);
      const role         = roleSelect.value;

      if (!branchId || !role) return;

      const user = window.data.users.find(u => u.role === role && u.branch === branchId);
      if (!user) return;

      this.createSession(branchId, role, user.id);
      window.location = "dashboard.html";
    });
  },

  // Branch dropdown
  initBranchDropdown: function () {
    const branchSelect = document.getElementById("branchSelect");
    if (!branchSelect) return;

    window.data.branches.forEach(br => {
      const opt = document.createElement("option");
      opt.value = br.id;
      opt.textContent = br.name;
      branchSelect.appendChild(opt);
    });

    if (branchSelect.options.length > 0) {
      branchSelect.selectedIndex = 0;
    }
  },

  // Dashboard numbers
  loadDashboard: function () {
    this.loadKPIs();
    this.loadCharts();
  },

  loadKPIs: function () {
    document.getElementById("kpiOpenClaims")        ?.textContent = window.data.openClaims;
    document.getElementById("kpiActivePolicies")    ?.textContent = window.data.policies.filter(p => p.status === "Active").length;
    document.getElementById("kpiPendingApprovals")  ?.textContent = window.data.pendingApprovals;
    document.getElementById("kpiRenewalsDue30")     ?.textContent = window.data.renewalsDue30Days;
    document.getElementById("kpiSLABreaches")       ?.textContent = window.data.slaBreaches;
    document.getElementById("kpiPendingTransfers")  ?.textContent = window.data.pendingTransfers;
  },

  loadCharts: function () {
    // Claims by status
    const statusData = window.data.claims.reduce((acc, cl)
