import { useMemo, useState } from 'react'

const commodities = [
  { id: 'RICE-A', name: 'Rice Grade A', grade: 'A', price: 150000 },
  { id: 'COFFEE-A', name: 'Coffee Bean Grade A', grade: 'A', price: 220000 },
  { id: 'CORN-B', name: 'Corn Grade B', grade: 'B', price: 95000 },
  { id: 'PEANUT-B', name: 'Peanut Grade B', grade: 'B', price: 87000 },
]

const incomingLogistics = [
  { id: 'L-1001', commodity: 'Rice', supplier: 'CV Sumber Panen', weight: '1.2 Ton' },
  { id: 'L-1002', commodity: 'Corn', supplier: 'Koperasi Tani Maju', weight: '900 Kg' },
  { id: 'L-1003', commodity: 'Coffee Bean', supplier: 'PT Bukit Hijau', weight: '550 Kg' },
]

const pricePoints = [118, 121, 119, 122, 126, 124, 127]
const serviceFee = 25000

const formatRupiah = (value) => `Rp ${value.toLocaleString('id-ID')}`

function App() {
  const [cart, setCart] = useState({})
  const [inspectionStatus, setInspectionStatus] = useState(
    incomingLogistics.reduce((acc, item) => ({ ...acc, [item.id]: 'Grade A' }), {}),
  )

  const cartItems = useMemo(
    () =>
      commodities
        .map((commodity) => ({ ...commodity, qty: cart[commodity.id] || 0 }))
        .filter((commodity) => commodity.qty > 0),
    [cart],
  )

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const total = subtotal + (cartItems.length ? serviceFee : 0)

  const updateCart = (id, change) => {
    setCart((prev) => {
      const nextQty = Math.max(0, (prev[id] || 0) + change)
      if (!nextQty) {
        const next = { ...prev }
        delete next[id]
        return next
      }

      return { ...prev, [id]: nextQty }
    })
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl bg-[#F9FAFB] p-4 text-[#1C1917] md:p-8">
      <h1 className="mb-6 border border-[#1C1917] p-4 text-2xl font-bold md:text-3xl">
        AGRI-KARTA MVP Dashboard Suite
      </h1>

      <section className="mb-6 border border-[#1C1917] p-4">
        <h2 className="mb-4 text-xl font-semibold">1) Public Landing Page — Macro Transparency</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="border border-[#1C1917] p-4">
            <h3 className="mb-3 text-base font-semibold">Moving Average Price Prediction (Mock)</h3>
            <svg viewBox="0 0 320 120" className="h-36 w-full border border-[#1C1917]">
              <polyline
                fill="none"
                stroke="#1C1917"
                strokeWidth="2"
                points={pricePoints
                  .map((point, index) => `${index * 50 + 10},${120 - (point - 110) * 6}`)
                  .join(' ')}
              />
            </svg>
            <p className="mt-2 text-sm">7-day trend shows stable growth for partner factories.</p>
          </article>

          <article className="border border-[#1C1917] p-4">
            <h3 className="mb-3 text-base font-semibold">Warehouse Storage Availability</h3>
            <ul className="space-y-2 text-sm">
              {[{ label: 'Factory A', value: 68 }, { label: 'Factory B', value: 42 }, { label: 'Factory C', value: 83 }].map((item) => (
                <li key={item.label} className="border border-[#1C1917] p-2">
                  <div className="mb-1 flex justify-between">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-2 border border-[#1C1917]">
                    <div className="h-full bg-[#4D7C0F]" style={{ width: `${item.value}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="mb-6 border border-[#1C1917] p-4">
        <h2 className="mb-4 text-xl font-semibold">2) B2B Buyer Dashboard</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="border border-[#1C1917] p-4">
            <h3 className="mb-3 text-base font-semibold">Grade A/B Catalog</h3>
            <ul className="space-y-2">
              {commodities.map((item) => (
                <li key={item.id} className="border border-[#1C1917] p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm">Grade {item.grade} • {formatRupiah(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateCart(item.id, -1)}
                        className="min-w-8 border border-[#1C1917] bg-[#F9FAFB] px-2 py-1 text-sm rounded-[4px] hover:bg-[#1C1917] hover:text-[#F9FAFB] hover:border-2"
                      >
                        -
                      </button>
                      <span className="min-w-5 text-center text-sm">{cart[item.id] || 0}</span>
                      <button
                        type="button"
                        onClick={() => updateCart(item.id, 1)}
                        className="min-w-8 border border-[#1C1917] bg-[#F9FAFB] px-2 py-1 text-sm rounded-[4px] hover:bg-[#1C1917] hover:text-[#F9FAFB] hover:border-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className="border border-[#1C1917] p-4">
            <h3 className="mb-3 text-base font-semibold">Cart + Checkout Simulation</h3>
            <ul className="mb-3 space-y-2 text-sm">
              {cartItems.length ? (
                cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between border border-[#1C1917] p-2">
                    <span>
                      {item.name} x{item.qty}
                    </span>
                    <span>{formatRupiah(item.price * item.qty)}</span>
                  </li>
                ))
              ) : (
                <li className="border border-[#1C1917] p-2">No items selected.</li>
              )}
            </ul>
            <div className="space-y-1 border border-[#1C1917] p-3 text-sm">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatRupiah(subtotal)}</span>
              </p>
              <p className="flex justify-between">
                <span>Service Fee</span>
                <span>{cartItems.length ? formatRupiah(serviceFee) : formatRupiah(0)}</span>
              </p>
              <p className="flex justify-between border-t border-[#1C1917] pt-1 font-semibold">
                <span>Total</span>
                <span>{formatRupiah(total)}</span>
              </p>
            </div>
            <button
              type="button"
              className="mt-3 w-full border border-[#1C1917] bg-[#4D7C0F] px-3 py-2 text-[#F9FAFB] rounded-[4px] hover:bg-[#F9FAFB] hover:text-[#4D7C0F] hover:border-2"
            >
              Simulate Checkout
            </button>
          </article>
        </div>
      </section>

      <section className="border border-[#1C1917] p-4">
        <h2 className="mb-4 text-xl font-semibold">3) Admin / QC Dashboard</h2>
        <div className="overflow-x-auto border border-[#1C1917]">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#1C1917] bg-[#F5F5F0]">
                <th className="border-r border-[#1C1917] p-2">Logistics ID</th>
                <th className="border-r border-[#1C1917] p-2">Commodity</th>
                <th className="border-r border-[#1C1917] p-2">Supplier</th>
                <th className="border-r border-[#1C1917] p-2">Weight</th>
                <th className="p-2">QC Status</th>
              </tr>
            </thead>
            <tbody>
              {incomingLogistics.map((row) => (
                <tr key={row.id} className="border-b border-[#1C1917]">
                  <td className="border-r border-[#1C1917] p-2">{row.id}</td>
                  <td className="border-r border-[#1C1917] p-2">{row.commodity}</td>
                  <td className="border-r border-[#1C1917] p-2">{row.supplier}</td>
                  <td className="border-r border-[#1C1917] p-2">{row.weight}</td>
                  <td className="p-2">
                    <select
                      value={inspectionStatus[row.id]}
                      onChange={(event) =>
                        setInspectionStatus((prev) => ({ ...prev, [row.id]: event.target.value }))
                      }
                      className={`w-full border px-2 py-1 ${
                        inspectionStatus[row.id] === 'Reject'
                          ? 'border-[#991B1B] text-[#991B1B]'
                          : 'border-[#1C1917] text-[#1C1917]'
                      } bg-[#F9FAFB]`}
                    >
                      <option>Grade A</option>
                      <option>Grade B</option>
                      <option>Reject</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default App
