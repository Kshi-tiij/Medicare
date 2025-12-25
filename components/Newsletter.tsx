import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export function Newsletter() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setTimeout(() => {
                setEmail('');
                setIsSubscribed(false);
            }, 3000);
        }
    };

    return (
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-2xl md:text-3xl text-white mb-3">
                            Stay Updated with Health Tips & Offers
                        </h2>
                        <p className="text-teal-100">
                            Subscribe to our newsletter for exclusive discounts, health tips, and product updates
                        </p>
                    </div>

                    <div>
                        {isSubscribed ? (
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 flex items-center justify-center space-x-3">
                                <CheckCircle className="w-6 h-6 text-white" />
                                <p className="text-white">Thank you for subscribing!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-grow relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="w-full pl-12 pr-4 py-3 md:py-4 rounded-lg focus:ring-2 focus:ring-white focus:outline-none text-gray-900"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-white text-teal-600 px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-teal-50 transition-colors whitespace-nowrap"
                                >
                                    Subscribe Now
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}