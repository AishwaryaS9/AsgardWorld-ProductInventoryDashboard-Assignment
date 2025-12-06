import { useState } from "react";
import { BiX } from "react-icons/bi";
import type { Category, Product } from "../types";

interface Props {
    onClose: () => void;
    onSave: (data: Omit<Product, "id">) => void;
    existing?: Product | null;
    existingSkus: string[];
}


const ProductModal = ({ onClose, onSave, existing, existingSkus }: Props) => {
    const [name, setName] = useState(existing?.name ?? "");
    const [sku, setSku] = useState(existing?.sku ?? "");
    const [price, setPrice] = useState(existing?.price ?? 0);
    const [quantity, setQuantity] = useState(existing?.quantity ?? 0);
    const [category, setCategory] = useState<Category>(
        existing?.category ?? "electronics"
    );
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!name.trim()) newErrors.name = "Name is required.";
        if (!sku.trim()) newErrors.sku = "SKU is required.";
        if (price <= 0) newErrors.price = "Price must be greater than 0.";
        if (quantity < 0) newErrors.quantity = "Quantity must be 0 or greater.";

        const skuLower = sku.toLowerCase();
        const originalSku = existing?.sku.toLowerCase();

        if (!existing || skuLower !== originalSku) {
            if (existingSkus.includes(skuLower)) {
                newErrors.sku = "SKU must be unique.";
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        onSave({ name, sku, price, quantity, category });
    };

    const borderClass = (field: string) =>
        errors[field] ? "border-red-500" : "border-gray-300";

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                className="bg-white rounded-xl shadow-lg w-full max-w-md p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex justify-between items-center mb-4">
                    <h2 id="modal-title" className="text-lg font-medium text-gray-800">
                        {existing ? "Edit Product" : "Add Product"}
                    </h2>
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        className="text-gray-600 hover:text-gray-800 outline-none cursor-pointer"
                    >
                        <BiX size={28} />
                    </button>
                </header>

                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">
                            Name
                        </label>
                        <input
                            id="name"
                            className={`mt-1 w-full rounded-md px-3 py-2 border outline-none ${borderClass(
                                "name"
                            )}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && (
                            <p id="name-error" className="text-red-500 text-xs mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* SKU */}
                    <div>
                        <label htmlFor="sku" className="block text-sm font-medium">
                            SKU
                        </label>
                        <input
                            id="sku"
                            className={`mt-1 w-full rounded-md px-3 py-2 border outline-none ${borderClass(
                                "sku"
                            )}`}
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            aria-invalid={!!errors.sku}
                            aria-describedby={errors.sku ? "sku-error" : undefined}
                        />
                        {errors.sku && (
                            <p id="sku-error" className="text-red-500 text-xs mt-1">
                                {errors.sku}
                            </p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium">
                            Price
                        </label>
                        <input
                            id="price"
                            type="number"
                            className={`mt-1 w-full rounded-md px-3 py-2 border outline-none ${borderClass(
                                "price"
                            )}`}
                            value={price}
                            step="0.01"
                            onChange={(e) => setPrice(Number(e.target.value))}
                            aria-invalid={!!errors.price}
                            aria-describedby={errors.price ? "price-error" : undefined}
                        />
                        {errors.price && (
                            <p id="price-error" className="text-red-500 text-xs mt-1">
                                {errors.price}
                            </p>
                        )}
                    </div>

                    {/* Quantity */}
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium">
                            Quantity
                        </label>
                        <input
                            id="quantity"
                            type="number"
                            className={`mt-1 w-full rounded-md px-3 py-2 border outline-none ${borderClass(
                                "quantity"
                            )}`}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            aria-invalid={!!errors.quantity}
                            aria-describedby={errors.quantity ? "quantity-error" : undefined}
                        />
                        {errors.quantity && (
                            <p id="quantity-error" className="text-red-500 text-xs mt-1">
                                {errors.quantity}
                            </p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium">
                            Category
                        </label>
                        <select
                            id="category"
                            className="mt-1 w-full border border-gray-300 outline-none rounded-md px-3 py-2"
                            value={category}
                            onChange={(e) => setCategory(e.target.value as Category)}
                        >
                            <option value="electronics">Electronics</option>
                            <option value="furniture">Furniture</option>
                            <option value="stationery">Stationery</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 cursor-pointer"
                        >
                            {existing ? "Update" : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductModal