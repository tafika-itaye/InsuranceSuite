// Simple app state manager
const app = {
  currentSession: null,

  // Entry point: called when DOM is ready
  init: function () {
    this.loadSession();
    this.initBranchDropdown();
    this.initLogin();
    this.addEventHandlers();
  },

  // Check if user has an active session
  hasSession: function () {
    const session = localStorage.getItem("insuresuite-session");
    return !!session;
  },

  // Create a new session in localStorage
  createSession: function (branchId, role, userId) {
    const session = { branchId, role, userId, timestamp: Date.now() };
    localStorage.setItem("insuresuite-session", JSON.stringify(session));
    this.currentSession = session;
  },

  // Load session from localStorage
  loadSession: function () {
    const session = localStorage.getItem("insuresuite-session");
    if (session) {
      this.currentSession = JSON.parse(session);
    }
  },

  // Clear the session (logout)
  clearSession: function () {
    localStorage.removeItem("insuresuite-session");
    this.currentSession = null;
  },

  // Branch dropdown population
  initBranchDropdown: function () {
    const branchSelect = document.getElementById("branchSelect");
    if (!branchSelect) return;

    // Clear existing options
    branchSelect.innerHTML = "";

    window.data.branches.forEach(br => {
      const opt = document.createElement("option");
      opt.value = br.id;
      opt.textContent = br.name;
      branchSelect.appendChild(opt);
    });

    // Select first branch by default
    if (branchSelect.options.length > 0) {
      branchSelect.selectedIndex = 0;
    }
  },

  // Login form submission
  initLogin: function () {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const branchSelect = document.getElementById("branchSelect");
      const roleSelect   = document.getElementById("roleSelect");

      const branchId = parseInt(branchSelect.value);
      const role     = roleSelect.value;

      if (!branchId || !role) {
        alert("Please select both branch and role.");
        return;
      }

      // Find matching user (dummy logic)
      const user = window.data.users.find(u => u.role === role && u.branch === branchId);
      if (!user) {
        alert("No user found for this role and branch.");
        return;
      }

      this.createSession(branchId, role, user.id);
      window.location = "dashboard.html";
    });
  },

  // Update menus and role visibility
  updateMainMenu: function () {
    const role = this.currentSession?.role;

    const claimsMenu  = document.getElementById("claimsMenu");
    const policiesMenu = document.getElementById("policiesMenu");
    const crmMenu      = document.getElementById("crmMenu");
    const portfolioMenu = document.getElementById("portfolioMenu");
    const documentsMenu = document.getElementById("documentsMenu");
    const adminMenu    = document.getElementById("adminMenu");
    const currentRole  = document.getElementById("currentRole");

    if (currentRole && role) {
      currentRole.textContent = role;
    }

    // Hide main modules for Read‑Only role
    if (role === "ReadOnly") {
      [claimsMenu, policiesMenu, crmMenu, portfolioMenu, documentsMenu].forEach(el => {
        if (el) el.style.display = "none";
      });
    }

    // Only show Admin menu for SuperAdmin / BranchManager
    if (["SuperAdmin", "BranchManager"].includes(role)) {
      if (adminMenu) adminMenu.style.display = "block";
    } else {
      if (adminMenu) adminMenu.style.display = "none";
    }
  },

  // Dummy event handlers (e.g., logout)
  addEventHandlers: function () {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        this.clearSession();
      });
    }
  },

  // Dashboard KPIs
  loadDashboard: function () {
    this.loadKPIs();
    this.loadCharts();
  },

  loadKPIs: function () {
    const claims = window.data.claims;
    const policies = window.data.policies;

    document.getElementById("kpiOpenClaims")        ?.textContent = claims.filter(c => c.status !== "Closed").length;
    document.getElementById("kpiActivePolicies")    ?.textContent = policies.filter(p => p.status === "Active").length;
    document.getElementById("kpiPendingApprovals")  ?.textContent = window.data.pendingApprovals;
    document.getElementById("kpiRenewalsDue30")     ?.textContent = window.data.renewalsDue30Days;
    document.getElementById("kpiSLABreaches")       ?.textContent = window.data.slaBreaches;
    document.getElementById("kpiPendingTransfers")  ?.textContent = window.data.pendingTransfers;
  },

  loadCharts: function () {
    // Claims status chart (Pie)
    const statusData = window.data.claims.reduce((acc, cl) => {
      acc[cl.status] = (acc[cl.status] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(statusData);
    const counts = Object.values(statusData);

    const claimsCtx = document.getElementById("claimsChart")?.getContext("2d");
    if (claimsCtx) {
      new Chart(claimsCtx, {
        type: "pie",
        data: {
          labels,
          datasets: [{
            data: counts,
            backgroundColor: ["#003366", "#007bff", "#28a745", "#ffc107", "#dc3545"]
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }

    // Policy classes chart (Bar)
    const classData = window.data.policies.reduce((acc, p) => {
      acc[p.class] = (acc[p.class] || 0) + 1;
      return acc;
    }, {});

    const classLabels = Object.keys(classData);
    const classCounts = Object.values(classData);

    const policiesCtx = document.getElementById("policiesChart")?.getContext("2d");
    if (policiesCtx) {
      new Chart(policiesCtx, {
        type: "bar",
        data: {
          labels: classLabels,
          datasets: [{
            label: "Policies",
            data: classCounts,
            backgroundColor: "#003366"
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }
  }
};

// Run app only when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
