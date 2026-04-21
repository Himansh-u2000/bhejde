/**
 * API Service Layer
 * Handles all HTTP requests to the ASP.NET Core backend.
 * Base URL points to the backend running on port 5299.
 */

const BASE_URL = "http://localhost:5299/api";

/**
 * Fetches all inventory items from the backend.
 * @returns {Promise<Array>} Array of inventory items
 */
export async function fetchItems() {
  const response = await fetch(`${BASE_URL}/items`);

  if (!response.ok) {
    throw new Error(`Failed to fetch items: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Adds a new inventory item.
 * @param {{ name: string, sku: string, quantity: number }} itemData
 * @returns {Promise<Object>} The created inventory item
 */
export async function addItem(itemData) {
  const response = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemData),
  });

  if (!response.ok) {
    // Try to parse validation errors from the backend
    const errorData = await response.json().catch(() => null);
    if (errorData?.errors) {
      const messages = Object.values(errorData.errors).flat().join(", ");
      throw new Error(messages);
    }
    throw new Error(`Failed to add item: ${response.statusText}`);
  }

  return response.json();
}
