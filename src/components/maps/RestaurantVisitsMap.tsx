import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Typography, Rating, Chip, useTheme, Paper, alpha } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import GoogleIcon from '@mui/icons-material/Google';
import { getRestaurants } from '../../data/dataService';
import { Restaurant } from '../../data/types';

// Define Atlanta's coordinates
const ATLANTA_COORDS = { lat: 33.749, lng: -84.388 };

// Custom marker icon
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
};

const RestaurantVisitsMap = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  useEffect(() => {
    setRestaurants(getRestaurants());
  }, []);

  // Calculate rating colors
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return theme.palette.secondary.main; 
    if (rating >= 4.0) return theme.palette.primary.main;
    return theme.palette.primary.light;
  };

  // Function to filter restaurants by city when a city is selected
  const filteredRestaurants = activeCity 
    ? restaurants.filter(r => r.location.city === activeCity)
    : restaurants;

  // Function to calculate map center based on active city or default (or first restaurant)
  const getMapCenter = (): [number, number] => {
    if (activeCity === 'Nashville') {
      return [36.1627, -86.7816];
    }
    if (restaurants.length > 0 && !activeCity) {
        return [restaurants[0].location.lat, restaurants[0].location.lng];
    }
    // Default to Atlanta or a general view if no restaurants or city selected
    return [ATLANTA_COORDS.lat, ATLANTA_COORDS.lng]; 
  };

  // Function to calculate zoom level
  const getZoomLevel = () => {
    if (activeCity || (restaurants.length === 1 && !activeCity)) return 13;
    return 5; // Default zoom for multiple restaurants or general view
  };

  const handleRestaurantClick = (restaurantId: string) => {
    console.log(`Navigate to restaurant with ID: ${restaurantId}`);
    // navigate(`/restaurant/${restaurantId}`); // Uncomment if you have restaurant detail pages
  };

  const allCities = Array.from(new Set(restaurants.map(r => r.location.city))).sort();

  return (
    <Box sx={{ 
      height: '600px', 
      width: '100%',
      position: 'relative',
      borderRadius: 2,
      overflow: 'hidden',
      border: `1px solid ${theme.palette.divider}`
    }}>
      <MapContainer
        center={getMapCenter()}
        zoom={getZoomLevel()}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        {/* Standard OpenStreetMap street view */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {filteredRestaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={[restaurant.location.lat, restaurant.location.lng]}
            icon={createCustomIcon(getRatingColor(restaurant.rating))}
            eventHandlers={{
              click: () => {
                handleRestaurantClick(restaurant.id);
              },
            }}
          >
            <Popup closeButton={false}>
              <Box sx={{ minWidth: 220, maxWidth: 250 }}>
                {/* Image Container for Overlay */}
                {restaurant.photos && restaurant.photos.length > 0 && (
                  <Box sx={{ position: 'relative', width: '100%', height: '150px', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                    <img 
                      src={`${import.meta.env.BASE_URL}${restaurant.photos[0].startsWith('/') ? restaurant.photos[0].substring(1) : restaurant.photos[0]}`} 
                      alt={restaurant.name} 
                      style={{ 
                        width: '100%', 
                        height: '150px', 
                        objectFit: 'cover',
                      }}
                    />
                    {/* Ratings Overlay */}
                    <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {/* Our Rating Bubble */}
                      <Box 
                        sx={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.6)', 
                          color: 'white', 
                          p: '2px 8px', // Adjusted padding
                          borderRadius: '12px', // Adjusted border radius
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 0.5 
                        }}
                      >
                        <Rating value={restaurant.rating} precision={0.1} size="small" readOnly sx={{ '& .MuiRating-iconFilled': { color: 'white' } }} />
                        <Typography variant="caption" sx={{ fontWeight: 'bold', lineHeight: '1.2' }}>
                          {restaurant.rating.toFixed(1)}
                        </Typography>
                         <Typography variant="caption" sx={{ fontWeight: 300, lineHeight: '1.2' }}>
                          Our
                        </Typography>
                      </Box>
                      {/* Google Rating Bubble */}
                      {restaurant.googleRating && (
                        <Box 
                          sx={{ 
                            backgroundColor: 'rgba(0, 0, 0, 0.6)', 
                            color: 'white', 
                            p: '2px 8px', // Adjusted padding
                            borderRadius: '12px', // Adjusted border radius
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 0.5 
                          }}
                        >
                          <Rating value={restaurant.googleRating} precision={0.1} size="small" readOnly 
                            sx={{ 
                              '& .MuiRating-iconFilled': { color: '#fb8c00' }, 
                              '& .MuiRating-iconEmpty': { borderColor: '#fb8c00' }
                            }} 
                          />
                          <Typography variant="caption" sx={{ fontWeight: 'bold', lineHeight: '1.2' }}>
                            {restaurant.googleRating.toFixed(1)}
                          </Typography>
                          <GoogleIcon sx={{ fontSize: '0.9rem', color: 'white', ml: 0.25 }}/>
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}

                {/* Details Below Image */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {restaurant.name}
                </Typography>

                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                  <Chip 
                    label={restaurant.cuisine} 
                    size="small" 
                    sx={{ 
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                      fontSize: '0.7rem'
                    }} 
                  />
                  <Chip 
                    label={restaurant.priceRange} 
                    size="small" 
                    sx={{ 
                      backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                      color: theme.palette.secondary.main,
                      fontWeight: 500,
                      fontSize: '0.7rem'
                    }} 
                  />
                  <Chip 
                    label={restaurant.location.city} 
                    size="small" 
                    sx={{ 
                      backgroundColor: alpha(theme.palette.primary.dark, 0.07),
                      color: theme.palette.primary.dark,
                      fontWeight: 500,
                      fontSize: '0.7rem'
                    }} 
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Visited: {new Date(restaurant.visitDate).toLocaleDateString('en-US', { 
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                  {restaurant.review}
                </Typography>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Title overlay */}
      <Paper 
        elevation={2}
        sx={{ 
          position: 'absolute', 
          top: 16, 
          left: 16, 
          zIndex: 1000,
          p: 1.5,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(4px)',
          borderRadius: 2,
          maxWidth: 300
        }}
      >
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 600, mb: 0.5 }}>
          Restaurant Visits
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          Tracking memorable dining experiences from our travels
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          <Chip 
            label="All"
            onClick={() => setActiveCity(null)}
            color={!activeCity ? 'primary' : 'default'}
            size="small"
            clickable
          />
          {allCities.map(city => (
            <Chip 
              key={city}
              label={city}
              onClick={() => setActiveCity(city)}
              color={activeCity === city ? 'primary' : 'default'}
              size="small"
              clickable
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default RestaurantVisitsMap; 