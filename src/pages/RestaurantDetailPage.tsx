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
  CardContent,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  IconButton,
  useTheme
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GoogleIcon from '@mui/icons-material/Google';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { getRestaurantById } from '../data/dataService';
import { Restaurant } from '../data/types';

// TabPanel component for tab content
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`restaurant-tab-${index}`}
      aria-labelledby={`restaurant-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const RestaurantDetailPage = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (restaurantId) {
      const foundRestaurant = getRestaurantById(restaurantId);
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
        console.log("Restaurant data:", foundRestaurant);
      }
    }
  }, [restaurantId]);

  const handleBackToList = () => {
    navigate('/restaurants');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPreviousImage = () => {
    if (!restaurant) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? restaurant.photos.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    if (!restaurant) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === restaurant.photos.length - 1 ? 0 : prevIndex + 1
    );
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
      {/* Lightbox Modal */}
      {lightboxOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <IconButton 
            onClick={closeLightbox}
            sx={{ 
              position: 'absolute', 
              top: 20, 
              right: 20, 
              color: 'white'
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          
          <Box sx={{ position: 'relative', width: '80%', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton 
              onClick={goToPreviousImage}
              sx={{ 
                position: 'absolute', 
                left: -60, 
                color: 'white'
              }}
            >
              <ChevronLeftIcon fontSize="large" />
            </IconButton>
            
            <img 
              src={`${import.meta.env.BASE_URL}${restaurant.photos[currentImageIndex].startsWith('/') ? restaurant.photos[currentImageIndex].substring(1) : restaurant.photos[currentImageIndex]}`} 
              alt={`${restaurant.name} ${currentImageIndex + 1}`} 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain' 
              }}
            />
            
            <IconButton 
              onClick={goToNextImage}
              sx={{ 
                position: 'absolute', 
                right: -60, 
                color: 'white'
              }}
            >
              <ChevronRightIcon fontSize="large" />
            </IconButton>
          </Box>
          
          <Typography variant="body2" sx={{ color: 'white', mt: 2 }}>
            {currentImageIndex + 1} / {restaurant.photos.length}
          </Typography>
        </Box>
      )}

      <Box sx={{ mb: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={handleBackToList}
          sx={{ mb: 2 }}
        >
          Back to Restaurants
        </Button>
        
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link color="inherit" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Home
          </Link>
          <Link color="inherit" href="/restaurants" onClick={(e) => { e.preventDefault(); navigate('/restaurants'); }}>
            Restaurants
          </Link>
          <Typography color="text.primary">{restaurant.name}</Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={4}>
        {/* Main content */}
        <Grid item xs={12} md={7}>
          {/* Main image */}
          <Paper 
            elevation={3} 
            sx={{ 
              overflow: 'hidden', 
              position: 'relative',
              mb: 2
            }}
          >
            <img 
              src={`${import.meta.env.BASE_URL}${restaurant.photos[currentImageIndex].startsWith('/') ? restaurant.photos[currentImageIndex].substring(1) : restaurant.photos[currentImageIndex]}`} 
              alt={restaurant.name} 
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxHeight: '500px', 
                objectFit: 'cover' 
              }}
            />
            <IconButton
              onClick={() => openLightbox(currentImageIndex)}
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                }
              }}
            >
              <FullscreenIcon />
            </IconButton>
          </Paper>
          
          {/* Thumbnails */}
          {restaurant.photos.length > 1 && (
            <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', mb: 4, pb: 1 }}>
              {restaurant.photos.map((photo, index) => (
                <Box 
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  sx={{ 
                    width: 80, 
                    height: 60, 
                    flexShrink: 0,
                    borderRadius: 1,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: index === currentImageIndex ? '2px solid #2196F3' : '2px solid transparent',
                  }}
                >
                  <img 
                    src={`${import.meta.env.BASE_URL}${photo.startsWith('/') ? photo.substring(1) : photo}`} 
                    alt={`${restaurant.name} thumbnail ${index + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              ))}
            </Box>
          )}
          
          <Box sx={{ width: '100%', mt: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                aria-label="restaurant details tabs"
                variant="fullWidth"
              >
                <Tab label="Overview" id="restaurant-tab-0" />
                <Tab label="Details" id="restaurant-tab-1" />
                <Tab label="Map" id="restaurant-tab-2" />
              </Tabs>
            </Box>
            
            {/* Overview Tab */}
            <TabPanel value={tabValue} index={0}>
              <Typography variant="h5" component="h2" gutterBottom>
                {restaurant.name}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={restaurant.rating} precision={0.5} readOnly />
                <Typography variant="subtitle1" sx={{ ml: 1 }}>
                  {restaurant.rating.toFixed(1)}
                </Typography>
                
                {restaurant.googleRating && (
                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                    <GoogleIcon fontSize="small" sx={{ mr: 0.5, color: '#4285F4' }} />
                    <Rating value={restaurant.googleRating} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {restaurant.googleRating.toFixed(1)}
                    </Typography>
                  </Box>
                )}
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                <Chip 
                  icon={<LocationOnIcon />} 
                  label={`${restaurant.location.city}, ${restaurant.location.country}`} 
                  variant="outlined" 
                  size="small"
                />
                <Chip 
                  icon={<CalendarTodayIcon />} 
                  label={`Visited on ${new Date(restaurant.visitDate).toLocaleDateString()}`} 
                  variant="outlined"
                  size="small"
                />
                <Chip 
                  icon={<LocalDiningIcon />}
                  label={restaurant.cuisine} 
                  variant="outlined"
                  size="small"
                  color="primary"
                />
                <Chip 
                  icon={<AttachMoneyIcon />}
                  label={restaurant.priceRange} 
                  variant="outlined"
                  size="small"
                />
              </Box>

              <Divider sx={{ mb: 3 }} />
              
              <Typography variant="h6" gutterBottom>Our Review</Typography>
              <Typography variant="body1" paragraph>
                {restaurant.review}
              </Typography>
              
              <Divider sx={{ mb: 3 }} />
              
              <Typography variant="h6" gutterBottom>Location</Typography>
              <Typography variant="body1" paragraph>
                {restaurant.location.address}
              </Typography>
              
              {restaurant.website && (
                <Button 
                  variant="outlined" 
                  startIcon={<LanguageIcon />}
                  href={restaurant.website}
                  target="_blank"
                  sx={{ mt: 1, mr: 2 }}
                >
                  Visit Website
                </Button>
              )}
              
              {restaurant.location.googleMapsUrl && (
                <Button 
                  variant="outlined" 
                  startIcon={<GoogleIcon />}
                  href={restaurant.location.googleMapsUrl}
                  target="_blank"
                  sx={{ mt: 1 }}
                >
                  View on Google Maps
                </Button>
              )}
            </TabPanel>
            
            {/* Details Tab */}
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>Contact Information</Typography>
              
              <List>
                {restaurant.phoneNumber && (
                  <ListItem>
                    <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <ListItemText 
                      primary="Phone"
                      secondary={restaurant.phoneNumber}
                    />
                  </ListItem>
                )}
                
                {restaurant.website && (
                  <ListItem>
                    <LanguageIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <ListItemText 
                      primary="Website"
                      secondary={
                        <Link href={restaurant.website} target="_blank">
                          {restaurant.website}
                        </Link>
                      }
                    />
                  </ListItem>
                )}
              </List>
              
              {restaurant.openingHours && restaurant.openingHours.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Opening Hours</Typography>
                  <List dense>
                    {restaurant.openingHours.map((hours, index) => (
                      <ListItem key={index}>
                        <AccessTimeIcon sx={{ mr: 2, color: 'primary.main', fontSize: '1.2rem' }} />
                        <ListItemText primary={hours} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
              
              {restaurant.tags && restaurant.tags.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Tags</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {restaurant.tags.map((tag, index) => (
                      <Chip 
                        key={index}
                        label={tag}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </>
              )}
              
              {restaurant.parking && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Parking</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <pre style={{ fontSize: '11px', backgroundColor: '#f5f5f5', padding: '5px', marginBottom: '10px' }}>
                      {JSON.stringify(restaurant.parking, null, 2)}
                    </pre>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    {/* Static test image */}
                    <img 
                      src="/images/icons/thumbs-up.png"
                      alt="Static Thumbs Up Test" 
                      style={{ width: '28px', height: '28px', marginRight: '15px', border: '1px solid red' }}
                    />
                    {/* Test with BASE_URL */}
                    <img 
                      src={`${import.meta.env.BASE_URL}images/icons/thumbs-up.png`}
                      alt="BASE_URL Test" 
                      style={{ width: '28px', height: '28px', marginRight: '15px', border: '1px solid blue' }}
                    />
                    {/* Dynamic images based on count */}
                    {[...Array(restaurant.parking?.count || 0)].map((_, i) => (
                      <img 
                        key={i} 
                        src={`${import.meta.env.BASE_URL}${restaurant.parking?.icon?.startsWith('/') ? restaurant.parking?.icon?.substring(1) : restaurant.parking?.icon}`}
                        alt="Parking Rating" 
                        style={{ width: '28px', height: '28px', marginRight: '4px' }}
                      />
                    ))}
                    {restaurant.parking?.description && (
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({restaurant.parking?.description})
                      </Typography>
                    )}
                  </Box>
                </>
              )}
            </TabPanel>
            
            {/* Map Tab */}
            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" gutterBottom>Map Location</Typography>
              <Paper elevation={2} sx={{ overflow: 'hidden', mb: 3, height: '400px' }}>
                <MapContainer
                  center={[restaurant.location.lat, restaurant.location.lng]}
                  zoom={15}
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={true}
                >
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
                  <Marker position={[restaurant.location.lat, restaurant.location.lng]}>
                    <Popup>
                      <strong>{restaurant.name}</strong><br />
                      {restaurant.location.address}
                    </Popup>
                  </Marker>
                </MapContainer>
              </Paper>
              
              <Typography variant="body1" paragraph>
                {restaurant.location.address}
              </Typography>
              
              {restaurant.location.googleMapsUrl && (
                <Button 
                  variant="contained" 
                  startIcon={<GoogleIcon />}
                  href={restaurant.location.googleMapsUrl}
                  target="_blank"
                  color="primary"
                >
                  Get Directions
                </Button>
              )}
            </TabPanel>
          </Box>
        </Grid>
        
        {/* Sidebar */}
        <Grid item xs={12} md={5}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Restaurant Info</Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Cuisine</Typography>
                  <Typography variant="body1">{restaurant.cuisine}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Price Range</Typography>
                  <Typography variant="body1">{restaurant.priceRange}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Our Rating</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating value={restaurant.rating} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {restaurant.rating.toFixed(1)}
                    </Typography>
                  </Box>
                </Grid>
                {restaurant.googleRating && (
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Google Rating</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <GoogleIcon fontSize="small" sx={{ mr: 0.5, color: '#4285F4' }} />
                      <Typography variant="body2">
                        {restaurant.googleRating.toFixed(1)}
                      </Typography>
                    </Box>
                  </Grid>
                )}
                {restaurant.parking && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Parking</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      {[...Array(restaurant.parking?.count || 0)].map((_, i) => (
                        <img 
                          key={i} 
                          src={`${import.meta.env.BASE_URL}${restaurant.parking?.icon?.startsWith('/') ? restaurant.parking?.icon?.substring(1) : restaurant.parking?.icon}`}
                          alt="Parking" 
                          style={{ width: '20px', height: '20px', marginRight: '3px' }}
                        />
                      ))}
                      {restaurant.parking?.description && (
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          ({restaurant.parking?.description})
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Visit Date</Typography>
                  <Typography variant="body1">
                    {new Date(restaurant.visitDate).toLocaleDateString(undefined, { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Typography>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" gutterBottom>Location</Typography>
              <Typography variant="body2" paragraph>
                {restaurant.location.address}
              </Typography>
              
              <Box sx={{ height: '150px', mb: 2, borderRadius: 1, overflow: 'hidden' }}>
                <MapContainer
                  center={[restaurant.location.lat, restaurant.location.lng]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={false}
                  zoomControl={false}
                  attributionControl={false}
                >
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
                  <Marker position={[restaurant.location.lat, restaurant.location.lng]} />
                </MapContainer>
              </Box>
              
              {tabValue !== 2 && (
                <Button 
                  variant="outlined" 
                  fullWidth 
                  onClick={() => setTabValue(2)}
                  sx={{ mb: 2 }}
                  startIcon={<LocationOnIcon />}
                >
                  View Full Map
                </Button>
              )}
              
              {restaurant.location.googleMapsUrl && (
                <Button 
                  variant="outlined" 
                  startIcon={<GoogleIcon />}
                  href={restaurant.location.googleMapsUrl}
                  target="_blank"
                  fullWidth
                >
                  Open in Google Maps
                </Button>
              )}
            </CardContent>
          </Card>
          
          {restaurant.openingHours && restaurant.openingHours.length > 0 && (
            <Card elevation={2} sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Opening Hours</Typography>
                <List dense>
                  {restaurant.openingHours.map((hours, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <AccessTimeIcon sx={{ mr: 1.5, color: 'text.secondary', fontSize: '1rem' }} />
                      <ListItemText primary={hours} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
          
          {restaurant.tags && restaurant.tags.length > 0 && (
            <Card elevation={2} sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Tags</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {restaurant.tags.map((tag, index) => (
                    <Chip 
                      key={index}
                      label={tag}
                      size="small"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default RestaurantDetailPage;
