# InsureSuite — TechNexus Malawi
### Mid-Tier Insurance Operations Suite — Prototype v1.0

> Developed by **TechNexus Malawi** | BRN.A6SNWQY | MANePS Active | PPDA Registered  
> +265 889 941 700 | technexus_mw@proton.me | www.technexusmw.com | Blantyre, Malawi

---

## 📁 Project Structure

```
InsureSuite-TechNexus/
├── README.md
├── documents/
│   ├── TechNexus_Business_Proposal_INS_2026.docx
│   ├── TechNexus_Quotation_TNX-INS-2026-031.docx
│   └── TechNexus_Technical_Concept_Note_INS_2026.docx
└── insurance-suite/
    ├── index.html           ← Login / Entry point
    ├── dashboard.html       ← Executive Dashboard
    ├── claims.html          ← Claims Management
    ├── policies.html        ← Policy Administration
    ├── portfolio.html       ← Portfolio Transfer Control
    ├── documents.html       ← Document & Records Management
    ├── crm.html             ← CRM & Renewals Pipeline
    ├── audit.html           ← Audit Trail & Reports
    ├── css/
    │   └── style.css        ← Full design system
    └── js/
        ├── app.js           ← Charts, modals, toasts, utilities
        └── shared-nav.js    ← Session-aware sidebar navigation
```

---

## 🚀 GitHub Pages Deployment

1. Create a new GitHub repository (e.g. `insuresuite`)
2. Upload all files preserving the exact folder structure above
3. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**
4. Save — your site will be live at:  
   `https://yourusername.github.io/insuresuite/insurance-suite/`

To make the root URL redirect automatically, add an `index.html` at the repo root:
```html
<!DOCTYPE html>
<html><head><meta http-equiv="refresh" content="0;url=insurance-suite/"></head></html>
```

---

## 🔐 Demo Login

Open `insurance-suite/index.html` and use any of the Quick Demo Access buttons, or:
- **Username:** `admin` | **Password:** `demo1234`

The prototype uses `sessionStorage` to persist the user session across pages.  
No backend is required — all data is hardcoded sample data for presentation purposes.

---

## 📋 Pages Overview

| Page | File | Description |
|------|------|-------------|
| Login | `index.html` | Dual-panel login with role quick-access |
| Dashboard | `dashboard.html` | KPI cards, charts, SLA performance, activity feed |
| Claims | `claims.html` | FNOL, claims register, assessment, settlement |
| Policies | `policies.html` | Policy issuance, endorsements, renewal |
| Portfolio Transfer | `portfolio.html` | Controlled portfolio movement with audit trail |
| Documents | `documents.html` | Central document repository with folder tree |
| CRM & Renewals | `crm.html` | Renewal pipeline, customer list, follow-ups |
| Audit & Reports | `audit.html` | Approvals queue, audit log, reports, exceptions |

---

## 🎨 Design System

- **Theme:** Microsoft Fluent UI + TechNexus navy/blue branding
- **Primary colour:** `#0078D4` (Microsoft Blue)
- **Navy:** `#1A2E4A` (TechNexus brand)
- **Typography:** Segoe UI (system font)
- **Charts:** Pure HTML5 Canvas — no external dependencies
- **Responsive:** Sidebar collapses on screens < 768px

---

## 📝 Documents Included

All three Word documents are fully formatted with:
- TechNexus navy/blue branding and professional headers/footers
- Malawian Kwacha (MWK) pricing at **$1 = MWK 1,800**
- Page numbers, table of contents structure, and executive-grade layout

| Document | Purpose |
|----------|---------|
| Business Proposal | Executive proposal for insurance client |
| Formal Quotation | Itemised quote TNX-INS-2026-031 with payment schedule |
| Technical Concept Note | Architecture, tech stack, implementation plan, risks |

---

## ⚙️ No Build Step Required

Pure HTML5, CSS3, and vanilla JavaScript. No npm, no Node.js, no frameworks.  
Open directly in any modern browser or deploy to any static host.

---

*© 2026 TechNexus Malawi. All rights reserved. Prototype for presentation purposes only.*
