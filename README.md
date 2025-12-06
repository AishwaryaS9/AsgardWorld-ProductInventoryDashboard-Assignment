# Product Inventory Dashboard

A single-page React + TypeScript application for managing product inventory with full CRUD functionality, search/filter features, and persistent local storage.

🔗 **Live Demo:** http://localhost:5173

## 🛠 Tech Stack

- React + TypeScript
- Vite
- Custom hooks (e.g., `useLocalStorage`)
- Modular, component-based structure
- Tailwind CSS for styling

### 🚀 Setup Instructions

1.  Clone the repository:

    ```bash
    git clone https://github.com/AishwaryaS9/AsgardWorld-ProductInventoryDashboard-Assignment.git
    ```

2.  Navigate to the project directory:
    ```bash
    cd AsgardWorld-ProductInventoryDashboard-Assignment-main
    ```
3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Run the application:

    ```bash
    npm run dev
    ```

5.  Open [http://localhost:5173](http://localhost:5173) in your browser to see the app.

## 📁 Folder Structure & Approach

A simplified view of the structure:

```bash
productinventorydashboard/
├── public/                 # Static assets served directly
├── src/
│ ├── App.tsx               # Root component
│ ├── assets/               # App images
│ ├── components/           # Reusable UI components
│ │ ├── DeleteModal.tsx     # Modal for confirming product deletion
│ │ ├── ProductCard.tsx     # Card layout for displaying product info
│ │ ├── ProductModal.tsx    # Modal for adding/editing products
│ ├── hooks/
│ │ ├── useLocalStorage.ts  # Custom hook for persisted state storage
│ ├── pages/
│ │ ├── Dashboard.tsx       # Main page showing product list and controls
│ ├── types.ts              # Shared TypeScript types
│ ├── utils.ts              # Helper utilities
│ ├── index.css             # Global styles
│ ├── main.tsx              # App entry point
├── index.html              # Vite entry HTML
├── vite.config.ts          # Vite configuration
```

### Design Approach

- **Component‑driven architecture**: UI is divided into small, reusable components.
- **Local storage persistence**: A custom hook (useLocalStorage) stores product data without backend requirements.
- **Modular structure**: Components, hooks, and utilities are separated for readability and scalability.
- **Type safety**: Shared interfaces (types.ts) ensure consistency across features.

## ✨ Features

**1. Product List**

A responsive grid (1–3 columns) displaying each product’s **name, SKU, price, quantity, category, and stock status**. Stock is color-coded: **0 → Out of Stock (rose), 1–10 → Low Stock (amber), >10 → In Stock (emerald)**. Click a card to edit or use the trash icon to delete.

**2. Add New Product**

Clicking **Add Product** opens a modal form for **Name, SKU, Price, Quantity, and Category**. All fields are required; **Price > 0, Quantity ≥ 0, SKU must be unique**. The same modal is used for editing, with fields pre-filled.

**3. Edit Product**

Clicking a product opens the modal in **edit mode** with pre-filled data. **SKU validation** ignores the original SKU, and updates are saved instantly to **localStorage**.

**4. Delete Product**

A **confirmation modal** prevents accidental deletion. Background clicks are blocked, and deletion requires explicit confirmation via the **Delete** button.

**5. Search & Filter System**

Search by **name or SKU** and filter by **category** or **stock status**. Filters and search can be **combined** for precise results.

**6. Data Persistence**

Data is stored via a custom `useLocalStorage()` hook under the key `products_data`. Persists across reloads and loads mock data only on first run.

## 📝 Assumptions Made

- The app does not use a backend; all product data persists using localStorage.
- Product images are not required; the dashboard focuses on text‑based product fields.
- No authentication layer is required for this project.
- Modal interactions (add/edit/delete) are sufficient for the required CRUD functionality.

## 🎯 Conclusion

This Product Inventory Dashboard is an easy-to-use tool to manage products. It has a responsive design, saves data, and uses simple modals, making it useful for small inventory tasks or as a base for bigger projects.
