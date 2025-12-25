import { useState } from 'react';
import { toast } from 'sonner';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid, products } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { CheckoutForm } from './components/CheckoutForm';
import { OrderConfirmation } from './components/OrderConfirmation';
import { FeaturedProducts } from './components/FeaturedProducts';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Newsletter } from './components/Newsletter';
import { TrustBadges } from './components/TrustBadges';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { AuthModal } from './components/AuthModal';
import { useAuth } from './context/AuthContext';

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
    prescription: boolean;
    inStock: boolean;
}

export interface CartItem extends Product {
    quantity: number;
}

export default function App() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [currentView, setCurrentView] = useState<'shop' | 'checkout' | 'confirmation'>('shop');
    const [orderNumber, setOrderNumber] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProductData, setSelectedProductData] = useState<{ product: Product; layoutId: string } | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const { user, logout } = useAuth();

    const addToCart = (product: Product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
            return [...prevItems, { ...product, quantity: 1 }];
        });
        toast.success(`Added ${product.name} to cart`);
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity === 0) {
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
        } else {
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        }
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    const handleCheckout = () => {
        setCurrentView('checkout');
        setIsCartOpen(false);
    };

    const handleOrderComplete = (orderNum: string) => {
        setOrderNumber(orderNum);
        setCurrentView('confirmation');
        setCartItems([]);
    };

    const handleContinueShopping = () => {
        setCurrentView('shop');
        setOrderNumber('');
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleProductClick = (product: Product, layoutId: string) => {
        setSelectedProductData({ product, layoutId });
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                cartItemCount={totalItems}
                onCartClick={() => setIsCartOpen(true)}
                onLogoClick={() => setCurrentView('shop')}
                onSearch={handleSearch}
                user={user}
                onLoginClick={() => setIsAuthModalOpen(true)}
                onLogoutClick={() => {
                    logout();
                    toast.success('Logged out successfully');
                }}
            />

            {currentView === 'shop' && (
                <>
                    {!searchQuery && (
                        <>
                            <Hero />
                            <TrustBadges />
                            <div id="featured">
                                <FeaturedProducts
                                    products={products}
                                    onAddToCart={addToCart}
                                    onProductClick={handleProductClick}
                                />
                            </div>
                        </>
                    )}
                    <div id="products">
                        <ProductGrid
                            onAddToCart={addToCart}
                            searchQuery={searchQuery}
                            onProductClick={handleProductClick}
                        />
                    </div>
                    {!searchQuery && (
                        <>
                            <div id="about">
                                <WhyChooseUs />
                            </div>
                            <div id="services">
                                <Services />
                            </div>
                            <Testimonials />
                            <FAQ />
                            <Newsletter />
                        </>
                    )}
                </>
            )}

            {currentView === 'checkout' && (
                <CheckoutForm
                    cartItems={cartItems}
                    onOrderComplete={handleOrderComplete}
                    onBack={() => setCurrentView('shop')}
                    user={user}
                />
            )}

            {currentView === 'confirmation' && (
                <OrderConfirmation
                    orderNumber={orderNumber}
                    onContinueShopping={handleContinueShopping}
                />
            )}

            <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                onCheckout={handleCheckout}
            />

            <AnimatePresence>
                {selectedProductData && (
                    <ProductModal
                        product={selectedProductData.product}
                        layoutId={selectedProductData.layoutId}
                        onClose={() => setSelectedProductData(null)}
                        onAddToCart={addToCart}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isAuthModalOpen && (
                    <AuthModal
                        isOpen={isAuthModalOpen}
                        onClose={() => setIsAuthModalOpen(false)}
                    />
                )}
            </AnimatePresence>

            {currentView === 'shop' && (
                <div id="contact">
                    <Footer />
                </div>
            )}
        </div>
    );
}