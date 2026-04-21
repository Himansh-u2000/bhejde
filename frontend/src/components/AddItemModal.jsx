import { useState } from "react";
import { addItem } from "../services/api";

/**
 * AddItemModal Component
 * BhejDe-branded modal with purple gradient accents.
 */
function AddItemModal({ isOpen, onClose, onItemAdded }) {
  const [formData, setFormData] = useState({ name: "", sku: "", quantity: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  function resetForm() {
    setFormData({ name: "", sku: "", quantity: "" });
    setErrors({});
    setApiError("");
    setSubmitting(false);
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  function validate() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.sku.trim()) newErrors.sku = "SKU is required";
    if (formData.quantity === "" || formData.quantity === null) {
      newErrors.quantity = "Quantity is required";
    } else if (parseInt(formData.quantity) < 0 || isNaN(parseInt(formData.quantity))) {
      newErrors.quantity = "Quantity must be 0 or greater";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      await addItem({
        name: formData.name.trim(),
        sku: formData.sku.trim(),
        quantity: parseInt(formData.quantity),
      });
      onItemAdded();
      handleClose();
    } catch (err) {
      setApiError(err.message || "Failed to add item. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  if (!isOpen) return null;

  const inputBase = "w-full px-4 py-3 rounded-xl text-sm text-white/90 placeholder-purple-300/30 outline-none transition-all duration-200 font-medium";
  const inputNormal = `${inputBase} hover:border-purple-500/30 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/20`;
  const inputError = `${inputBase} border-red-500/30 focus:border-red-500/40 focus:ring-2 focus:ring-red-500/20`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 backdrop-blur-md" style={{ background: "rgba(6,2,12,0.8)" }} />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl anim-scale-in"
        style={{
          background: "linear-gradient(160deg, #1a0f2e, #110822)",
          border: "1px solid rgba(124,58,237,0.15)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(124,58,237,0.08)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient accent */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #7c3aed, #a78bfa, #f59e0b, #a78bfa, #7c3aed)" }} />

        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-5">
          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-2xl"
              style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.15)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: "#a78bfa" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Add New Item</h2>
              <p className="text-sm mt-1" style={{ color: "rgba(167,139,250,0.4)" }}>Fill in the inventory details</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer transition-all duration-200 hover:bg-purple-500/10"
            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.1)", color: "rgba(167,139,250,0.5)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="mx-8 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.12), transparent)" }} />

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
          {apiError && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
              style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)", color: "#f87171" }}
            >
              <span>⚠</span>
              <p>{apiError}</p>
            </div>
          )}

          {/* Name */}
          <div>
            <label htmlFor="item-name" className="block text-sm font-semibold text-purple-200/70 mb-2">
              Item Name <span className="text-red-400">*</span>
            </label>
            <input
              id="item-name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Wireless Mouse"
              className={errors.name ? inputError : inputNormal}
              style={{ background: "rgba(124,58,237,0.04)", border: `1px solid ${errors.name ? "rgba(239,68,68,0.3)" : "rgba(124,58,237,0.1)"}` }}
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-400">⚠ {errors.name}</p>}
          </div>

          {/* SKU */}
          <div>
            <label htmlFor="item-sku" className="block text-sm font-semibold text-purple-200/70 mb-2">
              SKU <span className="text-red-400">*</span>
            </label>
            <input
              id="item-sku"
              type="text"
              value={formData.sku}
              onChange={(e) => handleChange("sku", e.target.value)}
              placeholder="e.g. WM-1001"
              className={`${errors.sku ? inputError : inputNormal} font-mono`}
              style={{ background: "rgba(124,58,237,0.04)", border: `1px solid ${errors.sku ? "rgba(239,68,68,0.3)" : "rgba(124,58,237,0.1)"}` }}
            />
            {errors.sku && <p className="mt-1.5 text-xs text-red-400">⚠ {errors.sku}</p>}
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="item-quantity" className="block text-sm font-semibold text-purple-200/70 mb-2">
              Quantity <span className="text-red-400">*</span>
            </label>
            <input
              id="item-quantity"
              type="number"
              min="0"
              value={formData.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
              placeholder="0"
              className={errors.quantity ? inputError : inputNormal}
              style={{ background: "rgba(124,58,237,0.04)", border: `1px solid ${errors.quantity ? "rgba(239,68,68,0.3)" : "rgba(124,58,237,0.1)"}` }}
            />
            {errors.quantity && <p className="mt-1.5 text-xs text-red-400">⚠ {errors.quantity}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 hover:brightness-125"
              style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.1)", color: "rgba(167,139,250,0.6)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-3 rounded-xl text-white text-sm font-bold cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.97]"
              style={{
                background: submitting ? "rgba(124,58,237,0.3)" : "linear-gradient(135deg, #7c3aed, #6d28d9)",
                boxShadow: submitting ? "none" : "0 4px 20px rgba(124,58,237,0.3)",
              }}
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Item
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemModal;
