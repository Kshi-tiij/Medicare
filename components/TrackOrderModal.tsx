import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Truck, CheckCircle, Clock, Search, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

interface TrackOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type OrderStatus = 'placed' | 'processing' | 'shipped' | 'delivered';

interface OrderDetails {
    id: string;
    items: Array<{
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }>;
    date: string;
    status: OrderStatus;
}

export function TrackOrderModal({ isOpen, onClose }: TrackOrderModalProps) {
    const [orderId, setOrderId] = useState('');
    const [status, setStatus] = useState<OrderStatus | null>(null);
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();

        if (!orderId.trim()) {
            toast.error('Please enter an Order ID');
            return;
        }

        setIsSearching(true);
        setStatus(null);
        setOrderDetails(null);

        // Simulate API call
        setTimeout(() => {
            setIsSearching(false);
            const inputId = orderId.toUpperCase();

            // Get orders from local storage
            // Handle both legacy format (array of strings) and new format (array of objects)
            const storedData = JSON.parse(localStorage.getItem('medicare_orders') || '[]');

            let foundOrder: OrderDetails | null = null;

            // Check for demo ID
            if (inputId === 'MC123') {
                foundOrder = {
                    id: 'MC123',
                    items: [
                        { id: 1, name: 'Premium Omega-3', price: 29.99, quantity: 1, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400' },
                        { id: 2, name: 'Digital Thermometer', price: 45.50, quantity: 2, image: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&q=80&w=400' }
                    ],
                    date: new Date().toLocaleDateString(),
                    status: 'placed'
                };
            } else {
                // Search in stored data
                const match = storedData.find((order: any) => {
                    if (typeof order === 'string') return order === inputId;
                    return order.id === inputId;
                });

                if (match) {
                    if (typeof match === 'string') {
                        // Handle legacy string-only orders (graceful fallback)
                        foundOrder = {
                            id: match,
                            items: [], // No items for legacy data
                            date: new Date().toLocaleDateString(),
                            status: 'placed'
                        };
                    } else {
                        foundOrder = match;
                    }
                }
            }

            if (foundOrder) {
                setStatus('placed'); // Force placed status as per previous requirements
                setOrderDetails(foundOrder);
                toast.success('Order found!');
            } else {
                toast.error('Order not found. Please check your Order ID.');
            }
        }, 1500);
    };

    if (!isOpen) return null;

    const steps = [
        { id: 'placed', label: 'Order Placed', icon: Package, date: orderDetails?.date || 'Oct 24' },
        { id: 'processing', label: 'Processing', icon: Clock, date: 'Pending' },
        { id: 'shipped', label: 'Shipped', icon: Truck, date: 'Pending' },
        { id: 'delivered', label: 'Delivered', icon: CheckCircle, date: 'Pending' },
    ];

    const getCurrentStepIndex = () => {
        if (!status) return -1;
        return steps.findIndex(s => s.id === status);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
                layoutId="track-order-modal"
                className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh] relative z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
                <div className="p-6 md:p-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-20"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>

                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                            <motion.div
                                animate={{ x: [-2, 2, -2] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            >
                                <Truck className="w-6 h-6 text-teal-600" />
                            </motion.div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Track Your Order</h2>
                        <p className="text-gray-600 text-sm">
                            Enter your Order ID to see details and status
                        </p>
                    </div>

                    <form onSubmit={handleTrack} className="mb-8">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                placeholder="Enter Order ID (e.g., MC123)"
                                className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                            />
                            <button
                                type="submit"
                                disabled={isSearching}
                                className="absolute right-2 p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors disabled:bg-gray-300"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </form>

                    <AnimatePresence mode="wait">
                        {isSearching ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-center py-8"
                            >
                                <div className="animate-spin w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                                <p className="text-gray-500">Retrieving order details...</p>
                            </motion.div>
                        ) : status ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                {/* Order Details Section */}
                                {orderDetails && orderDetails.items.length > 0 && (
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                        <h3 className="flex items-center text-sm font-semibold text-gray-900 mb-3">
                                            <ShoppingBag className="w-4 h-4 mr-2 text-teal-600" />
                                            Order Summary ({orderDetails.items.length} items)
                                        </h3>
                                        <div className="space-y-3 max-h-48 overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                                            {orderDetails.items.map((item, idx) => (
                                                <div key={idx} className="flex gap-3 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-12 h-12 rounded-md object-cover bg-gray-100"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                    </div>
                                                    <div className="text-sm font-semibold text-gray-900">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Timeline Section */}
                                <div className="relative">
                                    <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200" />
                                    <div className="space-y-8">
                                        {steps.map((step, index) => {
                                            const isCompleted = index <= getCurrentStepIndex();
                                            const isCurrent = index === getCurrentStepIndex();

                                            // Ensure isCurrent is defined!
                                            // Re-verified during file overwrite.

                                            const StepIcon = step.icon;

                                            return (
                                                <div key={step.id} className="relative flex items-start pl-14">
                                                    <div className={`absolute left-3 -translate-x-1/2 w-6 h-6 rounded-full border-4 ${isCompleted ? 'bg-teal-600 border-teal-100' : 'bg-white border-gray-200'
                                                        } z-10`} />

                                                    <div className={`flex-1 p-4 rounded-lg border ${isCurrent ? 'border-teal-500 bg-teal-50' : 'border-gray-100 bg-gray-50'
                                                        }`}>
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h3 className={`font-semibold ${isCompleted ? 'text-gray-900' : 'text-gray-500'
                                                                }`}>{step.label}</h3>
                                                            <StepIcon className={`w-5 h-5 ${isCompleted ? 'text-teal-600' : 'text-gray-400'
                                                                }`} />
                                                        </div>
                                                        <p className="text-xs text-gray-500">
                                                            {isCompleted ? step.date : 'Estimated'}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
