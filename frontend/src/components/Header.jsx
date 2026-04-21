/**
 * Header Component
 * BhejDe-branded header with logo, purple gradient, and stats dashboard.
 */
function Header({ itemCount, inStockCount, lowStockCount, outOfStockCount }) {
  return (
    <header className="relative overflow-hidden rounded-2xl mb-8"
      style={{
        background: "linear-gradient(135deg, #1a0533 0%, #2d1065 40%, #1a0533 100%)",
        border: "1px solid rgba(124,58,237,0.2)",
      }}
    >
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] opacity-30"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 p-6 md:p-8">
        {/* Top: Logo + Branding */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-6">
          <div className="flex items-center gap-4">
            <img
              src="/BhejDe.17a6c574daf3a8a82d99.png"
              alt="BhejDe Logo"
              className="h-8 md:h-9 w-auto"
              style={{ filter: "brightness(1.1)" }}
            />
            <div className="h-7 w-px bg-purple-500/20" />
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                Inventory Manager
              </h1>
              <p className="text-xs text-purple-300/60 font-medium mt-0.5">
                Supply Chain Suite
              </p>
            </div>
          </div>

          {/* Quick tag */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider"
            style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.05))",
              border: "1px solid rgba(245,158,11,0.2)",
              color: "#fbbf24",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            AI-Powered
          </div>
        </div>

        {/* Stats Row */}
        {itemCount !== undefined && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-4">
            {/* Total Items */}
            <StatCard
              label="Total Items"
              value={itemCount}
              dotColor="#a78bfa"
              bgColor="rgba(124,58,237,0.08)"
              borderColor="rgba(124,58,237,0.15)"
            />
            {/* In Stock */}
            <StatCard
              label="In Stock"
              value={inStockCount ?? 0}
              dotColor="#34d399"
              bgColor="rgba(16,185,129,0.06)"
              borderColor="rgba(16,185,129,0.12)"
            />
            {/* Low Stock */}
            <StatCard
              label="Low Stock"
              value={lowStockCount ?? 0}
              dotColor="#fbbf24"
              bgColor="rgba(245,158,11,0.06)"
              borderColor="rgba(245,158,11,0.12)"
              pulse
            />
            {/* Out of Stock */}
            <StatCard
              label="Out of Stock"
              value={outOfStockCount ?? 0}
              dotColor="#f87171"
              bgColor="rgba(239,68,68,0.06)"
              borderColor="rgba(239,68,68,0.12)"
            />
          </div>
        )}
      </div>
    </header>
  );
}

function StatCard({ label, value, dotColor, bgColor, borderColor, pulse }) {
  return (
    <div
      className="flex items-center gap-4 px-5 py-4 rounded-xl backdrop-blur-sm transition-all duration-200 hover:scale-[1.02]"
      style={{ background: bgColor, border: `1px solid ${borderColor}` }}
    >
      <div
        className="w-3 h-3 rounded-full flex-shrink-0"
        style={{
          backgroundColor: dotColor,
          boxShadow: `0 0 10px ${dotColor}80`,
          animation: pulse ? "pulse-dot 2s ease-in-out infinite" : "none",
        }}
      />
      <div>
        <p className="text-2xl font-extrabold text-white leading-none">{value}</p>
        <p className="text-xs text-purple-300/50 font-semibold uppercase tracking-wider mt-1">{label}</p>
      </div>
    </div>
  );
}

export default Header;
