import { CheckCircle, Package, Mail } from 'lucide-react';

interface OrderConfirmationProps {
    orderNumber: string;
    onContinueShopping: () => void;
}

export function OrderConfirmation({ orderNumber, onContinueShopping }: OrderConfirmationProps) {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-12 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
                </div>

                <h1 className="text-2xl md:text-4xl text-gray-900 mb-4">
                    Order Confirmed!
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                    Thank you for your purchase. Your order has been successfully placed.
                </p>

                <div className="bg-teal-50 rounded-lg p-4 md:p-6 mb-8">
                    <p className="text-sm text-gray-600 mb-2">Order Number</p>
                    <p className="text-xl md:text-2xl text-teal-600 font-bold">{orderNumber}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8 text-left">
                    <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Package className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                            <h3 className="text-gray-900 mb-1">Estimated Delivery</h3>
                            <p className="text-sm text-gray-600">3-5 business days</p>
                        </div>
                    </div>

                    <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Mail className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                            <h3 className="text-gray-900 mb-1">Confirmation Email</h3>
                            <p className="text-sm text-gray-600">Sent to your email address</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={onContinueShopping}
                        className="w-full bg-teal-600 text-white py-3 md:py-4 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        Continue Shopping
                    </button>

                    <p className="text-sm text-gray-500">
                        You will receive a tracking number via email once your order ships.
                    </p>
                </div>
            </div>
        </div>
    );
}