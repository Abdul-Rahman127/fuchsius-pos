import React, { useState, useEffect } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────


// ─── Helpers ──────────────────────────────────────────────────────────────────
function getInitials(first, last) {
  return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase();
}
const AVATAR_COLORS = ["#4F46E5", "#7C3AED", "#2563EB", "#0891B2", "#059669"];
function avatarColor(initials) {
  return AVATAR_COLORS[(initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % AVATAR_COLORS.length];
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ first, last, size = 36 }) {
  const initials = getInitials(first, last);
  return (
    <div style={{
      width: size, height: size, borderRadius: 8,
      background: avatarColor(initials),
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, fontSize: size * 0.36, flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status, highlighted }) {
  const isActive = status === "Active";
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
      highlighted
        ? isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
        : isActive ? "text-green-600" : "text-red-500"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full inline-block ${isActive ? "bg-green-500" : "bg-red-500"}`} />
      {status}
    </span>
  );
}

// ─── Top Nav — Figma exact match ──────────────────────────────────────────────
// Figma: "Customer" (left) + "Cashier Mode" pill button (right)
function TopNav() {
  return (
    <div className="flex items-center justify-between px-8 h-14 bg-white border-b border-gray-100">
      <span className="text-base font-semibold text-gray-800">Customer</span>
      <button className="px-4 py-1.5 rounded-full border border-gray-200 text-sm text-gray-500 font-medium hover:bg-gray-50 transition">
        Cashier Mode
      </button>
    </div>
  );
}

// ─── Add / Edit Modal ─────────────────────────────────────────────────────────
function CustomerModal({ customer, onSave, onClose }) {
  const editing = !!customer?.id;
  const [form, setForm] = useState({
    firstName: customer?.firstName || "",
    lastName:  customer?.lastName  || "",
    phone:     customer?.phone     || "",
    email:     customer?.email     || "",
    status:    customer?.status    || "Active",
    city:      customer?.city      || "",
    address:   customer?.address   || "",
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputCls = "w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition";
  const labelCls = "block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[520px] shadow-2xl">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          {editing ? "Edit " : "Add "}
          <span className="text-indigo-600">{editing ? "Customer" : "New Customer"}</span>
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelCls}>First Name*</label>
            <input className={inputCls} value={form.firstName} onChange={e => set("firstName", e.target.value)} placeholder="Amara" />
          </div>
          <div>
            <label className={labelCls}>Last Name*</label>
            <input className={inputCls} value={form.lastName} onChange={e => set("lastName", e.target.value)} placeholder="Perera" />
          </div>
          <div>
            <label className={labelCls}>Phone*</label>
            <input className={inputCls} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+94 77 123 4567" />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input className={inputCls} value={form.email} onChange={e => set("email", e.target.value)} placeholder="amara@gmail.com" />
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select className={inputCls} value={form.status} onChange={e => set("status", e.target.value)}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>City</label>
            <input className={inputCls} value={form.city} onChange={e => set("city", e.target.value)} placeholder="Colombo" />
          </div>
        </div>

        <div className="mb-6">
          <label className={labelCls}>Address</label>
          <textarea
            className={`${inputCls} h-20 resize-none`}
            value={form.address}
            onChange={e => set("address", e.target.value)}
            placeholder="No. 12, Main Street, Colombo 07"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition">
            Cancel
          </button>
          <button
            onClick={() => { if (form.firstName && form.lastName && form.phone) onSave(form); }}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
          >
            Save Customer
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteModal({ onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[360px] shadow-2xl text-center">
        <div className="text-4xl mb-4"></div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Customer?</h3>
        <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
        <div className="flex justify-center gap-3">
          <button onClick={onClose} className="px-6 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-6 py-2 rounded-xl bg-red-400 text-white text-sm font-bold hover:bg-red-500 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Customer List Page ───────────────────────────────────────────────────────
function CustomerListPage({ customers, stats, onView, onEdit, onDelete, onAdd, onPromo }) {
  const [search,   setSearch]   = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const filtered = customers.filter(c =>
    `${c.firstName} ${c.lastName} ${c.email} ${c.phone}`
      .toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <TopNav />

      <div className="p-8">
        {/* Page Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage your customer base</p>
          </div>
          <button
            onClick={onAdd}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-3 rounded-xl shadow-lg shadow-indigo-200 transition"
          >
            <span className="material-icons text-base">add</span>
            Add Customer
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Customers",  value: stats.total },
            { label: "Active Customers", value: stats.active },
            { label: "Added This Month", value: stats.addedThisMonth },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="text-3xl font-extrabold text-indigo-600">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search + Promo */}
        <div className="flex gap-3 mb-5">
          <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm gap-2">
            <span className="material-icons text-gray-400 text-sm">search</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email or phone..."
              className="outline-none text-sm flex-1 bg-transparent text-gray-600"
            />
          </div>
          <button
            onClick={onPromo}
            className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Send Promotion
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {["Customer", "Phone", "Email", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400 text-sm">No customers found</td>
                </tr>
              ) : filtered.map((c, i) => (
                <tr key={c.id} className={`hover:bg-gray-50 transition ${i < filtered.length - 1 ? "border-b border-gray-50" : ""}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar first={c.firstName} last={c.lastName} size={36} />
                      <div>
                        <div className="font-semibold text-sm text-gray-800">{c.firstName} {c.lastName}</div>
                        <div className="text-xs text-gray-400">#{c.id} · {c.city}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{c.phone}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{c.email}</td>
                  <td className="px-5 py-4"><StatusBadge status={c.status} highlighted /></td>
                  <td className="px-5 py-4">
                    {/* ── Action Icons — Figma exact match ── */}
                    <div className="flex gap-2">

                      {/* 👁 View — visibility */}
                      <button
                        onClick={() => onView(c)}
                        title="View"
                        className="w-8 h-8 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-indigo-400 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition" >
                        <span className="material-icons text-base">visibility</span>
                      </button>

                      {/* 🏷 Promo — local_offer */}
                      <button
                        onClick={onPromo}
                        title="Send Promo"
                        className="w-8 h-8 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-amber-300 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600 transition">
                        <span className="material-icons text-base">local_offer</span>
                      </button>

                      {/* ✏️ Edit — edit */}
                      <button
                        onClick={() => onEdit(c)}
                        title="Edit"
                        className="w-8 h-8 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-blue-400 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition"
                      >
                        <span className="material-icons text-base">edit</span>
                      </button>

                      {/* 🗑 Delete — delete */}
                      <button
                        onClick={() => setDeleteId(c.id)}
                        title="Delete"
                        className="w-8 h-8 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-red-300 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition"
                      >
                        <span className="material-icons text-base">delete</span>
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deleteId && (
        <DeleteModal
          onConfirm={() => { onDelete(deleteId); setDeleteId(null); }}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

// ─── Purchase History Page ────────────────────────────────────────────────────
function PurchaseHistoryPage({ customer, onBack, onEdit }) {
  const total    = customer.purchases.reduce((s, p) => s + p.amount, 0);
  const lastDate = customer.purchases.length
    ? customer.purchases[customer.purchases.length - 1].date : "—";

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <TopNav />

      <div className="p-8">
        <button onClick={onBack} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm mb-5 transition">
          <span className="material-icons text-base">arrow_back</span> Back to Customers
        </button>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 flex items-center gap-5 shadow-sm border border-gray-100 mb-5">
          <Avatar first={customer.firstName} last={customer.lastName} size={52} />
          <div className="flex-1">
            <div className="text-xl font-bold text-gray-800">{customer.firstName} {customer.lastName}</div>
            <div className="text-sm text-gray-500 mt-1 flex gap-5">
              <span>{customer.phone}</span><span>{customer.email}</span>
            </div>
          </div>
          <StatusBadge status={customer.status} highlighted />
          <button
            onClick={() => onEdit(customer)}
            className="px-5 py-2 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
          >
            EDIT
          </button>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* Purchase Table */}
          <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-semibold text-gray-400 mb-5">Purchase History</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Item", "Date", "Amount", "Status"].map(h => (
                    <th key={h} className="text-left pb-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customer.purchases.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-10 text-gray-300 text-sm">No purchases yet</td></tr>
                ) : customer.purchases.map((p, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-4">
                      <div className="font-semibold text-sm text-gray-800">{p.item}</div>
                      <div className="text-xs text-gray-400">#{p.productId}</div>
                    </td>
                    <td className="py-4 text-sm text-gray-500">{p.date}</td>
                    <td className="py-4 text-sm font-bold text-indigo-600">Rs.{p.amount}</td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />{p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
            <h3 className="text-base font-semibold text-gray-400 mb-5">Summary</h3>
            {[
              { label: "Total Purchases", value: customer.purchases.length, highlight: false },
              { label: "Total Spent",     value: `Rs.${total}`,            highlight: true  },
              { label: "Last Purchase",   value: lastDate,                  highlight: false },
            ].map(row => (
              <div key={row.label} className="flex justify-between py-3.5 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-500">{row.label}</span>
                <span className={`text-sm font-bold ${row.highlight ? "text-indigo-600" : "text-gray-800"}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Send Promotion Page ──────────────────────────────────────────────────────
function SendPromoPage({ customers, onBack }) {
  const [mode,         setMode]         = useState("Email");
  const [title,        setTitle]        = useState("Special Offer Just for You!");
  const [message,      setMessage]      = useState("Dear {customer_name}, enjoy 20% OFF on your next purchase!\nUse code: SAVE20. Valid until end of month.");
  const [discountCode, setDiscountCode] = useState("SAVE20");
  const [selected,     setSelected]     = useState([]);
  const [sent,         setSent]         = useState(false);

  const toggleAll = () =>
    setSelected(selected.length === customers.length ? [] : customers.map(c => c.id));
  const toggleOne = id =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const preview = message.replace(
    "{customer_name}",
    customers.find(c => c.id === selected[0])?.firstName || "Customer"
  );

  const inputCls = "w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition";
  const labelCls = "block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5";

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <TopNav />

      <div className="p-8">
        <button onClick={onBack} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm mb-5 transition">
          <span className="material-icons text-base">arrow_back</span> Back to Customers
        </button>

        <h1 className="text-2xl font-bold text-gray-800">Send Promotion</h1>
        <p className="text-sm text-gray-500 mt-1 mb-6">Send offers and discounts via Email or SMS</p>

        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 flex flex-col gap-5">
            {/* Compose */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-base font-bold text-gray-800 mb-4">Compose Message</h3>
              <div className="flex gap-2 mb-5">
                {["Email", "SMS", "Both"].map(m => (
                  <button key={m} onClick={() => setMode(m)}
                    className={`px-5 py-2 rounded-xl text-sm font-semibold transition border ${
                      mode === m
                        ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                        : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                    }`}>{m}</button>
                ))}
              </div>
              <div className="mb-4">
                <label className={labelCls}>Title</label>
                <input className={inputCls} value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div className="mb-4">
                <label className={labelCls}>Message</label>
                <textarea className={`${inputCls} h-24 resize-none`} value={message} onChange={e => setMessage(e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Discount Code</label>
                <input className={inputCls} value={discountCode} onChange={e => setDiscountCode(e.target.value)} />
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-base font-bold text-gray-800 mb-4">Preview</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="font-bold text-gray-800 mb-2">{title}</div>
                <div className="text-sm text-gray-600 whitespace-pre-line">{preview}</div>
              </div>
            </div>
          </div>

          {/* Recipients */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
            <h3 className="text-base font-bold text-gray-800 mb-4">Select Recipients</h3>
            <div className="flex gap-2 mb-4">
              <button onClick={toggleAll} className="px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition">Select All</button>
              <button onClick={() => setSelected([])} className="px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition">Clear</button>
            </div>
            <div className="space-y-1 mb-5">
              {customers.map(c => (
                <div key={c.id} onClick={() => toggleOne(c.id)}
                  className="flex items-center gap-3 py-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50 rounded-xl px-2 transition"
                >
                  <input type="checkbox" checked={selected.includes(c.id)} onChange={() => {}} className="w-4 h-4 accent-indigo-600" />
                  <Avatar first={c.firstName} last={c.lastName} size={34} />
                  <div>
                    <div className="font-semibold text-sm text-gray-800">{c.firstName} {c.lastName}</div>
                    <div className="text-xs text-gray-400">#{c.id} · {c.city}</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => { if (selected.length) setSent(true); }}
              className={`w-full py-3 rounded-xl text-sm font-bold transition ${
                selected.length
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
                  : "bg-indigo-200 text-white cursor-not-allowed"
              }`}
            >
              {sent ? "✓ Sent!" : "Send Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
const API = "http://localhost:5000/api/customers";

const Customers = () => {
  const [customers,    setCustomers]    = useState([]);
  const [stats,        setStats]        = useState({ total: 0, active: 0, addedThisMonth: 0 });
  const [loading,      setLoading]      = useState(true);
  const [page,         setPage]         = useState("list");
  const [selectedCust, setSelectedCust] = useState(null);
  const [modalMode,    setModalMode]    = useState(null);
  const [editTarget,   setEditTarget]   = useState(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res  = await fetch(API);
      const data = await res.json();
      if (data.success) {
        setCustomers(data.customers.map(c => ({ ...c, id: c.customerId })));
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCustomers(); }, []);

  const saveCustomer = async form => {
    try {
      if (modalMode === "add") {
        await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch(`${API}/${editTarget.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setModalMode(null);
      setEditTarget(null);
      fetchCustomers();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const deleteCustomer = async id => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchCustomers();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading) return (
    <div className="ml-64 flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-gray-400 text-sm">Loading...</div>
    </div>
  );

  return (
    // ml-64 — Sidebar width offset (ඔයාගේ Sidebar fixed w-64)
    <div className="flex flex-col min-h-screen bg-gray-50">

      {page === "list" && (
        <CustomerListPage
          customers={customers}
          stats={stats}
          onView={c  => { setSelectedCust(c); setPage("history"); }}
          onEdit={c  => { setEditTarget(c); setModalMode("edit"); }}
          onDelete={deleteCustomer}
          onAdd={()  => { setEditTarget(null); setModalMode("add"); }}
          onPromo={() => setPage("promo")}
        />
      )}

      {page === "history" && selectedCust && (
        <PurchaseHistoryPage
          customer={customers.find(c => c.id === selectedCust.id)}
          onBack={() => setPage("list")}
          onEdit={c => { setEditTarget(c); setModalMode("edit"); }}
        />
      )}

      {page === "promo" && (
        <SendPromoPage
          customers={customers}
          onBack={() => setPage("list")}
        />
      )}

      {modalMode && (
        <CustomerModal
          customer={modalMode === "edit" ? editTarget : null}
          onSave={saveCustomer}
          onClose={() => { setModalMode(null); setEditTarget(null); }}
        />
      )}
    </div>
  );
};

export default Customers;