using backend.Models;

namespace backend.Services
{
    public class InventoryService
    {
        private readonly List<InventoryItem> _items;

        public InventoryService()
        {
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

        public List<InventoryItem> GetAll()
        {
            return _items;
        }

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
