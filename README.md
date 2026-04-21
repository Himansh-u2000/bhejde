# BhejDe – Inventory Items Manager

A full-stack Inventory Items Manager built with **React** (frontend) and **ASP.NET Core Web API** (backend).

![React](https://img.shields.io/badge/Frontend-React_19-61DAFB?logo=react&logoColor=white)
![.NET](https://img.shields.io/badge/Backend-.NET_8-512BD4?logo=dotnet&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS_4-06B6D4?logo=tailwindcss&logoColor=white)

---

## 📋 Features

- **View Inventory Items** – Responsive table displaying all items with Name, SKU, Quantity, and Stock Status
- **Add New Items** – Modal form with client-side & server-side validation
- **Stock Status** – Automatically computed on the backend based on quantity:
  - `Quantity = 0` → 🔴 Out of Stock
  - `Quantity < 10` → 🟡 Low Stock
  - `Quantity ≥ 10` → 🟢 In Stock
- **Loading & Error States** – Spinner during data fetch, error message with retry button
- **Responsive Design** – Table view on desktop, card layout on mobile
- **Swagger API Docs** – Interactive API documentation at `/swagger`

---

## 🏗️ Tech Stack

| Layer     | Technology                        |
| --------- | --------------------------------- |
| Frontend  | React 19, Vite, Tailwind CSS 4   |
| Backend   | ASP.NET Core 8 Web API (C#)      |
| Storage   | In-memory collection (List\<T\>) |
| API Docs  | Swagger / Swashbuckle             |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)

### 1. Clone the Repository

```bash
git clone https://github.com/Himansh-u2000/bhejde-inventory-manager.git
cd bhejde-inventory-manager
```

### 2. Run the Backend

```bash
cd backend
dotnet restore
dotnet run
```

The API will be available at: **http://localhost:5299**
Swagger UI: **http://localhost:5299/swagger**

### 3. Run the Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at: **http://localhost:5173**

---

## 📁 Project Structure

```
bhejde/
├── backend/                          # ASP.NET Core Web API
│   ├── Controllers/
│   │   └── ItemsController.cs        # REST API endpoints (GET, POST)
│   ├── Models/
│   │   └── InventoryItem.cs          # Data model + DTO with validation
│   ├── Services/
│   │   └── InventoryService.cs       # In-memory data store + business logic
│   ├── Program.cs                    # App entry point (CORS, Swagger, DI)
│   └── backend.csproj                # .NET project configuration
│
├── frontend/                         # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx            # App header with item count badge
│   │   │   ├── InventoryTable.jsx    # Item list with loading/error/empty states
│   │   │   ├── AddItemModal.jsx      # Modal form for adding new items
│   │   │   └── StockBadge.jsx        # Color-coded stock status badge
│   │   ├── services/
│   │   │   └── api.js                # API service layer (fetch wrapper)
│   │   ├── App.jsx                   # Main application component
│   │   ├── App.css
│   │   ├── index.css                 # Global styles + Tailwind imports
│   │   └── main.jsx                  # React entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint      | Description              | Request Body                                  |
| ------ | ------------- | ------------------------ | --------------------------------------------- |
| GET    | `/api/items`  | Fetch all inventory items | —                                              |
| POST   | `/api/items`  | Add a new inventory item  | `{ "name": "string", "sku": "string", "quantity": number }` |

### Example Response (GET /api/items)

```json
[
  {
    "id": "a1b2c3d4-...",
    "name": "Wireless Mouse",
    "sku": "WM-1001",
    "quantity": 25,
    "stockStatus": "In Stock"
  }
]
```

---

## 📝 Assumptions & Design Decisions

1. **In-Memory Storage** – Used a simple `List<T>` as the data store. Data resets when the server restarts. This was chosen as the assignment states "in-memory collection is sufficient" and keeps the solution focused on the core requirements.

2. **Stock Status Computed on Backend** – The `stockStatus` field is a computed property on the `InventoryItem` model. This ensures consistent business logic regardless of the client consuming the API.

3. **Pre-seeded Data** – The backend starts with 4 sample inventory items so the UI has data on first load and all three stock statuses (In Stock, Low Stock, Out of Stock) can be demonstrated.

4. **Validation** – Implemented on both frontend (client-side for UX) and backend (model validation attributes for security). Required fields and quantity ≥ 0 are enforced.

5. **CORS** – Configured to allow requests from `http://localhost:5173` (Vite dev server). In production, this would be restricted to the deployed frontend domain.

6. **No Authentication** – Not implemented as it was not required by the assignment. In a real application, authentication and authorization would be essential.

7. **No Delete/Update** – Only GET and POST endpoints were implemented as specified in the requirements.

---

## 👨‍💻 Author

**Himanshu Haldar**
- GitHub: [@Himansh-u2000](https://github.com/Himansh-u2000)
- LinkedIn: [Himanshu Haldar](https://linkedin.com/in/himanshu-haldar-5b3830250)
