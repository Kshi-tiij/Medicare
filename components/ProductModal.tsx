import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Product } from '../App';

interface ProductModalProps {
    product: Product;
    layoutId: string;
    onClose: () => void;
    onAddToCart: (product: Product) => void;
}

export function ProductModal({ product, layoutId, onClose, onAddToCart }: ProductModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            />
            <motion.div
                layoutId={layoutId}
                className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden z-10"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-20"
                >
                    <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                </button>

                <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-full">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col">
                        <motion.div className="mb-auto">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-700 mb-3">
                                {product.category}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                {product.name}
                            </h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {product.description}
                            </p>

                            <div className="space-y-3 mb-6">
                                {product.prescription && (
                                    <div className="flex items-center text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                                        ⚠️ Prescription Required
                                    </div>
                                )}
                                {product.inStock ? (
                                    <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                                        ✓ In Stock - Ready to Ship
                                    </div>
                                ) : (
                                    <div className="flex items-center text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                                        ✕ Currently Out of Stock
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                            <div className="text-2xl font-bold text-gray-900">
                                ${product.price.toFixed(2)}
                            </div>
                            <button
                                onClick={() => {
                                    onAddToCart(product);
                                    onClose();
                                }}
                                disabled={!product.inStock}
                                className="px-6 py-3 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
                            >
                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
