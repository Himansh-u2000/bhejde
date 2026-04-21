import { useState, useEffect, useCallback, useMemo } from "react";
import Header from "./components/Header";
import InventoryTable from "./components/InventoryTable";
import AddItemModal from "./components/AddItemModal";
import { fetchItems } from "./services/api";

/**
 * App Component
 * Main layout with BhejDe-branded background and purple accents.
 */
function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const stockCounts = useMemo(() => ({
    inStock: items.filter((i) => i.stockStatus === "In Stock").length,
    lowStock: items.filter((i) => i.stockStatus === "Low Stock").length,
    outOfStock: items.filter((i) => i.stockStatus === "Out of Stock").length,
  }), [items]);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchItems();
      setItems(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return (
    <div className="min-h-screen relative" style={{ background: "#0c0517" }}>
      {/* Background: top purple glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[300px]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(124,58,237,0.05) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-10 md:py-14">
        {/* Header */}
        <Header
          itemCount={items.length}
          inStockCount={stockCounts.inStock}
          lowStockCount={stockCounts.lowStock}
          outOfStockCount={stockCounts.outOfStock}
        />

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6 anim-fade-in-up">
          <div>
            <h2 className="text-lg font-bold text-white/90">All Items</h2>
            <p className="text-xs mt-0.5" style={{ color: "rgba(167,139,250,0.35)" }}>Manage your inventory catalog</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold text-white cursor-pointer transition-all duration-200 hover:shadow-xl active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
              boxShadow: "0 4px 20px rgba(124,58,237,0.3)",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Item
          </button>
        </div>

        {/* Table */}
        <InventoryTable
          items={items}
          loading={loading}
          error={error}
          onRetry={loadItems}
        />

        {/* Modal */}
        <AddItemModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onItemAdded={loadItems}
        />

        {/* Footer */}
        <footer className="mt-14 pt-5 flex items-center justify-between" style={{ borderTop: "1px solid rgba(124,58,237,0.08)" }}>
          <p className="text-[11px] font-medium" style={{ color: "rgba(167,139,250,0.25)" }}>
            Built with React + ASP.NET Core
          </p>
          <img
            src="/BhejDe.17a6c574daf3a8a82d99.png"
            alt="BhejDe"
            className="h-4 w-auto opacity-30 hover:opacity-60 transition-opacity duration-300"
          />
        </footer>
      </div>
    </div>
  );
}

export default App;
