import { TrendingUp, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../App';
import { ProductCard } from './ProductCard';
import { useRef } from 'react';

interface FeaturedProductsProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
    onProductClick: (product: Product, layoutId: string) => void;
}

export function FeaturedProducts({ products, onAddToCart, onProductClick }: FeaturedProductsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = 350; // Width of card + gap
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <TrendingUp className="w-6 h-6 text-teal-600" />
                            <h2 className="text-2xl md:text-3xl text-gray-900">Best Sellers</h2>
                        </div>
                        <p className="text-gray-600">Our most popular products trusted by thousands</p>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => scroll('left')}
                            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 text-gray-700 transition-colors"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 text-gray-700 transition-colors"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 scrollbar-hide snap-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.slice(0, 7).map((product) => (
                        <div key={product.id} className="flex-none w-[280px] md:w-[320px] snap-center h-full">
                            <ProductCard
                                product={product}
                                onAddToCart={onAddToCart}
                                onClick={(p) => onProductClick(p, `featured-${p.id}`)}
                                layoutPrefix="featured"
                                badge={
                                    <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm flex items-center space-x-1 shadow-sm">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="font-medium">Best Seller</span>
                                    </div>
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}