import { useState } from 'react';
import { Product } from '../App';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
    onAddToCart: (product: Product) => void;
    searchQuery?: string;
    onProductClick: (product: Product, layoutId: string) => void;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Pain Relief Tablets',
        category: 'Pain Management',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1631669969504-f35518bf96ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzJTIwYm90dGxlc3xlbnwxfHx8fDE3NjY1NDg4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Fast-acting pain relief for headaches, muscle aches, and minor pains',
        prescription: false,
        inStock: true,
    },
    {
        id: '2',
        name: 'Multivitamin Complex',
        category: 'Vitamins & Supplements',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1683394541762-f96c0d03dc38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWlucyUyMHN1cHBsZW1lbnRzfGVufDF8fHx8MTc2NjQ2Njk3OHww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Complete daily vitamin and mineral supplement for overall health',
        prescription: false,
        inStock: true,
    },
    {
        id: '3',
        name: 'Antiseptic Solution',
        category: 'First Aid',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1080',
        description: 'Medical-grade antiseptic for wound cleaning and infection prevention',
        prescription: false,
        inStock: false,
    },
    {
        id: '4',
        name: 'Digital Thermometer',
        category: 'Medical Devices',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1615486511473-4e83867c9516?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVybW90ZXRlciUyMG1lZGljYWwlMjBkZXZpY2V8ZW58MXx8fHwxNzY2NDM3MDI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Fast and accurate temperature measurement for all ages',
        prescription: false,
        inStock: true,
    },
    {
        id: '5',
        name: 'First Aid Kit',
        category: 'First Aid',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1624638760852-8ede1666ab07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGtpdHxlbnwxfHx8fDE3NjY0OTQ5Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Complete emergency first aid kit with essential medical supplies',
        prescription: false,
        inStock: true,
    },
    {
        id: '6',
        name: 'Blood Pressure Monitor',
        category: 'Medical Devices',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1649877510851-10effb9a59b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMHByZXNzdXJlJTIwbW9uaXRvcnxlbnwxfHx8fDE3NjY1NDg4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Automatic digital blood pressure monitor with memory function',
        prescription: false,
        inStock: true,
    },
    {
        id: '7',
        name: 'Allergy Relief Tablets',
        category: 'Allergy & Sinus',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1631669969504-f35518bf96ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzJTIwYm90dGxlc3xlbnwxfHx8fDE3NjY1NDg4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Non-drowsy allergy relief for seasonal and year-round allergies',
        prescription: false,
        inStock: true,
    },
    {
        id: '8',
        name: 'Vitamin D3 Supplement',
        category: 'Vitamins & Supplements',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1683394541762-f96c0d03dc38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWlucyUyMHN1cHBsZW1lbnRzfGVufDF8fHx8MTc2NjQ2Njk3OHww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'High-potency Vitamin D3 for bone health and immune support',
        prescription: false,
        inStock: true,
    },
    {
        id: '9',
        name: 'Immune Booster Plus',
        category: 'Vitamins & Supplements',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1683394541762-f96c0d03dc38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWlucyUyMHN1cHBsZW1lbnRzfGVufDF8fHx8MTc2NjQ2Njk3OHww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Advanced formula with Vitamin C, Zinc, and Elderberry',
        prescription: false,
        inStock: true,
    },
    {
        id: '10',
        name: 'Premium Omega-3',
        category: 'Vitamins & Supplements',
        price: 34.99,
        image: 'https://www.trufit.eu/media/adjconfigurable/1100/copyright-www.trufit.eu-1100-graspberg-premium-omega-1200-90caps-image-1.png',
        description: 'High-potency fish oil for heart and brain health',
        prescription: false,
        inStock: true,
    },

    {
        id: '11',
        name: 'Joint Support Formula',
        category: 'Vitamins & Supplements',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1631669969504-f35518bf96ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzJTIwYm90dGxlc3xlbnwxfHx8fDE3NjY1NDg4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Glucosamine and Chondroitin for joint mobility',
        prescription: false,
        inStock: true,
    },
    {
        id: '12',
        name: 'Probiotic Complex',
        category: 'Digestive Health',
        price: 28.50,
        image: 'https://images.unsplash.com/photo-1701201632697-7ec41bfee65f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UHJvYmlvdGljJTIwQ29tcGxleHxlbnwwfHwwfHx8MA%3D%3D',
        description: 'Daily probiotic for digestive balance and gut health',
        prescription: false,
        inStock: true,
    },
    {
        id: '13',
        name: 'Sleep Aid Melatonin',
        category: 'Sleep Support',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfGFsbHx8fHx8fHx8fDE3NjY1OTUxNTB8&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Natural sleep support with 5mg Melatonin',
        prescription: false,
        inStock: true,
    },
    {
        id: '14',
        name: 'Herbal Stress Relief',
        category: 'Mental Wellness',
        price: 22.00,
        image: 'https://images.unsplash.com/photo-1541552397352-768f216c75ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SGVyYmFsJTIwU3RyZXNzJTIwUmVsaWVmfGVufDB8fDB8fHww',
        description: 'Calming blend of Ashwagandha and Lemon Balm',
        prescription: false,
        inStock: true,
    },

    {
        id: '15',
        name: 'Collagen Peptides',
        category: 'Beauty & Skin',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=1080',
        description: 'Hydrolyzed collagen for hair, skin, and nails',
        prescription: false,
        inStock: false,
    },
    {
        id: '16',
        name: 'Electrolyte Powder',
        category: 'Hydration',
        price: 24.99,
        image: 'https://plus.unsplash.com/premium_photo-1731750008314-6abb0a107e69?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RWxlY3Ryb2x5dGUlMjBQb3dkZXJ8ZW58MHx8MHx8fDA%3D',
        description: 'Rapid hydration powder pack, lemon-lime flavor',
        prescription: false,
        inStock: true,
    },
    {
        id: '17',
        name: 'Digital Blood Pressure Monitor',
        category: 'Medical Devices',
        price: 59.99,
        image: 'https://plus.unsplash.com/premium_photo-1664444190391-f14d3f640a15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RGlnaXRhbCUyMEJsb29kJTIwUHJlc3N1cmUlMjBNb25pdG9yfGVufDB8fDB8fHww',
        description: 'Automatic arm monitor for accurate readings',
        prescription: false,
        inStock: true,
    },

    {
        id: '18',
        name: 'Vitamin C Gummies',
        category: 'Vitamins & Supplements',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80&w=1080',
        description: 'Delicious orange flavored immunity support',
        prescription: false,
        inStock: true,
    },
    {
        id: '19',
        name: 'Calcium + Magnesium',
        category: 'Vitamins & Supplements',
        price: 14.50,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1080',
        description: 'Essential minerals for strong bones',
        prescription: false,
        inStock: true,
    },
    {
        id: '20',
        name: 'First Aid Kit Professional',
        category: 'First Aid',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=1080',
        description: 'Comprehensive kit for workplace or home',
        prescription: false,
        inStock: true,
    },
    {
        id: '21',
        name: 'Protein Powder Whey',
        category: 'Fitness',
        price: 55.00,
        image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=1080',
        description: 'Chocolate flavor isolate for muscle recovery',
        prescription: false,
        inStock: true,
    },
    {
        id: '22',
        name: 'Thermometer Infrared',
        category: 'Medical Devices',
        price: 35.00,
        image: 'https://images.unsplash.com/photo-1680798709568-66fb4b1df656?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGhlcm1vbWV0ZXIlMjBJbmZyYXJlZHxlbnwwfHwwfHx8MA%3D%3D',
        description: 'Non-contact forehead thermometer',
        prescription: false,
        inStock: false,
    },

    {
        id: '23',
        name: 'Hand Sanitizer Gel',
        category: 'Hygiene',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=1080',
        description: '70% alcohol moisturizing gel',
        prescription: false,
        inStock: true,
    },
    {
        id: '24',
        name: 'Face Masks N95',
        category: 'Protection',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1586942593568-29361efcd571?auto=format&fit=crop&q=80&w=1080',
        description: 'Pack of 20 protective face masks',
        prescription: false,
        inStock: true,
    },
    {
        id: '25',
        name: 'Pulse Oximeter',
        category: 'Medical Devices',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1649877510851-10effb9a59b4?auto=format&fit=crop&q=80&w=1080',
        description: 'Fingertip oxygen saturation monitor',
        prescription: false,
        inStock: true,
    },
    {
        id: '26',
        name: 'Glucose Monitor Kit',
        category: 'Medical Devices',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1631669969504-f35518bf96ba?auto=format&fit=crop&q=80&w=1080',
        description: 'Blood sugar testing kit with strips',
        prescription: false,
        inStock: true,
    },
    {
        id: '27',
        name: 'Compression Socks',
        category: 'Medical Devices',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1624638760852-8ede1666ab07?auto=format&fit=crop&q=80&w=1080',
        description: 'Graduated compression for circulation',
        prescription: false,
        inStock: true,
    },
    {
        id: '28',
        name: 'Heating Pad Electric',
        category: 'Pain Management',
        price: 32.99,
        image: 'https://plus.unsplash.com/premium_photo-1683121760714-70003fc404b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SGVhdGluZyUyMFBhZCUyMEVsZWN0cmljfGVufDB8fDB8fHww',
        description: 'Extra large pad for back pain relief',
        prescription: false,
        inStock: true,
    },
    {
        id: '29',
        name: 'Massage Gun',
        category: 'Pain Management',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1611908200005-b898ddde09cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFzc2FnZSUyMEd1bnxlbnwwfHwwfHx8MA%3D%3D',
        description: 'Percussive therapy for deep tissue',
        prescription: false,
        inStock: true,
    },
    {
        id: '30',
        name: 'Essential Oil Diffuser',
        category: 'Allergy & Sinus',
        price: 29.99,
        image: 'https://plus.unsplash.com/premium_photo-1690116977873-db6296c22d33?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RXNzZW50aWFsJTIwT2lsJTIwRGlmZnVzZXJ8ZW58MHx8MHx8fDA%3D',
        description: 'Ultrasonic aromatherapy diffuser',
        prescription: false,
        inStock: true,
    },

    {
        id: '31',
        name: 'Resistance Bands Set',
        category: 'Fitness',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&q=80&w=1080',
        description: 'Set of 5 resistance bands for home workouts',
        prescription: false,
        inStock: true,
    },
    {
        id: '32',
        name: 'Yoga Mat Premium',
        category: 'Fitness',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1761971975962-9cc397e2ba2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8WW9nYSUyME1hdCUyMFByZW1pdW18ZW58MHx8MHx8fDA%3D',
        description: 'Non-slip eco-friendly yoga mat',
        prescription: false,
        inStock: true,
    },

    {
        id: '33',
        name: 'Water Flosser',
        category: 'Hygiene',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1609188076864-c35269136b09?auto=format&fit=crop&q=80&w=1080',
        description: 'Cordless rechargeable water flosser',
        prescription: false,
        inStock: true,
    },
    {
        id: '34',
        name: 'Electric Toothbrush',
        category: 'Hygiene',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1641130331708-dd0cc94ae8e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RWxlY3RyaWMlMjBUb290aGJydXNofGVufDB8fDB8fHww',
        description: 'Sonic technology for superior plaque removal',
        prescription: false,
        inStock: true,
    },

    {
        id: '35',
        name: 'UV Sanitizer Wand',
        category: 'Protection',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&q=80&w=1080',
        description: 'Portable UV-C light sanitizer',
        prescription: false,
        inStock: true,
    },
    {
        id: '36',
        name: 'Sleep Mask Silk',
        category: 'Sleep Support',
        price: 12.99,
        image: 'https://media.istockphoto.com/id/1312579775/photo/gray-eye-fold-for-beauty-sleep-isolated-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=TSsWN0sT7zkNyggfJ21A0olVWUzQ969qQzdKfhv5cOY=',
        description: '100% pure silk blackout eye mask',
        prescription: false,
        inStock: true,
    },
    {
        id: '37',
        name: 'Back Support Belt',
        category: 'Pain Management',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1585501955565-0c058863198e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFjayUyMGluanVyeSUyMFN1cHBvcnQlMjBCZWx0fGVufDB8fDB8fHww',
        description: 'Adjustable lumbar support brace',
        prescription: false,
        inStock: true,
    },

    {
        id: '38',
        name: 'TENS Unit Simulator',
        category: 'Pain Management',
        price: 45.99,
        image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=1080',
        description: 'Electronic pulse massager for pain relief',
        prescription: false,
        inStock: true,
    }
];

