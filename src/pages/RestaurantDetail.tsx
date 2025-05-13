import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography,
  Box,
  Paper,
  Grid,
  Rating,
  Button,
  Link,
  Breadcrumbs,
  Chip,
  Divider,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Mock data - replace with real data fetching later
const mockRestaurantData: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Le Petit Bistro',
    location: { 
      lat: 48.8566, 
      lng: 2.3522,
      address: '123 Rue de Paris, Paris, France',
      city: 'Paris',
      country: 'France'
    },
    rating: 4.5,
    visitDate: '2024-02-15',
    review: 'Amazing French cuisine in the heart of Paris. The beef bourguignon was perfectly cooked, and the chocolate mousse was divine. The service was attentive and the atmosphere was cozy and authentic. Will definitely return on my next visit to Paris.',
    photos: [
      'https://via.placeholder.com/800x400?text=Le+Petit+Bistro',
      'https://via.placeholder.com/400x300?text=French+Dish+1',
      'https://via.placeholder.com/400x300?text=French+Dish+2',
    ]
  },
  '2': {
    id: '2',
    name: 'Sushi Master',
    location: { 
      lat: 35.6762, 
      lng: 139.6503,
      address: '1-2-3 Shibuya, Tokyo, Japan',
      city: 'Tokyo',
      country: 'Japan'
    },
    rating: 4.8,
    visitDate: '2024-01-20',
    review: 'Best sushi I\'ve ever had! The fish was incredibly fresh, and the chef\'s attention to detail was remarkable. The omakase menu was a journey through different flavors and textures. It\'s a small place with only 8 seats at the counter, which made for an intimate dining experience.',
    photos: [
      'https://via.placeholder.com/800x400?text=Sushi+Master',
      'https://via.placeholder.com/400x300?text=Sushi+Platter',
    ]
  },
  '3': {
    id: '3',
    name: 'Pasta Paradise',
    location: { 
      lat: 41.9028, 
      lng: 12.4964,
      address: 'Via Roma 42, Rome, Italy',
      city: 'Rome',
      country: 'Italy'
    },
    rating: 4.2,
    visitDate: '2024-03-01',
    review: 'Authentic Italian pasta dishes in a charming setting near the Colosseum. The carbonara was made traditionally without cream, just as it should be. The staff was friendly and offered great wine recommendations. The prices were reasonable for the quality of food served.',
    photos: [
      'https://via.placeholder.com/800x400?text=Pasta+Paradise',
    ]
  }
};

const RestaurantDetail = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<any | null>(null);

  useEffect(() => {
    if (restaurantId && mockRestaurantData[restaurantId]) {
      // In a real app, this would be an API call
      setRestaurant(mockRestaurantData[restaurantId]);
    }
  }, [restaurantId]);

  const handleBackClick = () => {
    navigate('/');
  };

  if (!restaurant) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5">Restaurant not found</Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={handleBackClick}
          sx={{ mb: 2 }}
        >
          Back to Map
        </Button>
        
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link color="inherit" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Home
          </Link>
          <Typography color="text.primary">{restaurant.name}</Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={4}>
        {/* Main photo */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ overflow: 'hidden' }}>
            <img 
              src={`${import.meta.env.BASE_URL}${restaurant.photos[0].startsWith('/') ? restaurant.photos[0].substring(1) : restaurant.photos[0]}`} 
              alt={restaurant.name} 
              style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover' }}
            />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 1 }}>
        {/* Restaurant info */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            {restaurant.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={restaurant.rating} precision={0.5} readOnly size="large" />
            <Typography variant="h6" sx={{ ml: 1 }}>
              {restaurant.rating.toFixed(1)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip 
              icon={<LocationOnIcon />} 
              label={`${restaurant.location.city}, ${restaurant.location.country}`} 
              variant="outlined" 
            />
            <Chip 
              icon={<CalendarTodayIcon />} 
              label={`Visited on ${new Date(restaurant.visitDate).toLocaleDateString()}`} 
              variant="outlined" 
            />
          </Box>

          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="h6" gutterBottom>Address</Typography>
          <Typography variant="body1" paragraph>
            {restaurant.location.address}
          </Typography>

          <Typography variant="h6" gutterBottom>Review</Typography>
          <Typography variant="body1" paragraph>
            {restaurant.review}
          </Typography>
        </Grid>

        {/* Map and additional photos */}
        <Grid item xs={12} md={4}>
          {/* Map */}
          <Typography variant="h6" gutterBottom>Location</Typography>
          <Paper elevation={1} sx={{ overflow: 'hidden', mb: 4, height: '250px' }}>
            <MapContainer
              center={[restaurant.location.lat, restaurant.location.lng]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[restaurant.location.lat, restaurant.location.lng]}>
                <Popup>
                  <strong>{restaurant.name}</strong><br />
                  {restaurant.location.address}
                </Popup>
              </Marker>
            </MapContainer>
          </Paper>

          {/* Additional photos */}
          <Typography variant="h6" gutterBottom>Food Photos</Typography>
          <Grid container spacing={2}>
            {restaurant.photos.slice(1).map((photo: string, index: number) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`${import.meta.env.BASE_URL}${photo.startsWith('/') ? photo.substring(1) : photo}`}
                    alt={`${restaurant.name} food ${index + 1}`}
                  />
                </Card>
              </Grid>
            ))}
            {restaurant.photos.length === 1 && (
              <Typography variant="body2" color="text.secondary">
                No food photos available
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RestaurantDetail; 