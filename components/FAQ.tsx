import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'How do I place an order as a guest?',
        answer: 'Simply browse our products, add items to your cart, and proceed to checkout. You\'ll need to provide your personal information, shipping address, and payment details to complete your order - no account required!',
    },
    {
        question: 'Do you require a prescription for all medications?',
        answer: 'Some products require a valid prescription from a licensed healthcare provider. These items are clearly marked with "Rx Required" badge. Over-the-counter medications and supplements can be purchased without a prescription.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), debit cards, and secure online payment methods. All transactions are encrypted and secure.',
    },
    {
        question: 'How long does shipping take?',
        answer: 'Standard shipping takes 3-5 business days. Express shipping options are available at checkout for faster delivery. You\'ll receive a tracking number via email once your order ships.',
    },
    {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for unopened products in their original packaging. For safety reasons, we cannot accept returns on opened medications. Contact our customer service for assistance with returns.',
    },
    {
        question: 'Are my personal and payment details secure?',
        answer: 'Absolutely. We use industry-standard SSL encryption to protect your personal and payment information. We never store complete credit card numbers and comply with all HIPAA regulations.',
    },
    {
        question: 'Can I track my order?',
        answer: 'Yes! Once your order ships, you\'ll receive an email with a tracking number. You can use this to monitor your package\'s journey to your doorstep.',
    },
    {
        question: 'Do you offer customer support?',
        answer: 'Yes, our customer support team is available 24/7 via phone, email, or live chat to assist you with any questions or concerns about your order or our products.',
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="bg-white py-12 md:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600">
                        Find answers to common questions about ordering and our services
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-gray-100 transition-colors"
                            >
                                <span className="text-gray-900 pr-4">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-teal-600 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {openIndex === index && (
                                <div className="px-5 md:px-6 pb-5 md:pb-6">
                                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}