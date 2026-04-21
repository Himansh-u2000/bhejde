using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly InventoryService _inventoryService;
        public ItemsController(InventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }
        [HttpGet]
        public ActionResult<List<InventoryItem>> GetAll()
        {
            var items = _inventoryService.GetAll();
            return Ok(items);
        }

        [HttpPost]
        public ActionResult<InventoryItem> Create([FromBody] CreateItemDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = _inventoryService.Add(dto);

            // Return 201 Created with the new item
            return CreatedAtAction(nameof(GetAll), new { id = item.Id }, item);
        }
    }
}
