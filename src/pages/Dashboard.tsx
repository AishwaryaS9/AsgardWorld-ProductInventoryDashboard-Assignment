import { useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Category, Product } from '../types';
import { MOCK_DATA, stockStatus } from '../utils';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import DeleteModal from '../components/DeleteModal';

const Dashboard = () => {
    const CATEGORIES: Category[] = ['electronics', 'furniture', 'stationery'];
    const [products, setProducts] = useLocalStorage<Product[]>('products_v1', MOCK_DATA);
    const [query, setQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [filterStock, setFilterStock] = useState<string>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const openAddModal = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleSaveProduct = (data: Omit<Product, "id"> & { id?: string }) => {
        if (editingProduct) {
            const updated = products.map(product =>
                product.id === editingProduct.id ? { ...product, ...data, id: data.sku } : product
            );
            setProducts(updated);
        } else {
            const newProduct: Product = { id: data.sku, ...data };
            setProducts([...products, newProduct]);
        }

        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const openDeleteModal = (product: Product) => {
        setProductToDelete(product);
        setIsDeleteOpen(true);
    };

    const handleConfirmDelete = () => {
        if (productToDelete) {
            setProducts(products.filter(product => product.id !== productToDelete.id));
        }
        setIsDeleteOpen(false);
        setProductToDelete(null);
    };

    const filtered = useMemo(() => {
        const searchTerm = query.trim().toLowerCase();
        return products.filter((product) => {
            if (searchTerm && !(product.name.toLowerCase().includes(searchTerm) || product.sku.toLowerCase().includes(searchTerm))) return false;
            if (filterCategory !== 'all' && product.category !== filterCategory) return false;
            if (filterStock !== 'all') {
                const status = stockStatus(product.quantity);
                if (filterStock === 'in' && status !== 'In Stock') return false;
                if (filterStock === 'low' && status !== 'Low Stock') return false;
                if (filterStock === 'out' && status !== 'Out of Stock') return false;
            }
            return true;
        });
    }, [products, query, filterCategory, filterStock]);


    return (
        <main className='mx-4 my-8 md:mx-8 lg:mx-16'>
            <header className="mb-6">
                <h1 className="text-xl md:text-2xl font-semibold" tabIndex={0}>
                    Product Inventory Dashboard
                </h1>
            </header>
            <div className="flex mb-6 justify-end">
                <button onClick={openAddModal}
                    className="bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:ring-offset-1 cursor-pointer"
                    aria-label="Add new product"
                >
                    Add Product
                </button>
            </div>

            <section className='flex flex-col lg:flex-row justify-between mb-6 gap-4' aria-label="Search and filter products">
                <form
                    className="flex items-center w-full max-w-sm text-sm gap-2 bg-white px-4 py-2 border border-gray-300 rounded-md shadow-xs  focus-within:ring-1 focus-within:ring-gray-300"
                    role="search"
                    aria-label="Search products"
                >
                    <FaSearch size={18} className="text-gray-500" aria-hidden="true" />
                    <input
                        type="search"
                        className="w-full bg-transparent outline-none"
                        placeholder="Search products by name or SKU"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Search products"
                    />
                </form>

                <div className="flex flex-wrap gap-6 items-center" aria-label="Filter options">
                    <div className="flex gap-3 items-center">
                        <label className="text-sm font-medium flex items-center gap-1" htmlFor="categoryFilter">
                            <FiFilter size={14} aria-hidden="true" /> Category:
                        </label>
                        <select
                            id="categoryFilter"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="border border-gray-300 outline-none focus:ring-1 focus:ring-gray-300 rounded-md px-3 py-2 text-sm capitalize"
                            aria-label="Filter by category"
                        >
                            <option value="all">All Categories</option>
                            {CATEGORIES.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 items-center">
                        <label className="text-sm font-medium flex items-center gap-1" htmlFor="stockFilter">
                            <FiFilter size={14} aria-hidden="true" /> Stock:
                        </label>
                        <select
                            id="stockFilter"
                            value={filterStock}
                            onChange={(e) => setFilterStock(e.target.value)}
                            className="border border-gray-300 outline-none focus:ring-1 focus:ring-gray-300 rounded-md px-3 py-2 text-sm"
                            aria-label="Filter by stock status"
                        >
                            <option value="all">All stock</option>
                            <option value="in">In Stock</option>
                            <option value="low">Low Stock</option>
                            <option value="out">Out of Stock</option>
                        </select>
                    </div>
                </div>
            </section>

            <section
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
                aria-label="Product list"
            >
                {filtered.length > 0 ? (
                    filtered.map((item) => (
                        <ProductCard
                            key={item.id}
                            product={item}
                            onEdit={() => openEditModal(item)}
                            onDelete={() => openDeleteModal(item)}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full text-center justify-center my-10" role="status">
                        No products found.
                    </p>
                )}
            </section>

            {isModalOpen && (
                <ProductModal
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveProduct}
                    existing={editingProduct}
                    existingSkus={products
                        .filter(product => product.id !== editingProduct?.id)
                        .map(product => product.sku.toLowerCase())
                    }
                />
            )}

            {isDeleteOpen && (
                <DeleteModal
                    message="Are you sure you want to delete this product?"
                    onCancel={() => setIsDeleteOpen(false)}
                    onDelete={handleConfirmDelete}
                />
            )}
        </main>
    )
}

export default Dashboard