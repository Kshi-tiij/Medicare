import { Pill, Stethoscope, Phone, Calendar } from 'lucide-react';

const services = [
    {
        icon: Pill,
        title: 'Prescription Refills',
        description: 'Easy prescription refill service with automatic reminders',
        features: ['Auto-refill available', 'Reminder notifications', 'Easy tracking'],
    },
    {
        icon: Stethoscope,
        title: 'Health Consultations',
        description: 'Connect with licensed pharmacists for medication guidance',
        features: ['Professional advice', 'Video consultations', 'Follow-up support'],
    },
    {
        icon: Phone,
        title: 'Telehealth Services',
        description: 'Virtual healthcare consultations from home',
        features: ['Licensed doctors', 'Convenient scheduling', 'E-prescriptions'],
    },
    {
        icon: Calendar,
        title: 'Medication Management',
        description: 'Track and manage all your medications in one place',
        features: ['Dosage reminders', 'Interaction alerts', 'Refill tracking'],
    },
];

export function Services() {
    return (
        <div className="bg-gray-50 py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
                        Our Services
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Comprehensive healthcare solutions designed for your convenience
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                                    <Icon className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="text-gray-900 mb-2">{service.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{service.description}</p>

                                <ul className="space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                                            <span className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}