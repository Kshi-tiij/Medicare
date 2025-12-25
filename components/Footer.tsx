import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                                <Heart className="w-6 h-6 text-white" fill="white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl text-teal-400 font-bold">MediCare</span>
                                <span className="text-xs text-teal-400">Your Health Partner</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">
                            Your trusted source for quality healthcare products and medications. Committed to your health and well-being.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Products</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Services</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Health Blog</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Track Order</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Shipping Info</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Returns & Refunds</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start space-x-3">
                                <Phone className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-white">+1 (800) 123-4567</p>
                                    <p className="text-gray-400 text-xs">24/7 Support Available</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Mail className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-white">support@medicare.com</p>
                                    <p className="text-gray-400 text-xs">We'll reply within 24hrs</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-white">123 Healthcare Avenue</p>
                                    <p className="text-gray-400 text-xs">New York, NY 10001</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                        <div className="bg-gray-800 px-4 py-2 rounded-lg text-xs text-gray-400">
                            <span className="text-white">🛡️</span> FDA Approved
                        </div>
                        <div className="bg-gray-800 px-4 py-2 rounded-lg text-xs text-gray-400">
                            <span className="text-white">✓</span> HIPAA Compliant
                        </div>
                        <div className="bg-gray-800 px-4 py-2 rounded-lg text-xs text-gray-400">
                            <span className="text-white">🔒</span> SSL Secured
                        </div>
                        <div className="bg-gray-800 px-4 py-2 rounded-lg text-xs text-gray-400">
                            <span className="text-white">⭐</span> BBB Accredited
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 gap-4">
                        <p>© 2024 MediCare. All rights reserved.</p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
                            <span>•</span>
                            <a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a>
                            <span>•</span>
                            <a href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}