const categories = [
    'All Products',
    'Pain Management',
    'Vitamins & Supplements',
    'First Aid',
    'Medical Devices',
    'Allergy & Sinus',
    'Digestive Health',
    'Sleep Support',
    'Mental Wellness',
    'Beauty & Skin',
    'Hydration',
    'Fitness',
    'Hygiene',
    'Protection'
];

export function ProductGrid({ onAddToCart, searchQuery = '', onProductClick }: ProductGridProps) {
    const [selectedCategory, setSelectedCategory] = useState('All Products');

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Split products for hybrid layout
    const initialGridProducts = filteredProducts.slice(0, 12);
    const scrollableProducts = filteredProducts.slice(12);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {/* Category Filter */}
            <div className="mb-8">
                <h2 className="text-2xl md:text-3xl text-gray-900 mb-4 md:mb-6">
                    Browse Products
                </h2>
                <div className="flex flex-wrap gap-2 md:gap-3">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 py-2 md:px-4 md:py-2 rounded-full text-sm md:text-base transition-colors ${selectedCategory === category
                                ? 'bg-teal-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Product Grid (First 12 items) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-12">
                {initialGridProducts.length > 0 ? (
                    initialGridProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={onAddToCart}
                            onClick={(p) => onProductClick(p, `grid-${p.id}`)}
                            layoutPrefix="grid"
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No products found matching your search.
                    </div>
                )}
            </div>

            {/* Horizontal Scroll for Remaining Items */}
            {scrollableProducts.length > 0 && (
                <div className="border-t pt-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">More to Explore</h3>
                    </div>
                    <div className="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {scrollableProducts.map((product) => (
                            <div key={product.id} className="flex-none w-[280px] md:w-[320px] snap-center h-full">
                                <ProductCard
                                    product={product}
                                    onAddToCart={onAddToCart}
                                    onClick={(p) => onProductClick(p, `grid-scroll-${p.id}`)}
                                    layoutPrefix="grid-scroll"
                                />
                            </div>
                        ))}
                    </div>
                    {/* Hide scrollbar for Chrome/Safari/Opera */}
                    <style>{`
                        .flex.overflow-x-auto::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
}