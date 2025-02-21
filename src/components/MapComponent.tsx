import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { ParkingLocation } from '../types/parking';

interface MapComponentProps {
  parkingLocations: ParkingLocation[];
  vehicleType: string;
  searchDate: string;
  searchTime: string;
  searchLocation: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  parkingLocations,
}) => {
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  // Default to first location or RTC Cross Road
  const center = parkingLocations.length > 0 
    ? { lat: parkingLocations[0].lat, lng: parkingLocations[0].lng }
    : { lat: 17.3855, lng: 78.4866 };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        }}
      >
        {parkingLocations.map((location) => (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            title={location.name}
            animation={google.maps.Animation.DROP}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;