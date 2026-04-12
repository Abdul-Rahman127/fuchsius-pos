import { NavLink, Outlet, useNavigate } from 'react-router-dom'

function IconDashboard(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className}>
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="11" width="7" height="10" rx="1" />
      <rect x="3" y="15" width="7" height="6" rx="1" />
    </svg>
  )
}

function IconUsers(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconSales(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v2m0 8v2M9 10h6M9 14h4" strokeLinecap="round" />
    </svg>
  )
}

function IconInventory(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className}>
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  )
}

function IconSettings(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function IconLogout(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className}>
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard', Icon: IconDashboard },
  { to: '/employee', label: 'Employee', Icon: IconUsers },
  { to: '/sales', label: 'Sales', Icon: IconSales },
  { to: '/inventory', label: 'Inventory', Icon: IconInventory },
  { to: '/settings', label: 'Settings', Icon: IconSettings },
]

function PosLayout() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="flex w-[260px] shrink-0 flex-col bg-[#050b24] px-4 py-8 text-white">
        <div className="text-center">
          <p className="text-lg font-bold tracking-wide">Fuchsius</p>
          <p className="mt-1 text-xs text-slate-400">Point of Sale</p>
        </div>

        <nav className="mt-10 flex flex-col gap-1">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition',
                  isActive
                    ? 'bg-sky-50 text-blue-600'
                    : 'text-slate-200 hover:bg-white/5',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={
                      isActive
                        ? 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white'
                        : 'text-slate-300'
                    }
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="mt-auto flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-400 transition hover:text-red-300"
        >
          <IconLogout className="h-5 w-5" />
          Logout
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 bg-slate-50 px-6 py-4 lg:px-8">
          <h1 className="text-lg font-bold text-slate-900">Fuchsius POS</h1>
          <button
            type="button"
            className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
          >
            Cashier Mode
          </button>
        </header>

        <Outlet />
      </div>
    </div>
  )
}

export default PosLayout
