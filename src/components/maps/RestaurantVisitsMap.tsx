import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import { Box, Typography, Rating, Chip, useTheme, Paper, alpha, Button, Tooltip } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import GoogleIcon from '@mui/icons-material/Google';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';
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
  const [isOverlayMinimized, setIsOverlayMinimized] = useState(false);

  useEffect(() => {
    setRestaurants(getRestaurants());
  }, []);

  // Calculate rating colors
  const getRatingColor = (restaurant: Restaurant) => {
    const ratingToUse = restaurant.foodRating ?? restaurant.rating;
    if (ratingToUse >= 4.5) return theme.palette.secondary.main; 
    if (ratingToUse >= 4.0) return theme.palette.primary.main;
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
    // Always default to Atlanta if no city is active
    if (!activeCity) {
      return [ATLANTA_COORDS.lat, ATLANTA_COORDS.lng];
    }
    // If a city is active, find the first restaurant in that city or default to Atlanta
    const cityRestaurant = restaurants.find(r => r.location.city === activeCity);
    if (cityRestaurant) {
      return [cityRestaurant.location.lat, cityRestaurant.location.lng];
    }
    // Fallback to Atlanta if activeCity doesn't match any restaurant (should not happen with current UI)
    return [ATLANTA_COORDS.lat, ATLANTA_COORDS.lng]; 
  };

  // Function to calculate zoom level
  const getZoomLevel = () => {
    if (activeCity) return 13; // Zoom in when a city is selected
    return 11; // Default zoom for Atlanta overview
  };

  const handleRestaurantClick = (restaurantId: string) => {
    console.log(`Navigate to restaurant with ID: ${restaurantId}`);
    navigate(`/restaurant/${restaurantId}`); // Navigate to restaurant detail page
  };

  const allCities = Array.from(new Set(restaurants.map(r => r.location.city))).sort();

  // Custom zoom control component
  const CustomZoomControl = () => {
    const map = useMap();
    
    return (
      <div className="leaflet-bottom leaflet-left" style={{ marginBottom: '20px', marginLeft: '10px' }}>
        <div className="leaflet-control-zoom leaflet-bar leaflet-control">
          <a 
            className="leaflet-control-zoom-in" 
            href="#" 
            title="Zoom in" 
            role="button" 
            aria-label="Zoom in"
            onClick={(e) => {
              e.preventDefault();
              map.zoomIn();
            }}
          >+</a>
          <a 
            className="leaflet-control-zoom-out" 
            href="#" 
            title="Zoom out" 
            role="button" 
            aria-label="Zoom out"
            onClick={(e) => {
              e.preventDefault();
              map.zoomOut();
            }}
          >-</a>
        </div>
      </div>
    );
  };

  const PopupContent: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    // Function to get a contrasting text color based on marker color
    const getContrastingTextColor = (backgroundColor: string) => {
      // Basic contrast check, can be made more sophisticated
      const color = backgroundColor.substring(1); // strip #
      const rgb = parseInt(color, 16);   // convert rrggbb to decimal
      const r = (rgb >> 16) & 0xff;  // extract red
      const g = (rgb >>  8) & 0xff;  // extract green
      const b = (rgb >>  0) & 0xff;  // extract blue
      const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
      return luma < 128 ? '#FFFFFF' : '#000000';
    };

    const markerColor = getRatingColor(restaurant);
    const textColor = getContrastingTextColor(markerColor);

    return (
      <Paper 
        elevation={0} 
        sx={{
          minWidth: '280px', 
          maxWidth: '320px',
          p: 1.5, 
          borderRadius: '8px', 
          boxShadow: 'none',
          backgroundColor: alpha(theme.palette.background.paper, 0.95),
          backdropFilter: 'blur(5px)',
        }}
      >
        {restaurant.photos && restaurant.photos.length > 0 && (
          <Box 
            sx={{ 
              height: '120px', 
              mb: 1, 
              borderRadius: '6px', 
              overflow: 'hidden', 
              bgcolor: theme.palette.grey[200] 
            }}
          >
            <img 
              src={`${import.meta.env.BASE_URL}${restaurant.photos[0].startsWith('/') ? restaurant.photos[0].substring(1) : restaurant.photos[0]}`} 
              alt={restaurant.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        )}
        <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 'bold', fontSize: '1.1rem' }}>
          {restaurant.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          {typeof restaurant.foodRating === 'number' && (
            <Tooltip title={`Food: ${restaurant.foodRating.toFixed(1)}`} placement="top">
              <Chip 
                icon={<LocalDiningIcon sx={{ fontSize: '1rem'}} />} 
                label={restaurant.foodRating.toFixed(1)} 
                size="small" 
                variant="outlined"
                sx={{ 
                  fontSize: '0.7rem', 
                  height: '22px',
                  backgroundColor: alpha(theme.palette.primary.light, 0.2),
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  color: theme.palette.primary.dark,
                  '.MuiChip-icon': { color: theme.palette.primary.main, fontSize: '1rem' },
                }} 
              />
            </Tooltip>
          )}
          {typeof restaurant.drinkRating === 'number' && (
            <Tooltip title={`Drinks: ${restaurant.drinkRating.toFixed(1)}`} placement="top">
              <Chip 
                icon={<LocalBarIcon sx={{ fontSize: '1rem'}} />}
                label={restaurant.drinkRating.toFixed(1)} 
                size="small" 
                variant="outlined"
                sx={{ 
                  fontSize: '0.7rem', 
                  height: '22px',
                  backgroundColor: alpha(theme.palette.secondary.light, 0.2),
                  borderColor: alpha(theme.palette.secondary.main, 0.3),
                  color: theme.palette.secondary.dark,
                  '.MuiChip-icon': { color: theme.palette.secondary.main, fontSize: '1rem' },
                }} 
              />
            </Tooltip>
          )}
          {typeof restaurant.googleRating === 'number' && (
            <Tooltip title={`Google: ${restaurant.googleRating.toFixed(1)}`} placement="top">
              <Chip 
                icon={
                  <GoogleIcon 
                    sx={{ 
                      fontSize: '0.9rem', 
                      color: theme.palette.mode === 'dark' ? '#fff' : '#4285F4' 
                    }} 
                  />
                }
                label={restaurant.googleRating.toFixed(1)}
                size="small"
                variant="outlined"
                sx={{ 
                  fontSize: '0.7rem', 
                  height: '22px',
                  backgroundColor: theme.palette.mode === 'dark' ? alpha('#fff', 0.08) : alpha(theme.palette.grey[300], 0.3),
                  borderColor: theme.palette.mode === 'dark' ? alpha('#fff', 0.2) : alpha(theme.palette.grey[500], 0.4),
                  color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.secondary,
                  '.MuiChip-icon': { color: theme.palette.mode === 'dark' ? '#fff' : '#4285F4', fontSize: '0.9rem' },
                }} 
              />
            </Tooltip>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          <Chip label={restaurant.cuisine} size="small" sx={{ fontSize: '0.7rem', height: '20px' }} />
          <Chip label={restaurant.priceRange} size="small" sx={{ fontSize: '0.7rem', height: '20px' }} />
          <Chip label={restaurant.location.city} size="small" sx={{ fontSize: '0.7rem', height: '20px' }} />
        </Box>

        {restaurant.parking && (
          <Box sx={{ mb: 1, mt: 0.5 }}>
            <Typography variant="subtitle2" sx={{ fontSize: '0.85rem', fontWeight: 600, mb: 0.5 }}>
              Parking
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {[...Array(restaurant.parking.count)].map((_, i) => (
                <img 
                  key={i} 
                  src={`${import.meta.env.BASE_URL}${restaurant.parking?.icon?.startsWith('/') ? restaurant.parking?.icon?.substring(1) : restaurant.parking?.icon}`}
                  alt="Parking" 
                  style={{ width: '18px', height: '18px', marginRight: '3px' }}
                />
              ))}
              {restaurant.parking.description && 
                <Typography variant="caption" sx={{ ml: 0.5, color: 'text.secondary' }}>
                  ({restaurant.parking.description})
                </Typography>
              }
            </Box>
          </Box>
        )}

        <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 1.5 }}>
          {restaurant.visitDates && restaurant.visitDates.length > 0 && restaurant.visitDates[0]
            ? `Visited on: ${restaurant.visitDates
                .map(date => {
                  const d = new Date(date);
                  return isNaN(d.getTime()) ? null : d.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  });
                })
                .filter(Boolean)
                .join(', ')}`
            : 'Visited: Date Unknown'}
        </Typography>
        
        <Typography variant="body2" sx={{ fontSize: '0.85rem', mb: 2, maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {restaurant.review}
        </Typography>
        <Button 
          variant="contained" 
          size="small"
          fullWidth
          onClick={() => navigate(`/restaurant/${restaurant.id}`)}
          sx={{ 
            fontSize: '0.8rem', 
            py: 0.8,
            backgroundColor: markerColor,
            color: textColor,
            '&:hover': {
              backgroundColor: alpha(markerColor, 0.85)
            }
          }}
        >
          Click to view details
        </Button>
      </Paper>
    );
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
        center={getMapCenter()}
        zoom={getZoomLevel()}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        scrollWheelZoom={true}
        attributionControl={false}
      >
        {/* Stamen Toner Tiles */}
        <TileLayer
          url={
            theme.palette.mode === 'dark'
              ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
              : 'https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png'
          }
          attribution={
            theme.palette.mode === 'dark'
              ? '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              : '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
          }
        />
        
        {/* Add custom zoom control */}
        <CustomZoomControl />
        
        {filteredRestaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={[restaurant.location.lat, restaurant.location.lng]}
            icon={createCustomIcon(getRatingColor(restaurant))}
          >
            <Popup closeButton={false}>
              <PopupContent restaurant={restaurant} />
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
          right: 16,
          zIndex: 400,
          p: 1.5,
          backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'light' ? 0.9 : 0.85),
          backdropFilter: 'blur(4px)',
          borderRadius: 2,
          maxWidth: 250,
          border: `1px solid ${theme.palette.divider}`,
          transition: 'all 0.3s ease',
          transform: isOverlayMinimized ? 'translateX(calc(100% - 48px))' : 'translateX(0)',
          '&:hover': {
            boxShadow: 3
          }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: isOverlayMinimized ? 0 : 0.5 
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: theme.palette.primary.main, 
              fontWeight: 600,
              mb: 0,
              whiteSpace: 'nowrap'
            }}
          >
            {isOverlayMinimized ? '' : 'Restaurant Visits'}
          </Typography>
          <Box
            onClick={() => setIsOverlayMinimized(!isOverlayMinimized)}
            sx={{ 
              cursor: 'pointer', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 28,
              minHeight: 28,
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'primary.main',
              '&:hover': { 
                bgcolor: 'action.hover',
                boxShadow: '0 0 5px rgba(0,0,0,0.2)' 
              },
              zIndex: 2
            }}
          >
            {isOverlayMinimized ? '«' : '»'}
          </Box>
        </Box>
        
        {!isOverlayMinimized && (
          <>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1.5 }}>
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
          </>
        )}
      </Paper>
      {/* Custom styles for dark mode Leaflet popup */}
      <style>{`
        .leaflet-popup-content-wrapper {
          background-color: ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#fff'};
          color: ${theme.palette.mode === 'dark' ? theme.palette.common.white : '#000'};
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
        .leaflet-popup-tip {
          background-color: ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#fff'};
        }
        .leaflet-popup-close-button {
          color: ${theme.palette.mode === 'dark' ? theme.palette.common.white : '#000'} !important;
        }
        .restaurant-popup-content {
          background-color: ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#fff'} !important;
          color: ${theme.palette.mode === 'dark' ? theme.palette.common.white : '#000'} !important;
        }
      `}</style>
    </Box>
  );
};

export default RestaurantVisitsMap;