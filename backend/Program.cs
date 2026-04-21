using backend.Services;

var builder = WebApplication.CreateBuilder(args);

// ---------- Register Services (like app.use() in Express) ----------

// Add controller support (maps routes to controller methods)
builder.Services.AddControllers();

// Register InventoryService as Singleton (one instance for the entire app lifetime)
// This ensures our in-memory list persists between requests
builder.Services.AddSingleton<InventoryService>();

// Add Swagger for API documentation & testing UI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "BhejDe Inventory API",
        Version = "v1",
        Description = "A simple inventory management API for the BhejDe take-home assignment"
    });
});

// Configure CORS to allow the React frontend (running on port 5173) to call our API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// ---------- Configure Middleware Pipeline (order matters, like Express middleware) ----------

// Enable Swagger UI (available at /swagger)
app.UseSwagger();
app.UseSwaggerUI();

// Enable CORS with our policy
app.UseCors("AllowFrontend");

// Map controller routes (reads [Route] attributes from controllers)
app.MapControllers();

// Start the server on port 5299
app.Run("http://localhost:5299");
