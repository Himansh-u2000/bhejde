/**
 * StockBadge Component
 * BhejDe-themed color-coded badge with glowing dot.
 */
function StockBadge({ status }) {
  const config = {
    "In Stock": {
      bg: "rgba(16,185,129,0.08)",
      text: "#34d399",
      dot: "#34d399",
      border: "rgba(16,185,129,0.18)",
    },
    "Low Stock": {
      bg: "rgba(245,158,11,0.08)",
      text: "#fbbf24",
      dot: "#fbbf24",
      border: "rgba(245,158,11,0.18)",
    },
    "Out of Stock": {
      bg: "rgba(239,68,68,0.08)",
      text: "#f87171",
      dot: "#f87171",
      border: "rgba(239,68,68,0.18)",
    },
  };

  const style = config[status] || config["Out of Stock"];

  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 hover:scale-[1.04]"
      style={{
        background: style.bg,
        color: style.text,
        border: `1px solid ${style.border}`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{
          backgroundColor: style.dot,
          boxShadow: `0 0 6px ${style.dot}99`,
          animation: status === "Low Stock" ? "pulse-dot 2s ease-in-out infinite" : "none",
        }}
      />
      {status}
    </span>
  );
}

export default StockBadge;
