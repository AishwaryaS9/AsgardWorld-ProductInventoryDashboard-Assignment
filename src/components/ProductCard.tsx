import { RiDeleteBin6Line } from 'react-icons/ri';
import { stockStatus } from '../utils';
import type { Product } from '../types';

interface Props {
    product: Product;
    onEdit: () => void;
    onDelete: () => void;
}

const ProductCard = ({ product, onEdit, onDelete }: Props) => {
    const status = stockStatus(product.quantity);

    const getStatusTagColor = () => {
        switch (status) {
            case 'In Stock':
                return 'text-emerald-700 bg-emerald-100 border border-emerald-500/20';
            case 'Low Stock':
                return 'text-amber-700 bg-amber-100 border border-amber-500/20';
            default:
                return 'text-rose-700 bg-rose-100 border border-rose-500/20';
        }
    };

    return (
        <article className='rounded-xl bg-white py-4 shadow-sm border border-gray-200/50 cursor-pointer outline-none'
            onClick={onEdit}
            role="button"
            tabIndex={0}
            aria-label={`Edit product ${product.name}, SKU ${product.sku}`}>
            <header className="flex items-end gap-3 px-4 justify-between">
                <span
                    className={`text-[11px] font-medium px-4 py-0.5 rounded ${getStatusTagColor()}`}
                    aria-label={`Stock status: ${status}`}
                >
                    {status}
                </span>
                <span className="text-sm font-medium text-gray-500 px-4 py-0.5 rounded">
                    {product.sku}
                </span>
            </header>
            <div className="px-4 mt-4">
                <h2 className="text-md font-medium text-gray-800 line-clamp-2" tabIndex={-1}>
                    {product.name}
                </h2>

                <p className="text-[13px] text-gray-700/80 font-medium mt-2">
                    Price: <span className="font-medium text-gray-700">${product.price}</span>
                </p>

                <p className="text-[13px] text-gray-700/80 font-medium mt-2 capitalize">
                    Category: <span className="font-medium text-gray-700">{product.category}</span>
                </p>

                <p className="text-[13px] text-gray-700/80 font-medium mt-2">
                    Quantity: <span className="font-medium text-gray-700">{product.quantity}</span>
                </p>

                <div className="flex justify-end gap-4 mt-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        className="p-1 cursor-pointer"
                        aria-label={`Delete product ${product.name}`}
                    >
                        <RiDeleteBin6Line className="text-red-600" size={20} />
                    </button>
                </div>
            </div>
        </article>
    )
}

export default ProductCard