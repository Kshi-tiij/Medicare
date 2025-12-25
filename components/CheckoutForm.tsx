import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CartItem } from '../App';
import { ArrowLeft, CreditCard, Truck, User, Banknote } from 'lucide-react';
import { User as AuthUser } from '../context/AuthContext';

interface CheckoutFormProps {
    cartItems: CartItem[];
    onOrderComplete: (orderNumber: string) => void;
    onBack: () => void;
    user: AuthUser | null;
}

interface CheckoutFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    paymentMethod: string;
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
    shippingMethod: string;
    notes: string;
}

export function CheckoutForm({ cartItems, onOrderComplete, onBack, user }: CheckoutFormProps) {
    const [currentStep, setCurrentStep] = useState<'personal' | 'shipping' | 'payment'>('personal');
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue,
    } = useForm<CheckoutFormData>();

    useEffect(() => {
        if (user) {
            setValue('email', user.email);
            if (user.phone) setValue('phone', user.phone);
            if (user.address) setValue('address', user.address);
            if (user.city) setValue('city', user.city);
            if (user.state) setValue('state', user.state);
            if (user.zipCode) setValue('zipCode', user.zipCode);
            if (user.country) setValue('country', user.country);

            const nameParts = user.name.split(' ');
            if (nameParts.length > 0) {
                setValue('firstName', nameParts[0]);
                if (nameParts.length > 1) {
                    setValue('lastName', nameParts.slice(1).join(' '));
                }
            }
        }
    }, [user, setValue]);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    // Card Payment = Free shipping, Cash on Delivery = $5.99 shipping charge
    const shipping = paymentMethod === 'card' ? 0 : 5.99;
    const total = subtotal + tax + shipping;

    const onSubmit = async (data: CheckoutFormData) => {
        setIsProcessing(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const orderNumber = `MC${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Save to local storage for tracking demo
        const existingOrders = JSON.parse(localStorage.getItem('medicare_orders') || '[]');
        const newOrder = {
            id: orderNumber,
            items: cartItems,
            date: new Date().toLocaleDateString(),
            status: 'placed'
        };
        localStorage.setItem('medicare_orders', JSON.stringify([...existingOrders, newOrder]));

        onOrderComplete(orderNumber);
        setIsProcessing(false);
    };

    const handleNextStep = async () => {
        let fieldsToValidate: (keyof CheckoutFormData)[] = [];

        if (currentStep === 'personal') {
            fieldsToValidate = ['firstName', 'lastName', 'email', 'phone'];
        } else if (currentStep === 'shipping') {
            fieldsToValidate = ['address', 'city', 'state', 'zipCode', 'country'];
        }

        const isValid = await trigger(fieldsToValidate);

        if (isValid) {
            if (currentStep === 'personal') setCurrentStep('shipping');
            else if (currentStep === 'shipping') setCurrentStep('payment');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
            <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Shopping</span>
            </button>

            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                {/* Checkout Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm p-4 md:p-8">
                        <h1 className="text-2xl md:text-3xl text-gray-900 mb-6">Guest Checkout</h1>

                        {/* Progress Steps */}
                        <div className="flex items-center justify-between mb-8">
                            {['personal', 'shipping', 'payment'].map((step, index) => {
                                const stepLabels = { personal: 'Personal', shipping: 'Shipping', payment: 'Payment' };
                                const icons = { personal: User, shipping: Truck, payment: CreditCard };
                                const Icon = icons[step as keyof typeof icons];
                                const isActive = currentStep === step;
                                const isPast = ['personal', 'shipping', 'payment'].indexOf(currentStep) > index;

                                return (
                                    <div key={step} className="flex items-center flex-1">
                                        <div className="flex flex-col items-center flex-1">
                                            <div
                                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${isActive || isPast ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-400'
                                                    }`}
                                            >
                                                <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                            </div>
                                            <span className={`text-xs md:text-sm mt-2 ${isActive ? 'text-teal-600' : 'text-gray-500'}`}>
                                                {stepLabels[step as keyof typeof stepLabels]}
                                            </span>
                                        </div>
                                        {index < 2 && (
                                            <div
                                                className={`h-1 flex-1 -mt-6 ${isPast ? 'bg-teal-600' : 'bg-gray-200'
                                                    }`}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Personal Information */}
                            {currentStep === 'personal' && (
                                <div className="space-y-4">
                                    <h2 className="text-xl text-gray-900 mb-4">Personal Information</h2>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-700 mb-2">
                                                First Name <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                {...register('firstName', { required: 'First name is required' })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 bg-white"
                                                placeholder="John"
                                            />
                                            {errors.firstName && (
                                                <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-700 mb-2">
                                                Last Name <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                {...register('lastName', { required: 'Last name is required' })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent text-gray-900 bg-white"
                                                placeholder="Doe"
                                            />
                                            {errors.lastName && (
                                                <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-700 mb-2">
                                            Email Address <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Invalid email address',
                                                },
                                            })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 bg-white"
                                            placeholder="john.doe@example.com"
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-700 mb-2">
                                            Phone Number <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            {...register('phone', {
                                                required: 'Phone number is required',
                                                pattern: {
                                                    value: /^[0-9+\-() ]{10,}$/,
                                                    message: 'Invalid phone number',
                                                },
                                            })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 bg-white"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                        {errors.phone && (
                                            <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="w-full bg-teal-600 text-white py-3 md:py-4 rounded-lg hover:bg-teal-700 transition-colors"
                                    >
                                        Continue to Shipping
                                    </button>
                                </div>
                            )}

                            {/* Shipping Information */}
                            {currentStep === 'shipping' && (
                                <div className="space-y-4">
                                    <h2 className="text-xl text-gray-900 mb-4">Shipping Address</h2>

                                    <div>
                                        <label className="block text-sm text-gray-700 mb-2">
                                            Street Address <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            {...register('address', { required: 'Address is required' })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 bg-white"
                                            placeholder="123 Main Street"
                                        />
                                        {errors.address && (
                                            <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>
                                        )}
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-700 mb-2">
                                                City <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                {...register('city', { required: 'City is required' })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 bg-white"
                                                placeholder="New York"
                                            />
                                            {errors.city && (
                                                <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-700 mb-2">
                                                State <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                {...register('state', { required: 'State is required' })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent text-gray-900 bg-white"
                                                placeholder="NY"
                                            />
                                            {errors.state && (
                                                <p className="text-sm text-red-600 mt-1">{errors.state.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-700 mb-2">
                                                ZIP Code <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                {...register('zipCode', {
                                                    required: 'ZIP code is required',
                                                    pattern: {
                                                        value: /^[0-9]{5}(-[0-9]{4})?$/,
                                                        message: 'Invalid ZIP code',
                                                    },
                                                })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 bg-white"
                                                placeholder="10001"
                                            />
                                            {errors.zipCode && (
                                                <p className="text-sm text-red-600 mt-1">{errors.zipCode.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-700 mb-2">
                                                Country <span className="text-red-600">*</span>
                                            </label>
                                            <select
                                                {...register('country', { required: 'Country is required' })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent text-gray-900 bg-white"
                                            >
                                                <option value="">Select Country</option>
                                                <option value="US">United States</option>
                                                <option value="CA">Canada</option>
                                                <option value="UK">United Kingdom</option>
                                            </select>
                                            {errors.country && (
                                                <p className="text-sm text-red-600 mt-1">{errors.country.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep('personal')}
                                            className="flex-1 bg-gray-200 text-gray-700 py-3 md:py-4 rounded-lg hover:bg-gray-300 transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleNextStep}
                                            className="flex-1 bg-teal-600 text-white py-3 md:py-4 rounded-lg hover:bg-teal-700 transition-colors"
                                        >
                                            Continue to Payment
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Payment Information */}
                            {currentStep === 'payment' && (
                                <div className="space-y-4">
                                    <h2 className="text-xl text-gray-900 mb-4">Payment Information</h2>

                                    {/* Payment Method Selection */}
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-3">
                                            Select Payment Method <span className="text-red-600">*</span>
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod('card')}
                                                className={`p-4 rounded-lg border-2 transition-all ${paymentMethod === 'card'
                                                    ? 'border-teal-600 bg-teal-50'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === 'card' ? 'bg-teal-600' : 'bg-gray-200'
                                                        }`}>
                                                        <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-white' : 'text-gray-600'
                                                            }`} />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-gray-900">Card Payment</p>
                                                        <p className="text-xs text-teal-600">Free Shipping</p>
                                                    </div>
                                                </div>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod('cod')}
                                                className={`p-4 rounded-lg border-2 transition-all ${paymentMethod === 'cod'
                                                    ? 'border-teal-600 bg-teal-50'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === 'cod' ? 'bg-teal-600' : 'bg-gray-200'
                                                        }`}>
                                                        <Banknote className={`w-5 h-5 ${paymentMethod === 'cod' ? 'text-white' : 'text-gray-600'
                                                            }`} />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-gray-900">Cash on Delivery</p>
                                                        <p className="text-xs text-orange-600">$5.99 Shipping Fee</p>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Card Payment Details - Only show if card is selected */}
                                    {paymentMethod === 'card' && (
                                        <>
                                            <div>
                                                <label className="block text-sm text-gray-700 mb-2">
                                                    Card Number <span className="text-red-600">*</span>
                                                </label>
                                                <input
                                                    {...register('cardNumber', {
                                                        required: paymentMethod === 'card' ? 'Card number is required' : false,
                                                        pattern: {
                                                            value: /^[0-9]{16}$/,
                                                            message: 'Invalid card number (16 digits)',
                                                        },
                                                    })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent text-gray-900 bg-white"
                                                    placeholder="1234 5678 9012 3456"
                                                    maxLength={16}
                                                />
                                                {errors.cardNumber && (
                                                    <p className="text-sm text-red-600 mt-1">{errors.cardNumber.message}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm text-gray-700 mb-2">
                                                    Cardholder Name <span className="text-red-600">*</span>
                                                </label>
                                                <input
                                                    {...register('cardName', {
                                                        required: paymentMethod === 'card' ? 'Cardholder name is required' : false
                                                    })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent text-gray-900 bg-white"
                                                    placeholder="John Doe"
                                                />
                                                {errors.cardName && (
                                                    <p className="text-sm text-red-600 mt-1">{errors.cardName.message}</p>
                                                )}
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm text-gray-700 mb-2">
                                                        Expiry Date <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        {...register('expiryDate', {
                                                            required: paymentMethod === 'card' ? 'Expiry date is required' : false,
                                                            pattern: {
                                                                value: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
                                                                message: 'Invalid format (MM/YY)',
                                                            },
                                                        })}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent text-gray-900 bg-white"
                                                        placeholder="MM/YY"
                                                        maxLength={5}
                                                    />
                                                    {errors.expiryDate && (
                                                        <p className="text-sm text-red-600 mt-1">{errors.expiryDate.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm text-gray-700 mb-2">
                                                        CVV <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        type="password"
                                                        {...register('cvv', {
                                                            required: paymentMethod === 'card' ? 'CVV is required' : false,
                                                            pattern: {
                                                                value: /^[0-9]{3,4}$/,
                                                                message: 'Invalid CVV (3-4 digits)',
                                                            },
                                                        })}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent text-gray-900 bg-white"
                                                        placeholder="123"
                                                        maxLength={4}
                                                    />
                                                    {errors.cvv && (
                                                        <p className="text-sm text-red-600 mt-1">{errors.cvv.message}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Cash on Delivery Info */}
                                    {paymentMethod === 'cod' && (
                                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                            <div className="flex items-start space-x-3">
                                                <Banknote className="w-5 h-5 text-amber-600 mt-0.5" />
                                                <div>
                                                    <h3 className="text-sm text-amber-900 mb-1">Cash on Delivery</h3>
                                                    <p className="text-sm text-amber-700">
                                                        Please keep exact cash ready for payment. A shipping fee of $5.99 will be added to your order total.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm text-gray-700 mb-2">Order Notes (Optional)</label>
                                        <textarea
                                            {...register('notes')}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent text-gray-900 bg-white"
                                            rows={3}
                                            placeholder="Any special instructions for your order..."
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep('shipping')}
                                            className="flex-1 bg-gray-200 text-gray-700 py-3 md:py-4 rounded-lg hover:bg-gray-300 transition-colors"
                                            disabled={isProcessing}
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 bg-teal-600 text-white py-3 md:py-4 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-400"
                                            disabled={isProcessing}
                                        >
                                            {isProcessing ? 'Processing...' : 'Purchase'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 sticky top-24">
                        <h2 className="text-xl text-gray-900 mb-4">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-3">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div className="flex-grow">
                                        <p className="text-sm text-gray-900">{item.name}</p>
                                        <p className="text-sm text-gray-600 font-bold">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm text-gray-900 font-bold">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 text-sm border-t pt-4">
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
                                <span className="font-bold">
                                    {shipping === 0 ? (
                                        <span className="text-teal-600">FREE</span>
                                    ) : (
                                        `$${shipping.toFixed(2)}`
                                    )}
                                </span>
                            </div>
                            {paymentMethod === 'card' && (
                                <p className="text-xs text-teal-600">
                                    🎉 Free shipping on card payments!
                                </p>
                            )}
                            {paymentMethod === 'cod' && (
                                <p className="text-xs text-orange-600">
                                    Cash on Delivery includes $5.99 shipping fee
                                </p>
                            )}
                            <div className="flex justify-between text-lg pt-2 border-t">
                                <span className="text-gray-900">Total</span>
                                <span className="text-teal-600 font-bold">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}