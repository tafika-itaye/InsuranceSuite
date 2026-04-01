/* ============================================================
   InsureSuite JS — TechNexus Malawi
   ============================================================ */

// ── ACTIVE NAV ───────────────────────────────────────────────
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(el => {
    const href = el.getAttribute('href') || el.dataset.page;
    if (href && href.includes(page)) el.classList.add('active');
  });
})();

// ── FORMAT HELPERS ────────────────────────────────────────────
const MWK = n => 'MK ' + Number(n).toLocaleString('en-US');
const fDate = d => d instanceof Date
  ? d.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })
  : d;

// ── MODAL ─────────────────────────────────────────────────────
function openModal(id)  {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ── TOAST ─────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const t = document.createElement('div');
  t.className = 'toast toast-' + type;
  t.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;padding:12px 20px;background:${type==='success'?'#107C10':type==='danger'?'#A4262C':'#0078D4'};color:#fff;border-radius:8px;font-size:13px;font-weight:600;box-shadow:0 4px 16px rgba(0,0,0,0.25);transform:translateY(40px);opacity:0;transition:all .25s;`;
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.transform = 'translateY(0)'; t.style.opacity = '1'; });
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(20px)'; setTimeout(() => t.remove(), 300); }, 3000);
}

// ── TABLE SORT ────────────────────────────────────────────────
function initTableSort() {
  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.style.cursor = 'pointer';
    th.addEventListener('click', () => {
      const table = th.closest('table');
      const idx = Array.from(th.parentNode.children).indexOf(th);
      const tbody = table.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));
      const asc = th.dataset.dir !== 'asc';
      th.dataset.dir = asc ? 'asc' : 'desc';
      rows.sort((a, b) => {
        const x = a.cells[idx]?.textContent.trim() || '';
        const y = b.cells[idx]?.textContent.trim() || '';
        return asc ? x.localeCompare(y, undefined, { numeric: true }) : y.localeCompare(x, undefined, { numeric: true });
      });
      rows.forEach(r => tbody.appendChild(r));
    });
  });
}

// ── TABLE SEARCH ──────────────────────────────────────────────
function initTableSearch(inputId, tableId) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  if (!input || !table) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    table.querySelectorAll('tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// ── CANVAS CHART: BAR ─────────────────────────────────────────
function drawBarChart(canvasId, labels, values, color = '#0078D4') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const pad = { top: 20, right: 20, bottom: 36, left: 60 };
  const cW = W - pad.left - pad.right;
  const cH = H - pad.top - pad.bottom;
  const maxV = Math.max(...values) * 1.15;
  ctx.clearRect(0, 0, W, H);

  // Grid lines
  ctx.strokeStyle = '#E8EDF3'; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + cH - (i / 4) * cH;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + cW, y); ctx.stroke();
    ctx.fillStyle = '#6B7A8D'; ctx.font = '11px Segoe UI';
    ctx.textAlign = 'right';
    ctx.fillText(MWK(Math.round(maxV * i / 4 / 1e6) + 'M').replace('MK ', 'MK '), pad.left - 6, y + 4);
  }

  // Bars
  const bw = (cW / labels.length) * 0.55;
  const gap = cW / labels.length;
  labels.forEach((lbl, i) => {
    const bh = (values[i] / maxV) * cH;
    const x = pad.left + i * gap + (gap - bw) / 2;
    const y = pad.top + cH - bh;
    const grad = ctx.createLinearGradient(0, y, 0, y + bh);
    grad.addColorStop(0, color);
    grad.addColorStop(1, color + '88');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(x, y, bw, bh, [4, 4, 0, 0]) : ctx.rect(x, y, bw, bh);
    ctx.fill();
    ctx.fillStyle = '#6B7A8D'; ctx.font = '11px Segoe UI'; ctx.textAlign = 'center';
    ctx.fillText(lbl, pad.left + i * gap + gap / 2, H - 8);
  });
}

// ── CANVAS CHART: DONUT ────────────────────────────────────────
function drawDonutChart(canvasId, labels, values, colors) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = canvas.width / 2, cy = canvas.height / 2;
  const r = Math.min(cx, cy) * 0.75, ri = r * 0.58;
  const total = values.reduce((a, b) => a + b, 0);
  let ang = -Math.PI / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  values.forEach((v, i) => {
    const slice = (v / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, ang, ang + slice);
    ctx.closePath();
    ctx.fillStyle = colors[i];
    ctx.fill();
    ang += slice;
  });
  // Hole
  ctx.beginPath();
  ctx.arc(cx, cy, ri, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  // Center text
  ctx.fillStyle = '#1A1A2E'; ctx.font = `bold 20px Segoe UI`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(total, cx, cy - 8);
  ctx.fillStyle = '#6B7A8D'; ctx.font = `11px Segoe UI`;
  ctx.fillText('Total', cx, cy + 10);
}

// ── CANVAS CHART: LINE ─────────────────────────────────────────
function drawLineChart(canvasId, labels, datasets) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const pad = { top: 20, right: 20, bottom: 36, left: 60 };
  const cW = W - pad.left - pad.right;
  const cH = H - pad.top - pad.bottom;
  const allVals = datasets.flatMap(d => d.values);
  const maxV = Math.max(...allVals) * 1.15;
  ctx.clearRect(0, 0, W, H);

  for (let i = 0; i <= 4; i++) {
    const y = pad.top + cH - (i / 4) * cH;
    ctx.strokeStyle = '#E8EDF3'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + cW, y); ctx.stroke();
    ctx.fillStyle = '#6B7A8D'; ctx.font = '11px Segoe UI'; ctx.textAlign = 'right';
    ctx.fillText(Math.round(maxV * i / 4), pad.left - 6, y + 4);
  }

  datasets.forEach(ds => {
    const pts = ds.values.map((v, i) => ({
      x: pad.left + i * (cW / (labels.length - 1)),
      y: pad.top + cH - (v / maxV) * cH
    }));
    // Area fill
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pad.top + cH);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length - 1].x, pad.top + cH);
    ctx.closePath();
    ctx.fillStyle = ds.color + '18';
    ctx.fill();
    // Line
    ctx.beginPath();
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = ds.color; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
    ctx.stroke();
    // Dots
    pts.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = ds.color; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    });
  });

  labels.forEach((lbl, i) => {
    ctx.fillStyle = '#6B7A8D'; ctx.font = '11px Segoe UI'; ctx.textAlign = 'center';
    ctx.fillText(lbl, pad.left + i * (cW / (labels.length - 1)), H - 8);
  });
}

// ── CONFIRM ───────────────────────────────────────────────────
function confirmAction(msg, callback) {
  if (confirm(msg)) callback();
}

// ── DATE NOW ──────────────────────────────────────────────────
function today() {
  return new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTableSort();
  // Close modals on X button
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay')?.classList.remove('open');
    });
  });
  // Form submission handlers
  document.querySelectorAll('form.ajax-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const modal = form.closest('.modal-overlay');
      if (modal) modal.classList.remove('open');
      showToast('Record saved successfully.', 'success');
    });
  });
});
