using backend.Models;

namespace backend.Services
{
    /// <summary>
    /// In-memory service that manages inventory items.
    /// Registered as a Singleton so data persists for the lifetime of the app.
    /// (Data resets when the server restarts — this is intentional for a demo app.)
    /// </summary>
    public class InventoryService
    {
        // In-memory list acting as our "database"
        private readonly List<InventoryItem> _items;

        public InventoryService()
        {
            // Pre-seed with sample data so the UI isn't empty on first load
            _items = new List<InventoryItem>
            {
                new InventoryItem
                {
                    Id = Guid.NewGuid(),
                    Name = "Wireless Mouse",
                    SKU = "WM-1001",
                    Quantity = 25
                },
                new InventoryItem
                {
                    Id = Guid.NewGuid(),
                    Name = "USB-C Charging Cable",
                    SKU = "UC-2045",
                    Quantity = 7
                },
                new InventoryItem
                {
                    Id = Guid.NewGuid(),
                    Name = "Mechanical Keyboard",
                    SKU = "MK-3012",
                    Quantity = 0
                },
                new InventoryItem
                {
                    Id = Guid.NewGuid(),
                    Name = "Monitor Stand",
                    SKU = "MS-4500",
                    Quantity = 15
                }
            };
        }

        /// <summary>
        /// Returns all inventory items.
        /// </summary>
        public List<InventoryItem> GetAll()
        {
            return _items;
        }

        /// <summary>
        /// Creates a new inventory item from the DTO and adds it to the in-memory store.
        /// Returns the created item with its generated Id and computed StockStatus.
        /// </summary>
        public InventoryItem Add(CreateItemDto dto)
        {
            var item = new InventoryItem
            {
                Id = Guid.NewGuid(),
                Name = dto.Name.Trim(),
                SKU = dto.SKU.Trim(),
                Quantity = dto.Quantity
            };

            _items.Add(item);
            return item;
        }
    }
}
