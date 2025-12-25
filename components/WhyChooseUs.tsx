import { Shield, Award, Headphones, Zap, Clock, BadgeCheck } from 'lucide-react';

const features = [
    {
        icon: Shield,
        title: 'FDA Approved',
        description: 'All our products meet strict FDA standards and regulations for your safety',
    },
    {
        icon: Award,
        title: 'Quality Guaranteed',
        description: 'Premium quality products from trusted manufacturers worldwide',
    },
    {
        icon: Headphones,
        title: '24/7 Support',
        description: 'Expert customer service available around the clock to assist you',
    },
    {
        icon: Zap,
        title: 'Fast Shipping',
        description: 'Quick delivery with real-time tracking on all orders',
    },
    {
        icon: Clock,
        title: 'Easy Returns',
        description: '30-day hassle-free return policy for your peace of mind',
    },
    {
        icon: BadgeCheck,
        title: 'Verified Products',
        description: 'Each product is verified and authenticated before shipping',
    },
];

export function WhyChooseUs() {
    return (
        <div className="bg-white py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
                        Why Choose MediCare?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Your health and satisfaction are our top priorities. Here's what makes us different.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-xl hover:shadow-lg transition-shadow border border-teal-100"
                            >
                                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}