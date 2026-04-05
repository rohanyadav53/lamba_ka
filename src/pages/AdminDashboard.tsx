// src/pages/AdminDashboard.tsx
// Full-featured admin dashboard with leads table, filters, search, pagination, status management, and CSV export

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api, type Lead, type LeadsResponse, type FilterOptions } from '@/lib/api';
import { toast } from 'sonner';
import {
  Search, Download, Filter, ChevronLeft, ChevronRight,
  LogOut, RefreshCw, Loader2, Users, TrendingUp,
  Phone, Mail, Building2, GraduationCap, Calendar,
  X, Save, MessageSquare, UserCheck, Edit3, PhoneCall,
} from 'lucide-react';

const NAVY = '#0b1f3a';
const GREEN = '#22c55e';

const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  New: { bg: '#eff6ff', text: '#1e40af', dot: '#3b82f6' },
  Contacted: { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
  Converted: { bg: '#f0fdf4', text: '#166534', dot: '#22c55e' },
};

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ── State ─────────────────────────────────────────────────────────────────
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(20);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUniversity, setFilterUniversity] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ universities: [], courses: [], statuses: [] });

  // Edit Modal
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editCounselor, setEditCounselor] = useState('');
  const [editContactedBy, setEditContactedBy] = useState(''); // ← NEW
  const [saving, setSaving] = useState(false);

  const [downloading, setDownloading] = useState(false);

  // ── Fetch Leads ───────────────────────────────────────────────────────────
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get<LeadsResponse>('/leads', {
        page: String(page),
        limit: String(limit),
        ...(searchQuery && { search: searchQuery }),
        ...(filterUniversity && { university: filterUniversity }),
        ...(filterCourse && { course: filterCourse }),
        ...(filterStatus && { status: filterStatus }),
      });
      if (res.data) {
        setLeads(res.data.leads);
        setTotalCount(res.data.totalCount);
        setTotalPages(res.data.totalPages);
      }
    } catch (err: any) {
      if (err.status === 401) {
        toast.error('Session expired. Please login again.');
        logout();
        navigate('/login');
        return;
      }
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  }, [page, limit, searchQuery, filterUniversity, filterCourse, filterStatus, logout, navigate]);

  // ── Fetch Filter Options ──────────────────────────────────────────────────
  const fetchFilterOptions = useCallback(async () => {
    try {
      const res = await api.get<FilterOptions>('/leads/filters');
      if (res.data) setFilterOptions(res.data);
    } catch {
      // Silently fail; filters will just be empty
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);
  useEffect(() => { fetchFilterOptions(); }, [fetchFilterOptions]);

  // ── Debounced Search ──────────────────────────────────────────────────────
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  // ── Download CSV ──────────────────────────────────────────────────────────
  const handleDownload = async () => {
    setDownloading(true);
    try {
      await api.get('/leads/download', {
        ...(filterUniversity && { university: filterUniversity }),
        ...(filterCourse && { course: filterCourse }),
        ...(filterStatus && { status: filterStatus }),
      });
      toast.success('CSV downloaded successfully');
    } catch {
      toast.error('Failed to download CSV');
    } finally {
      setDownloading(false);
    }
  };

  // ── Update Lead ───────────────────────────────────────────────────────────
  const handleUpdateLead = async () => {
    if (!editingLead) return;
    setSaving(true);
    try {
      await api.put(`/lead/${editingLead.id}`, {
        status: editStatus,
        notes: editNotes,
        assignedCounselor: editCounselor,
        contactedBy: editContactedBy, // ← NEW field sent to backend
      });
      toast.success('Lead updated successfully');
      setEditingLead(null);
      fetchLeads();
    } catch {
      toast.error('Failed to update lead');
    } finally {
      setSaving(false);
    }
  };

  const openEditModal = (lead: Lead) => {
    setEditingLead(lead);
    setEditStatus(lead.status);
    setEditNotes(lead.notes);
    setEditCounselor(lead.assignedCounselor);
    setEditContactedBy((lead as any).contactedBy ?? ''); // ← NEW — pre-populate if available
  };

  // ── Logout ────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out');
  };

  // ── Reset Filters ─────────────────────────────────────────────────────────
  const clearFilters = () => {
    setSearchInput('');
    setSearchQuery('');
    setFilterUniversity('');
    setFilterCourse('');
    setFilterStatus('');
    setPage(1);
  };

  const hasActiveFilters = searchQuery || filterUniversity || filterCourse || filterStatus;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: '#f0f2f5' }}>

      {/* ── Top Bar — WHITE background ──────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Left: logo + divider + title */}
          <div className="flex items-center gap-4">
            <img
              src="/sv_logo.svg"
              alt="ShikshaVision"
              className="h-32 sm:h-40 w-auto"
            />
            <div className="hidden sm:block h-8 w-px bg-gray-200" />
            <span
              className="hidden sm:block text-sm font-semibold"
              style={{ color: NAVY }}           /* ← dark navy, visible on white */
            >
              Admin Dashboard
            </span>
          </div>

          {/* Right: email + logout */}
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-xs hidden sm:block">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all
                         border-2 hover:bg-slate-50"
              style={{ borderColor: NAVY, color: NAVY }}
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ── Stats Cards ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={<Users size={20} />} label="Total Leads" value={totalCount} color="#3b82f6" />
          <StatCard icon={<TrendingUp size={20} />} label="New" value={leads.filter((l) => l.status === 'New').length} color="#f59e0b" suffix={`/ ${leads.length} shown`} />
          <StatCard icon={<Phone size={20} />} label="Contacted" value={leads.filter((l) => l.status === 'Contacted').length} color="#8b5cf6" suffix={`/ ${leads.length} shown`} />
          <StatCard icon={<UserCheck size={20} />} label="Converted" value={leads.filter((l) => l.status === 'Converted').length} color={GREEN} suffix={`/ ${leads.length} shown`} />
        </div>

        {/* ── Filters & Actions Bar ──────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
          <div className="flex flex-col lg:flex-row gap-3">

            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, phone, or email..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl py-2.5 pl-10 pr-4 text-sm
                           text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/15 transition-all"
              />
            </div>

            {/* Filter dropdowns */}
            <div className="flex flex-wrap gap-2">
              <FilterSelect icon={<Building2 size={13} />} value={filterUniversity} onChange={(v) => { setFilterUniversity(v); setPage(1); }} options={filterOptions.universities} placeholder="University" />
              <FilterSelect icon={<GraduationCap size={13} />} value={filterCourse} onChange={(v) => { setFilterCourse(v); setPage(1); }} options={filterOptions.courses} placeholder="Course" />
              <FilterSelect icon={<Filter size={13} />} value={filterStatus} onChange={(v) => { setFilterStatus(v); setPage(1); }} options={['New', 'Contacted', 'Converted']} placeholder="Status" />
            </div>

            {/* Actions */}
            <div className="flex gap-2 shrink-0">
              {hasActiveFilters && (
                <button onClick={clearFilters} className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors">
                  <X size={13} /> Clear
                </button>
              )}
              <button onClick={() => fetchLeads()} className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600">
                <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
              </button>
              <button onClick={handleDownload} disabled={downloading} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ background: GREEN }}>
                {downloading ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* ── Leads Table ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#f8f9fb' }}>
                  {['Name', 'Contact', 'University', 'Course', 'Source', 'Status', 'Date', 'Action'].map((h) => (
                    <th key={h} className={`px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider ${h === 'Action' ? 'text-center' : 'text-left'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 8 }).map((_, j) => (
                        <td key={j} className="px-4 py-4">
                          <div className="h-4 bg-gray-100 rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16 text-gray-400">
                      <Users size={40} className="mx-auto mb-3 opacity-30" />
                      <p className="font-semibold">No leads found</p>
                      <p className="text-xs mt-1">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => {
                    const statusColor = STATUS_COLORS[lead.status] || STATUS_COLORS.New;
                    return (
                      <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="font-semibold text-gray-900 text-sm">{lead.name}</div>
                          {lead.assignedCounselor && (
                            <div className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                              <UserCheck size={10} /> {lead.assignedCounselor}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <Mail size={11} className="text-gray-400 shrink-0" />
                            <span className="truncate max-w-[160px]">{lead.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-1">
                            <Phone size={11} className="text-gray-400 shrink-0" />
                            {lead.phone}
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-xs text-gray-700 font-medium">{lead.university}</td>
                        <td className="px-4 py-3.5 text-xs text-gray-700 font-medium">{lead.course}</td>
                        <td className="px-4 py-3.5">
                          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-500 uppercase tracking-wider">
                            {lead.source}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: statusColor.bg, color: statusColor.text }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor.dot }} />
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Calendar size={11} />
                            {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <button onClick={() => openEditModal(lead)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                            <Edit3 size={11} /> Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ──────────────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100" style={{ background: '#f8f9fb' }}>
              <p className="text-xs text-gray-500">
                Showing {((page - 1) * limit) + 1}–{Math.min(page * limit, totalCount)} of {totalCount} leads
              </p>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) pageNum = i + 1;
                  else if (page <= 3) pageNum = i + 1;
                  else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
                  else pageNum = page - 2 + i;
                  return (
                    <button key={pageNum} onClick={() => setPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${page === pageNum ? 'text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
                      style={page === pageNum ? { background: NAVY } : {}}>
                      {pageNum}
                    </button>
                  );
                })}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── Edit Modal ───────────────────────────────────────────────────── */}
      {editingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setEditingLead(null)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100" style={{ background: '#f8f9fb' }}>
              <div>
                <h3 className="font-bold text-lg" style={{ color: NAVY }}>Edit Lead</h3>
                <p className="text-xs text-gray-500 mt-0.5">{editingLead.name} — {editingLead.phone}</p>
              </div>
              <button onClick={() => setEditingLead(null)} className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">

              {/* Status */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Filter size={12} /> Status
                </label>
                <div className="flex gap-2">
                  {['New', 'Contacted', 'Converted'].map((s) => {
                    const sc = STATUS_COLORS[s];
                    return (
                      <button key={s} onClick={() => setEditStatus(s)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${editStatus === s ? 'shadow-sm' : 'opacity-50 hover:opacity-75'}`}
                        style={{ background: sc.bg, color: sc.text, borderColor: editStatus === s ? sc.dot : 'transparent' }}>
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Assigned Counselor */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <UserCheck size={12} /> Assigned Counselor
                </label>
                <input
                  type="text"
                  value={editCounselor}
                  onChange={(e) => setEditCounselor(e.target.value)}
                  placeholder="Enter counselor name"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-2.5 px-4 text-sm
                             text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/15 transition-all"
                />
              </div>

              {/* ── NEW: Contacted By ─────────────────────────────────── */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <PhoneCall size={12} /> Contacted By
                </label>
                <input
                  type="text"
                  value={editContactedBy}
                  onChange={(e) => setEditContactedBy(e.target.value)}
                  placeholder="Name of person who contacted the lead"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-2.5 px-4 text-sm
                             text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/15 transition-all"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare size={12} /> Notes
                </label>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Add notes about this lead..."
                  rows={3}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-2.5 px-4 text-sm
                             text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/15 transition-all resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100" style={{ background: '#f8f9fb' }}>
              <button onClick={() => setEditingLead(null)} className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 transition-colors">
                Cancel
              </button>
              <button onClick={handleUpdateLead} disabled={saving}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: GREEN }}>
                {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Reusable Components ─────────────────────────────────────────────────────

function StatCard({ icon, label, value, color, suffix }: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  suffix?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3 shadow-sm">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15`, color }}>
        {icon}
      </div>
      <div>
        <p className="text-xl font-extrabold" style={{ color: NAVY }}>{value}</p>
        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
          {label} {suffix && <span className="normal-case tracking-normal">{suffix}</span>}
        </p>
      </div>
    </div>
  );
}

function FilterSelect({ icon, value, onChange, options, placeholder }: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none border border-gray-200 bg-gray-50 rounded-xl py-2.5 pl-8 pr-8 text-xs font-medium
                   text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/15 transition-all cursor-pointer min-w-[120px]"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

export default AdminDashboard;
