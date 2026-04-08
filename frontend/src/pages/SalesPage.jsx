import { useMemo, useState } from 'react'

const PRODUCTS = [
  { name: 'Wireless Earbuds', sku: 'SKU-0042', price: 29.99, stock: '48 left' },
  { name: 'USB-C Cable 1m', sku: 'SKU-0017', price: 9.99, stock: '120 left' },
  { name: 'Phone Stand', sku: 'SKU-0089', price: 14.99, stock: '15 left' },
  { name: 'Screen Protector', sku: 'SKU-0031', price: 6.99, stock: '3 left'},
]

const TAX_RATE = 0.08
const DISCOUNT_FIXED = 2

function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

function formatMoney(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
}

function SalesPage() {
  const [cartSkus, setCartSkus] = useState([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Cash')

  const cartItems = useMemo(
    () => PRODUCTS.filter((p) => cartSkus.includes(p.sku)),
    [cartSkus],
  )

  const subtotal = useMemo(
    () => cartItems.reduce((sum, p) => sum + p.price, 0),
    [cartItems],
  )

  const tax = subtotal * TAX_RATE
  const discount = cartItems.length > 0 ? DISCOUNT_FIXED : 0
  const total = Math.max(0, subtotal + tax - discount)

  function toggleCart(sku) {
    setCartSkus((prev) =>
      prev.includes(sku) ? prev.filter((s) => s !== sku) : [...prev, sku],
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 lg:flex-row lg:p-8">
      <section className="min-w-0 flex-1 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">New Sale</h2>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <div className="flex min-h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4">
            <IconSearch className="h-5 w-5 shrink-0 text-slate-400" />
            <input
              type="search"
              placeholder="Search product or scan barcode..."
              className="w-full border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
          <button
            type="button"
            className="shrink-0 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Scan
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {PRODUCTS.map((product) => {
            const selected = cartSkus.includes(product.sku)
            return (
              <button
                key={product.sku}
                type="button"
                onClick={() => toggleCart(product.sku)}
                className={`rounded-2xl border bg-white p-4 text-left shadow-sm transition ${
                  selected
                    ? 'border-blue-600 ring-2 ring-blue-600/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-slate-900">{product.name}</h3>
                  <span className="text-xs text-slate-500">{product.stock}</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">{product.sku}</p>
                <p className="mt-3 text-lg font-bold text-blue-600">
                  {formatMoney(product.price)}
                </p>
              </button>
            )
          })}
        </div>
      </section>

      <aside className="w-full shrink-0 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm lg:w-[380px]">
        <h2 className="text-lg font-bold text-slate-900">
          Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </h2>

        {cartItems.length === 0 ? (
          <p className="mt-6 text-sm text-slate-500">No items yet. Select products to add them here.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {cartItems.map((item) => (
              <li key={item.sku} className="flex justify-between gap-2 text-sm">
                <div>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">x1 · {item.sku}</p>
                </div>
                <span className="shrink-0 font-semibold text-slate-900">
                  {formatMoney(item.price)}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="my-5 border-t border-dashed border-slate-200" />

        <dl className="space-y-2 text-sm text-slate-600">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatMoney(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Tax (8%)</dt>
            <dd>{formatMoney(tax)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Discount</dt>
            <dd className="font-medium text-emerald-600">
              {discount > 0 ? `-${formatMoney(discount)}` : formatMoney(0)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-slate-900">
            <dt>Total</dt>
            <dd>{formatMoney(total)}</dd>
          </div>
        </dl>

        <div className="mt-5 flex gap-2">
          <input
            type="text"
            placeholder="Coupon code"
            className="min-h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-500"
          />
          <button
            type="button"
            className="shrink-0 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Apply
          </button>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {['Cash', 'Card', 'QR', 'Wallet'].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setSelectedPaymentMethod(label)}
              className={
                label === selectedPaymentMethod
                  ? 'rounded-xl border-2 border-blue-600 bg-blue-50 py-2.5 text-xs font-semibold text-blue-600'
                  : 'rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-100'
              }
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          disabled={cartItems.length === 0}
          className="mt-6 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {cartItems.length === 0
            ? 'Complete Sale'
            : `Complete Sale — ${formatMoney(total)}`}
        </button>
      </aside>
    </div>
  )
}

export default SalesPage
