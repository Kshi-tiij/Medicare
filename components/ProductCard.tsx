import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, FileText } from 'lucide-react';
import { Product } from '../App';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    onClick: (product: Product) => void;
    badge?: ReactNode;
    layoutPrefix?: string;
}

export function ProductCard({ product, onAddToCart, onClick, badge, layoutPrefix = 'product' }: ProductCardProps) {
    const layoutId = `${layoutPrefix}-${product.id}`;

    return (
        <motion.div
            layoutId={layoutId}
            onClick={() => onClick(product)}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col cursor-pointer group relative h-full"
        >
            {badge && (
                <div className="absolute top-3 right-3 z-10">
                    {badge}
                </div>
            )}
            <div className="aspect-square overflow-hidden bg-gray-100 relative">

                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="mb-2">
                    <span className="text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded">
                        {product.category}
                    </span>
                    {product.prescription && (
                        <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded ml-2">
                            <FileText className="w-3 h-3 inline mr-1" />
                            Rx Required
                        </span>
                    )}
                </div>

                <h3 className="text-gray-900 mb-2 font-medium">
                    {product.name}
                </h3>

                <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg md:text-xl text-teal-600 font-bold">
                        ${product.price}
                    </span>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product);
                        }}
                        disabled={!product.inStock}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 duration-200"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="text-sm">Add</span>
                    </button>
                </div>

                {!product.inStock && (
                    <p className="text-sm text-red-600 mt-2">Out of Stock</p>
                )}
            </div>
        </motion.div>
    );
}
