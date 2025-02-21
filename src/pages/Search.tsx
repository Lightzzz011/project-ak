import { useState } from 'react';
import { MapPin, Search as SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import MapComponent from '../components/MapComponent';
import { ParkingLocation } from '../types/parking';

function Search() {
  const [location, setLocation] = useState('');
  const [date] = useState('');
  const [time] = useState('');
  const [vehicleType] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [parkingLocations, setParkingLocations] = useState<ParkingLocation[]>([]);
  const [serviceMessage, setServiceMessage] = useState('');

  // Predefined locations
  const predefinedLocations = [
    { id: 1, name: 'Nampally', lat: 17.3841, lng: 78.4734 },
    { id: 2, name: 'Uppal', lat: 17.405, lng: 78.5589 },
    { id: 3, name: 'Charminar', lat: 17.3616, lng: 78.4747 },
    { id: 4, name: 'RTC Cross Road', lat: 17.3855, lng: 78.4866 },
  ];

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowResults(true);

    // Find the selected location from predefinedLocations
    const selectedLocation = predefinedLocations.find(
      (loc) => loc.name.toLowerCase() === location.toLowerCase()
    );

    if (selectedLocation) {
      // Create a mock parking location for the selected place
      const mockLocation: ParkingLocation = {
        id: selectedLocation.id,
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        name: `${selectedLocation.name} Parking`,
        availableSlots: 4,
        address: `${selectedLocation.name}, Hyderabad`,
        pricePerHour: 5.5,
      };

      // Update parkingLocations with the selected location
      setParkingLocations([mockLocation]);
      setServiceMessage('');
    } else if (location) {
      // If no location is selected, show a message
      setParkingLocations([]);
      setServiceMessage(`Service will be available soon in ${location}!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      {/* Back to Home Button */}
      <div className="absolute top-4 right-4 z-50">
        <Link
          to="/home"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-[400px] mb-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <img
          src="https://e0.pxfuel.com/wallpapers/479/965/desktop-wallpaper-cars-bmw-330i-m-sport.jpg"
          alt="Parking"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Find Your Perfect Spot</h1>
            <p className="text-xl text-gray-200">Secure, heated parking spots available 24/7</p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-gray-900 rounded-2xl p-8 mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Location Input with Dropdown */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-gray-800 text-white px-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter location"
                list="location-list"
              />
              <datalist id="location-list">
                {predefinedLocations.map((loc) => (
                  <option key={loc.id} value={loc.name} />
                ))}
              </datalist>
            </div>

            {/* Other form inputs remain the same */}
            {/* ... */}

          </div>

          <button
            onClick={handleSearch}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <SearchIcon size={20} />
            Search Parking
          </button>
        </div>

        {/* Search Results */}
        {showResults && (
          <div className="bg-gray-900 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {serviceMessage || `Available Parking in ${location}`}
            </h2>
            {!serviceMessage && (
              <div className="h-[500px] rounded-xl overflow-hidden">
                <MapComponent
                  parkingLocations={parkingLocations}
                  vehicleType={vehicleType}
                  searchDate={date}
                  searchTime={time}
                  searchLocation={location}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Search;