using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers
{
    /// <summary>
    /// API Controller for managing inventory items.
    /// Provides endpoints to fetch all items and add new ones.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly InventoryService _inventoryService;

        // Dependency Injection: ASP.NET Core automatically injects the InventoryService
        // (similar to how you'd inject a service in Express.js middleware)
        public ItemsController(InventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        /// <summary>
        /// GET /api/items
        /// Returns all inventory items with their computed stock status.
        /// </summary>
        [HttpGet]
        public ActionResult<List<InventoryItem>> GetAll()
        {
            var items = _inventoryService.GetAll();
            return Ok(items);
        }

        /// <summary>
        /// POST /api/items
        /// Adds a new inventory item.
        /// Request body must include: Name, SKU, Quantity (>= 0).
        /// Returns the created item with 201 status code.
        /// </summary>
        [HttpPost]
        public ActionResult<InventoryItem> Create([FromBody] CreateItemDto dto)
        {
            // Model validation is handled automatically by ASP.NET Core
            // using the [Required] and [Range] attributes on CreateItemDto.
            // If validation fails, it returns 400 Bad Request automatically.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = _inventoryService.Add(dto);

            // Return 201 Created with the new item
            // (similar to res.status(201).json(item) in Express.js)
            return CreatedAtAction(nameof(GetAll), new { id = item.Id }, item);
        }
    }
}
