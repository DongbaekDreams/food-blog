import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Typography, Rating, Chip, useTheme, Paper } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

// Restaurant data
const restaurantData = [
  {
    id: '1',
    name: 'Staplehouse',
    location: { lat: 33.7536, lng: -84.3723 },
    rating: 4.9,
    visitDate: '2024-04-12',
    review: 'Exceptional tasting menu with seasonal ingredients. The atmosphere was intimate and service impeccable.',
    cuisine: 'New American',
    priceRange: '$$$$',
    city: 'Atlanta'
  },
  {
    id: '2',
    name: 'Bones Restaurant',
    location: { lat: 33.8454, lng: -84.3670 },
    rating: 4.7,
    visitDate: '2024-03-18',
    review: 'Classic steakhouse with perfect dry-aged steaks. Old-school elegance and attentive service.',
    cuisine: 'Steakhouse',
    priceRange: '$$$$',
    city: 'Atlanta'
  },
  {
    id: '3',
    name: 'Tuk Tuk Thai Food Loft',
    location: { lat: 33.7894, lng: -84.3660 },
    rating: 4.4,
    visitDate: '2024-02-28',
    review: 'Authentic Thai flavors with a modern twist. The rooftop setting provides a nice view of the city.',
    cuisine: 'Thai',
    priceRange: '$$',
    city: 'Atlanta'
  },
  {
    id: '4',
    name: 'Slutty Vegan',
    location: { lat: 33.7539, lng: -84.4301 },
    rating: 4.6,
    visitDate: '2024-03-05',
    review: 'Incredible plant-based burgers that would satisfy even meat lovers. Always a fun atmosphere.',
    cuisine: 'Vegan',
    priceRange: '$$',
    city: 'Atlanta'
  },
  {
    id: '5',
    name: 'Pancake Pantry',
    location: { lat: 36.1513, lng: -86.7980 },
    rating: 4.5,
    visitDate: '2024-02-15',
    review: 'Iconic Nashville breakfast spot with incredible pancakes. Worth the wait in line!',
    cuisine: 'Breakfast',
    priceRange: '$$',
    city: 'Nashville'
  },
  {
    id: '6',
    name: 'Hattie B\'s Hot Chicken',
    location: { lat: 36.1514, lng: -86.7939 },
    rating: 4.7,
    visitDate: '2024-02-16',
    review: 'The best hot chicken in Nashville. Perfect spice levels and incredibly juicy.',
    cuisine: 'Southern',
    priceRange: '$$',
    city: 'Nashville'
  },
];

const RestaurantVisitsMap = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeCity, setActiveCity] = useState<string | null>(null);

  // Calculate rating colors
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return theme.palette.secondary.main; 
    if (rating >= 4.0) return theme.palette.primary.main;
    return theme.palette.primary.light;
  };

  // Function to filter restaurants by city when a city is selected
  const filteredRestaurants = activeCity 
    ? restaurantData.filter(r => r.city === activeCity)
    : restaurantData;

  // Function to calculate map center based on active city or default to Atlanta
  const getMapCenter = () => {
    if (activeCity === 'Nashville') {
      return [36.1627, -86.7816];
    }
    return [ATLANTA_COORDS.lat, ATLANTA_COORDS.lng];
  };

  // Function to calculate zoom level
  const getZoomLevel = () => {
    return activeCity ? 13 : 5;
  };

  const handleRestaurantClick = (restaurantId: string) => {
    navigate(`/restaurant/${restaurantId}`);
  };

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
        center={activeCity ? getMapCenter() as [number, number] : [35.5, -85]}
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
            <Popup>
              <Box sx={{ minWidth: 220, maxWidth: 250 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {restaurant.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Rating value={restaurant.rating} precision={0.1} size="small" readOnly />
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {restaurant.rating.toFixed(1)}
                  </Typography>
                </Box>
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
                    label={restaurant.city} 
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
        <Typography variant="body2" color="text.secondary">
          Tracking memorable dining experiences from my travels
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          <Chip 
            label="All" 
            color={activeCity === null ? "primary" : "default"} 
            size="small" 
            onClick={() => setActiveCity(null)}
            sx={{ fontWeight: 500 }}
          />
          <Chip 
            label="Atlanta" 
            color={activeCity === 'Atlanta' ? "primary" : "default"} 
            size="small" 
            onClick={() => setActiveCity('Atlanta')}
            sx={{ fontWeight: 500 }}
          />
          <Chip 
            label="Nashville" 
            color={activeCity === 'Nashville' ? "primary" : "default"} 
            size="small" 
            onClick={() => setActiveCity('Nashville')}
            sx={{ fontWeight: 500 }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

function alpha(color: string, value: number) {
  return color + Math.round(value * 255).toString(16).padStart(2, '0');
}

export default RestaurantVisitsMap; 