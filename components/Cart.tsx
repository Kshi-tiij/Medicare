import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '../App';

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onUpdateQuantity: (productId: string, quantity: number) => void;
    onRemoveItem: (productId: string) => void;
    onCheckout: () => void;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const shipping = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + tax + shipping;

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Cart Sidebar */}
            <div className="fixed top-0 right-0 h-full w-full sm:w-96 md:w-[28rem] bg-white shadow-xl z-50 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b">
                    <h2 className="text-xl md:text-2xl text-gray-900">Shopping Cart</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-grow overflow-y-auto p-4 md:p-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <X className="w-12 h-12 text-gray-400" />
                            </div>
                            <p className="text-gray-600 mb-2">Your cart is empty</p>
                            <p className="text-sm text-gray-500">Add some products to get started</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 bg-gray-50 rounded-lg p-3 md:p-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                                    />

                                    <div className="flex-grow">
                                        <h3 className="text-gray-900 mb-1">{item.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2 font-bold">${item.price}</p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-300">
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                    className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="px-3 text-gray-900">{item.quantity}</span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                    className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => onRemoveItem(item.id)}
                                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t p-4 md:p-6 space-y-3">
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-bold">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax (8%)</span>
                                <span className="font-bold">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="font-bold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            {subtotal < 50 && (
                                <p className="text-xs text-teal-600">
                                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                                </p>
                            )}
                            <div className="flex justify-between text-lg pt-2 border-t">
                                <span className="text-gray-900">Total</span>
                                <span className="text-teal-600 font-bold">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={onCheckout}
                            className="w-full bg-teal-600 text-white py-3 md:py-4 rounded-lg hover:bg-teal-700 transition-colors"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}