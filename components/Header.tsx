import { ShoppingCart, Heart, Search, Menu, X, User, Package } from 'lucide-react';
import { useState } from 'react';
import { TrackOrderModal } from './TrackOrderModal';

import { User as UserType } from '../context/AuthContext';

interface HeaderProps {
    cartItemCount: number;
    onCartClick: () => void;
    onLogoClick: () => void;
    onSearch: (query: string) => void;
    user: UserType | null;
    onLoginClick: () => void;
    onLogoutClick: () => void;
}

export function Header({ cartItemCount, onCartClick, onLogoClick, onSearch, user, onLoginClick, onLogoutClick }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsMenuOpen(false);
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    const toggleSearch = () => {
        if (isSearchOpen) {
            setIsSearchOpen(false);
            setSearchQuery('');
            onSearch('');
        } else {
            setIsSearchOpen(true);
        }
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <button
                        onClick={onLogoClick}
                        className={`flex items-center space-x-2 hover:opacity-80 transition-opacity ${isSearchOpen ? 'hidden md:flex' : 'flex'}`}
                    >
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                            <Heart className="w-5 h-5 md:w-6 md:h-6 text-white" fill="white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg md:text-xl font-bold text-teal-600">MediCare</span>
                            <span className="text-xs text-teal-600 -mt-1">Your Health Partner</span>
                        </div>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8 transition-opacity">
                        <button
                            onClick={() => scrollToSection('products')}
                            className="text-gray-700 hover:text-teal-600 transition-colors"
                        >
                            Products
                        </button>

                        <button
                            onClick={() => scrollToSection('about')}
                            className="text-gray-700 hover:text-teal-600 transition-colors"
                        >
                            About Us
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="text-gray-700 hover:text-teal-600 transition-colors"
                        >
                            Contact
                        </button>
                    </nav>



                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-3 md:space-x-4">
                        <button
                            onClick={() => setIsTrackOrderOpen(true)}
                            className="hidden md:flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors mr-2"
                        >
                            <Package className="w-4 h-4" />
                            <span>Track Order</span>
                        </button>

                        <button
                            onClick={() => setIsTrackOrderOpen(true)}
                            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <Package className="w-5 h-5 text-gray-600" />
                        </button>

                        {user ? (
                            <div className="flex items-center space-x-2 group relative">
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block">
                                    <User className="w-5 h-5 text-teal-600" />
                                </button>
                                <span className="text-sm font-medium text-gray-700 hidden md:block">
                                    {user.name.split(' ')[0]}
                                </span>
                                <button
                                    onClick={onLogoutClick}
                                    className="md:absolute md:top-full md:left-0 md:bg-white md:shadow-lg md:rounded-lg md:py-2 md:px-4 md:w-32 md:hidden md:group-hover:block text-sm text-red-600 hover:bg-red-50 text-left whitespace-nowrap"
                                >
                                    Sign Out
                                </button>
                                {/* Mobile Logout Button (simplified for now) */}
                                <button
                                    onClick={onLogoutClick}
                                    className="p-2 hover:bg-red-50 rounded-full transition-colors md:hidden"
                                    title="Sign Out"
                                >
                                    <User className="w-5 h-5 text-red-600" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={onLoginClick}
                                className="hidden md:flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
                            >
                                <User className="w-4 h-4" />
                                <span>Sign In</span>
                            </button>
                        )}
                        {/* Mobile Login Icon (only if not logged in) */}
                        {!user && (
                            <button
                                onClick={onLoginClick}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden"
                            >
                                <User className="w-5 h-5 text-gray-600" />
                            </button>
                        )}

                        {/* Search Input - Relocated to appear from origin */}
                        <div className={`transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-48 md:w-64 opacity-100 mx-2' : 'w-0 opacity-0 overflow-hidden'}`}>
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        onSearch(e.target.value);
                                    }}
                                    className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 whitespace-nowrap"
                                    autoFocus={isSearchOpen}
                                />
                                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            </form>
                        </div>

                        <button
                            onClick={toggleSearch}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            {isSearchOpen ? (
                                <X className="w-5 h-5 text-gray-600" />
                            ) : (
                                <Search className="w-5 h-5 text-gray-600" />
                            )}
                        </button>

                        <button
                            onClick={onCartClick}
                            className={`p-2 hover:bg-gray-100 rounded-full transition-colors relative ${isSearchOpen ? 'hidden md:block' : 'block'}`}
                        >
                            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden ${isSearchOpen ? 'hidden' : 'block'}`}
                        >
                            <Menu className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && !isSearchOpen && (
                    <nav className="md:hidden py-4 border-t border-gray-200">
                        <button
                            onClick={() => scrollToSection('products')}
                            className="block w-full text-left py-2 text-gray-700 hover:text-teal-600 transition-colors"
                        >
                            Products
                        </button>

                        <button
                            onClick={() => scrollToSection('about')}
                            className="block w-full text-left py-2 text-gray-700 hover:text-teal-600 transition-colors"
                        >
                            About Us
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="block w-full text-left py-2 text-gray-700 hover:text-teal-600 transition-colors"
                        >
                            Contact
                        </button>
                    </nav>
                )}
            </div>

            <TrackOrderModal
                isOpen={isTrackOrderOpen}
                onClose={() => setIsTrackOrderOpen(false)}
            />
        </header>
    );
}