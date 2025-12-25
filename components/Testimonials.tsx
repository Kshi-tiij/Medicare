import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Regular Customer',
        rating: 5,
        comment: 'MediCare has been my go-to for all medical supplies. Fast delivery, great prices, and excellent customer service. Highly recommended!',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    {
        name: 'Michael Chen',
        role: 'Healthcare Professional',
        rating: 5,
        comment: 'As a healthcare professional, I trust MediCare for quality products. Their verification process ensures only genuine medications reach customers.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    },
    {
        name: 'Emily Rodriguez',
        role: 'Senior Citizen',
        rating: 5,
        comment: 'The convenience of ordering from home and having medications delivered is invaluable. The customer support team is always helpful and patient.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    },
];

export function Testimonials() {
    return (
        <div className="bg-gradient-to-br from-teal-600 to-emerald-700 py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl text-white mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-lg text-teal-100 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who trust MediCare for their healthcare needs
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors"
                        >
                            <Quote className="w-10 h-10 text-blue-200 mb-4" />

                            <div className="flex mb-3">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>

                            <p className="text-white mb-6 leading-relaxed">
                                "{testimonial.comment}"
                            </p>

                            <div className="flex items-center space-x-3">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-white">{testimonial.name}</p>
                                    <p className="text-sm text-blue-200">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}