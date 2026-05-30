// ─────────────────────────────────────────────────────────────────────────
// JobConnect API Utility  –  all calls go through http://localhost:5190/api
// ─────────────────────────────────────────────────────────────────────────
const API_BASE = 'http://localhost:5190/api';

// ── helpers ──────────────────────────────────────────────────────────────
function getStoredUser() {
  try { return JSON.parse(localStorage.getItem('jc_user') || '{}'); }
  catch { return {}; }
}

function authHeaders() {
  const user  = getStoredUser();
  const token = user.token || '';
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse(res) {
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try { const j = await res.json(); msg = j.message || msg; } catch {}
    throw new Error(msg);
  }
  return res.json();
}

// ── AUTH ─────────────────────────────────────────────────────────────────
export async function apiRegister(data) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function apiLogin(data) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// ── JOBS ─────────────────────────────────────────────────────────────────
export async function apiGetJobs() {
  const res = await fetch(`${API_BASE}/jobs`);
  return handleResponse(res);
}

export async function apiGetJobById(id) {
  const res = await fetch(`${API_BASE}/jobs/${id}`);
  return handleResponse(res);
}

export async function apiGetJobsByCompany(companyId) {
  const res = await fetch(`${API_BASE}/jobs/company/${companyId}`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function apiCreateJob(job) {
  const res = await fetch(`${API_BASE}/jobs`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(job),
  });
  return handleResponse(res);
}

export async function apiDeleteJob(id, companyId) {
  const res = await fetch(`${API_BASE}/jobs/${id}?companyId=${companyId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse(res);
}

// ── JOB APPLICATIONS ─────────────────────────────────────────────────────
export async function apiApplyJob(application) {
  const res = await fetch(`${API_BASE}/applications`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(application),
  });
  return handleResponse(res);
}

export async function apiGetMyApplications(userId) {
  const res = await fetch(`${API_BASE}/applications/user/${userId}`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function apiGetJobApplications(jobId) {
  const res = await fetch(`${API_BASE}/applications/job/${jobId}`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function apiCheckApplied(jobId, userId) {
  try {
    const res = await fetch(
      `${API_BASE}/applications/check?jobId=${jobId}&userId=${userId}`,
      { headers: authHeaders() }
    );
    return handleResponse(res);
  } catch {
    return { hasApplied: false };
  }
}

export async function apiUpdateApplicationStatus(appId, status) {
  const res = await fetch(`${API_BASE}/applications/${appId}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
  return handleResponse(res);
}
