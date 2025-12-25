import { Shield, Award, Lock, Truck, CreditCard, RefreshCw } from 'lucide-react';

const badges = [
    {
        icon: Shield,
        title: 'Secure Checkout',
        description: '256-bit SSL encryption',
    },
    {
        icon: Award,
        title: 'Certified Products',
        description: 'FDA approved medications',
    },
    {
        icon: Lock,
        title: 'Privacy Protected',
        description: 'HIPAA compliant',
    },
    {
        icon: Truck,
        title: 'Free Shipping',
        description: 'On orders over $50',
    },
    {
        icon: CreditCard,
        title: 'Secure Payment',
        description: 'Multiple payment options',
    },
    {
        icon: RefreshCw,
        title: 'Easy Returns',
        description: '30-day return policy',
    },
];

export function TrustBadges() {
    return (
        <div className="bg-white border-y border-gray-200 py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {badges.map((badge, index) => {
                        const Icon = badge.icon;
                        return (
                            <div key={index} className="text-center">
                                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Icon className="w-6 h-6 text-teal-600" />
                                </div>
                                <h4 className="text-sm text-gray-900 mb-1">{badge.title}</h4>
                                <p className="text-xs text-gray-500">{badge.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}