import { useState, useEffect, useRef } from 'react';
import { Clock3, CreditCard, Award, ParkingCircle, Search as SearchIcon, Sparkles, Check, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Home() {
  const [showSurprise, setShowSurprise] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Scroll-triggered animation logic
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const addSectionRef = (el: HTMLElement | null) => {
    if (el) sectionRefs.current.push(el);
  };

  const plans = [
    {
      id: 'basic',
      name: 'Starter / Weekly',
      price: '₹499/week',
      features: ['Standard parking access', 'Security surveillance', 'Mobile app support']
    },
    {
      id: 'premium',
      name: 'Premium / Monthly',
      price: '₹1499/month',
      features: ['Reserved premium spots', '24/7 customer assistance', 'Advance booking options', 'Exclusive discounts']
    },
    {
      id: 'business',
      name: 'Elite / Annual',
      price: '₹4999/year',
      features: ['Multiple vehicle slots', 'VIP parking zones', 'Corporate fleet management', 'Priority service']
    }
  ];

  const parkingModes = [
    {
      title: "Click",
      description: "Signup and search/select available spaces through our interactive map interface.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80"
    },
    {
      title: "Call",
      description: "24/7 phone support for instant parking reservations and assistance.",
      image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&q=80"
    },
    {
      title: "Come-In",
      description: "On-site digital kiosks for quick check-in and parking validation.",
      image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&q=80"
    }
  ];

  const howItWorks = [
    {
      icon: <SearchIcon className="text-indigo-400 animate-float" size={40} />,
      title: "Find Your Spot",
      description: "Search for available parking spots in your desired location"
    },
    {
      icon: <Clock3 className="text-green-400 animate-float" size={40} />,
      title: "Book & Pay",
      description: "Secure instant reservations with dynamic pricing"
    },
    {
      icon: <CreditCard className="text-pink-400 animate-float" size={40} />,
      title: "Park with Ease",
      description: "QR code access and automated guidance"
    },
    {
      icon: <Award className="text-orange-400 animate-float" size={40} />,
      title: "Earn Rewards",
      description: "Loyalty points redeemable for free parking"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      {/* Navigation Bar */}
      <nav className="bg-gray-900 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <ParkingCircle className="mr-2 text-blue-400" size={24} />
            ParkEase
          </h1>
          <div className="space-x-4">
            <Link to="/search" className="text-white hover:text-blue-400 transition-all duration-300 hover:scale-105">
              Search Parking
            </Link>
            <Link to="/list-your-space" className="text-white hover:text-blue-400 transition-all duration-300 hover:scale-105">
              List Your Space
            </Link>
            <Link to="/team" className="text-white hover:text-blue-400 transition-all duration-300 hover:scale-105">
              Our Team
            </Link>
            <button
              onClick={() => setShowSurprise(true)}
              className="text-white hover:text-blue-400 flex items-center gap-1 transition-all duration-300 hover:scale-105"
            >
              <Sparkles size={16} className="text-yellow-400 animate-sparkle" />
              Surprise
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[400px] mb-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <img
          src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80"
          alt="Parking"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Smart Parking Solutions</h1>
            <p className="text-xl text-gray-200 mb-6">Seamless parking experiences powered by technology</p>
            <Link 
              to="/search"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 hover-glow"
            >
              <SearchIcon size={20} />
              Find Parking Now
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section ref={addSectionRef} className="scroll-fade-in max-w-7xl mx-auto p-6">
        <div className="bg-gray-900 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">How ParkEase Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl text-center relative transform transition-all duration-300 hover:scale-105 hover-glow">
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-gray-600 text-4xl">
                    →
                  </div>
                )}
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modes of Parking Section */}
      <section ref={addSectionRef} className="scroll-fade-in max-w-7xl mx-auto p-6">
        <div className="bg-gray-900 rounded-2xl p-8 mb-8">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">Parking Modes</h2>
          <p className="text-center text-gray-300 mb-8">
            Choose from multiple convenient parking options. All modes require confirmation before leaving.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {parkingModes.map((mode, index) => (
              <div key={index} className="bg-gray-800 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover-glow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={mode.image} 
                    alt={mode.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">{mode.title}</h3>
                  <p className="text-gray-300">{mode.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Collaboration Section */}
      <section ref={addSectionRef} className="scroll-fade-in max-w-7xl mx-auto p-6">
        <div className="bg-gray-900 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Business Partnerships</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover-glow">
              <h3 className="text-xl font-bold text-white mb-4">Why Partner With Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Enhance customer satisfaction with convenient parking solutions</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Generate revenue from unused parking spaces</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Boost brand reputation with innovative technology</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover-glow">
              <h3 className="text-xl font-bold text-white mb-4">Partnership Process</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white">1</span>
                  </div>
                  <p className="text-gray-300">Contact our partnership team to discuss requirements</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white">2</span>
                  </div>
                  <p className="text-gray-300">Integration of your parking infrastructure</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white">3</span>
                  </div>
                  <p className="text-gray-300">Start earning and enhancing customer experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section ref={addSectionRef} className="scroll-fade-in max-w-7xl mx-auto p-6">
        <div className="bg-gray-900 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-gray-800 rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover-glow ${
                  selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-2xl text-blue-400 mb-4">{plan.price}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <Check className="text-green-400 mr-2" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 overflow-hidden transform transition-all duration-300 hover:scale-105 hover-glow">
              <h3 className="text-xl font-bold text-white mb-4">Smart Parking Assistance</h3>
              <p className="text-gray-300 mb-4">
                Real-time availability tracking and guided parking assistance using advanced sensors and AI algorithms.
              </p>
              <img
                src="https://cdn.c-zentrix.com/metatag-images/conversational-chatbot-solution.jpeg"
                alt="Smart Parking"
                className="w-full h-56 object-cover rounded-lg"
              />
            </div>
            <div className="bg-gray-800 rounded-xl p-6 overflow-hidden transform transition-all duration-300 hover:scale-105 hover-glow">
              <h3 className="text-xl font-bold text-white mb-4">Valet Service</h3>
              <p className="text-gray-300 mb-4">
                Professional valet services available at major commercial complexes and event venues.
              </p>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZqqrXb3Jmcn5orOJk-9xCzPxP5QUMDw8DWg&s"
                alt="Valet Service"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Park Smart?</h3>
            <p className="text-gray-300 mb-6">
              Join thousands of satisfied users enjoying stress-free parking
            </p>
            <Link
              to="/search"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 hover-glow"
            >
              <ChevronRight size={20} />
              Start Parking Now
            </Link>
          </div>
        </div>
      </section>

      {/* Surprise Modal */}
      {showSurprise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-2xl max-w-md w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <button
              onClick={() => setShowSurprise(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Special Offer! 🎉</h2>
            <div className="space-y-4 relative z-10">
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-green-400 mb-4">New User Discount</h3>
                <p className="text-gray-300">Get <strong>40% off</strong> your first parking reservation</p>
                <p className="text-sm text-gray-400 mt-2">Use code: PARKEASE40</p>
              </div>
              <button
                onClick={() => setShowSurprise(false)}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Claim Offer
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Home;
