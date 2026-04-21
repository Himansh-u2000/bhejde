import StockBadge from "./StockBadge";

/**
 * InventoryTable Component
 * BhejDe-branded table with purple-tinted glass card and row styling.
 */
function InventoryTable({ items, loading, error, onRetry }) {
  // ---- Loading ----
  if (loading) {
    return (
      <div className="card-glass rounded-2xl">
        <div className="p-16 flex flex-col items-center justify-center gap-5">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/15" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 animate-spin" />
          </div>
          <div className="text-center">
            <p className="text-purple-200/80 font-medium text-sm">Loading inventory...</p>
            <p className="text-purple-300/40 text-xs mt-1">Connecting to server</p>
          </div>
        </div>
      </div>
    );
  }

  // ---- Error ----
  if (error) {
    return (
      <div className="card-glass rounded-2xl" style={{ borderColor: "rgba(239,68,68,0.15)" }}>
        <div className="p-16 flex flex-col items-center justify-center gap-5">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-red-400 font-bold mb-1">Connection Error</p>
            <p className="text-purple-300/50 text-sm max-w-sm">{error}</p>
          </div>
          <button
            onClick={onRetry}
            className="mt-2 px-6 py-2.5 rounded-xl text-red-300 text-sm font-bold cursor-pointer transition-all duration-200 hover:brightness-125"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            ↻ Try Again
          </button>
        </div>
      </div>
    );
  }

  // ---- Empty ----
  if (!items || items.length === 0) {
    return (
      <div className="card-glass rounded-2xl">
        <div className="p-16 flex flex-col items-center justify-center gap-5">
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(124,58,237,0.04))",
              border: "1px solid rgba(124,58,237,0.12)",
              animation: "float 4s ease-in-out infinite",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} style={{ color: "rgba(124,58,237,0.5)" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-lg">No items yet</p>
            <p className="text-purple-300/50 text-sm mt-1">Add your first inventory item to get started</p>
          </div>
        </div>
      </div>
    );
  }

  // ---- Table ----
  return (
    <div className="card-glass rounded-2xl overflow-hidden anim-fade-in-up">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(124,58,237,0.1)" }}>
              <th className="text-left px-6 py-4 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "rgba(167,139,250,0.5)" }}>Name</th>
              <th className="text-left px-6 py-4 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "rgba(167,139,250,0.5)" }}>SKU</th>
              <th className="text-left px-6 py-4 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "rgba(167,139,250,0.5)" }}>Quantity</th>
              <th className="text-left px-6 py-4 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "rgba(167,139,250,0.5)" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.id}
                className="row-hover group"
                style={{
                  borderBottom: "1px solid rgba(124,58,237,0.06)",
                  animation: `fadeInUp 0.4s ease-out ${index * 50}ms both`,
                }}
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                      style={{
                        background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.08))",
                        border: "1px solid rgba(124,58,237,0.15)",
                      }}
                    >
                      <span className="text-sm font-extrabold" style={{ color: "#a78bfa" }}>
                        {item.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-base font-semibold text-white/90 group-hover:text-white transition-colors">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <code
                    className="text-sm font-mono px-3 py-1.5 rounded-lg"
                    style={{
                      color: "#a78bfa",
                      background: "rgba(124,58,237,0.08)",
                      border: "1px solid rgba(124,58,237,0.1)",
                    }}
                  >
                    {item.sku}
                  </code>
                </td>
                <td className="px-6 py-5">
                  <span className="text-base font-bold text-white/80 tabular-nums">{item.quantity.toLocaleString()}</span>
                </td>
                <td className="px-6 py-5">
                  <StockBadge status={item.stockStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="p-5 transition-all duration-200 hover:bg-purple-500/[0.03]"
            style={{
              borderBottom: "1px solid rgba(124,58,237,0.06)",
              animation: `fadeInUp 0.4s ease-out ${index * 50}ms both`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.08))",
                    border: "1px solid rgba(124,58,237,0.15)",
                  }}
                >
                  <span className="text-xs font-extrabold" style={{ color: "#a78bfa" }}>
                    {item.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-semibold text-white/90">{item.name}</span>
              </div>
              <StockBadge status={item.stockStatus} />
            </div>
            <div className="flex items-center justify-between ml-12">
              <code className="text-xs font-mono px-2 py-0.5 rounded-lg"
                style={{ color: "#a78bfa", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.1)" }}
              >
                {item.sku}
              </code>
              <span className="text-purple-300/50 text-xs">
                Qty: <span className="text-white/80 font-bold">{item.quantity}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InventoryTable;
