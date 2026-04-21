using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    /// <summary>
    /// Represents an inventory item in the system.
    /// Stock status is computed automatically based on quantity.
    /// </summary>
    public class InventoryItem
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string SKU { get; set; } = string.Empty;
        public int Quantity { get; set; }

        /// <summary>
        /// Computed stock status based on quantity:
        /// Quantity = 0  → "Out of Stock"
        /// Quantity < 10 → "Low Stock"
        /// Quantity >= 10 → "In Stock"
        /// </summary>
        public string StockStatus
        {
            get
            {
                if (Quantity == 0) return "Out of Stock";
                if (Quantity < 10) return "Low Stock";
                return "In Stock";
            }
        }
    }

    /// <summary>
    /// DTO (Data Transfer Object) for creating a new inventory item.
    /// Contains validation rules to ensure data integrity.
    /// </summary>
    public class CreateItemDto
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Name must be between 1 and 100 characters")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "SKU is required")]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "SKU must be between 1 and 50 characters")]
        public string SKU { get; set; } = string.Empty;

        [Required(ErrorMessage = "Quantity is required")]
        [Range(0, int.MaxValue, ErrorMessage = "Quantity must be 0 or greater")]
        public int Quantity { get; set; }
    }
}
