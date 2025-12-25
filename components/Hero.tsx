import { Shield, Truck, Clock } from 'lucide-react';

export function Hero() {
    return (
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4">
                            Quality Healthcare Products Delivered
                        </h1>
                        <p className="text-lg sm:text-xl text-teal-100 mb-8">
                            Shop with confidence. Get your medicinal products delivered safely to your doorstep.
                        </p>
                        <button className="bg-white text-teal-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-teal-50 transition-colors">
                            Shop Now
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
                            <Shield className="w-8 h-8 md:w-10 md:h-10 mb-3" />
                            <h3 className="mb-2">Verified Products</h3>
                            <p className="text-teal-100 text-sm">
                                All products are FDA approved and quality tested
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
                            <Truck className="w-8 h-8 md:w-10 md:h-10 mb-3" />
                            <h3 className="mb-2">Fast Delivery</h3>
                            <p className="text-teal-100 text-sm">
                                Quick and secure delivery to your location
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
                            <Clock className="w-8 h-8 md:w-10 md:h-10 mb-3" />
                            <h3 className="mb-2">24/7 Support</h3>
                            <p className="text-teal-100 text-sm">
                                Customer service available round the clock
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}