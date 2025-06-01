import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Paper,
  Grid,
  Chip,
  Rating,
  Tabs,
  Tab,
  Button,
  IconButton,
  Divider,
  useTheme
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LabelIcon from '@mui/icons-material/Label';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import { getDrinkById } from '../data/dataService';
import { Drink } from '../data/types';
import { getImageUrl } from '../utils/imageUtils';

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
      id={`drink-tabpanel-${index}`}
      aria-labelledby={`drink-tab-${index}`}
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

function a11yProps(index: number) {
  return {
    id: `drink-tab-${index}`,
    'aria-controls': `drink-tabpanel-${index}`,
  };
}

const DrinkDetailPage = () => {
  const { drinkId } = useParams<{ drinkId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [drink, setDrink] = useState<Drink | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (drinkId) {
      const foundDrink = getDrinkById(drinkId);
      if (foundDrink) {
        setDrink(foundDrink);
      }
    }
  }, [drinkId]);

  const handleBackToDrinks = () => {
    navigate('/drinks');
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
    if (!drink) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? drink.photos.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    if (!drink) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === drink.photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!drink) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5">Drink not found</Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/drinks')} sx={{ mt: 2 }}>
          Back to Drinks
        </Button>
      </Container>
    );
  }

  // Lightbox component
  const lightbox = lightboxOpen && (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 1300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4
      }}
    >
      <IconButton 
        onClick={closeLightbox}
        sx={{ 
          position: 'absolute', 
          top: 16, 
          right: 16, 
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }
        }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      
      <Box sx={{ position: 'relative', maxHeight: '80vh', display: 'flex', alignItems: 'center' }}>
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
        
        {drink.photos[currentImageIndex].endsWith('.mp4') ? (
          <video
            src={getImageUrl(drink.photos[currentImageIndex])}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            autoPlay
            muted
            loop
            playsInline
            controls
          />
        ) : (
          <img 
            src={getImageUrl(drink.photos[currentImageIndex])} 
            alt={`${drink.title} ${currentImageIndex + 1}`} 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              objectFit: 'contain' 
            }}
          />
        )}
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
        {currentImageIndex + 1} / {drink.photos.length}
      </Typography>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {lightbox}
      
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link color="inherit" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          Home
        </Link>
        <Link color="inherit" href="/drinks" onClick={(e) => { e.preventDefault(); navigate('/drinks'); }}>
          Drinks
        </Link>
        <Typography color="text.primary">{drink.title}</Typography>
      </Breadcrumbs>
      
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={handleBackToDrinks} 
        sx={{ mb: 3 }}
      >
        Back to Drinks
      </Button>

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
            {drink.photos[currentImageIndex]?.endsWith('.mp4') ? (
              <video
                src={getImageUrl(drink.photos[currentImageIndex])}
                style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover' }}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img 
                src={getImageUrl(drink.photos[currentImageIndex])}
                alt={drink.title} 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxHeight: '500px', 
                  objectFit: 'cover' 
                }}
              />
            )}
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
          {drink.photos.length > 1 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {drink.photos.map((photo, idx) => (
                <Box 
                  key={idx}
                  onClick={() => handleThumbnailClick(idx)}
                  sx={{ 
                    width: 80, 
                    height: 60, 
                    border: idx === currentImageIndex ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
                    borderRadius: 1,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  {photo.endsWith('.mp4') ? (
                    <video
                      src={getImageUrl(photo)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <img 
                      src={getImageUrl(photo)}
                      alt={`Thumbnail ${idx + 1}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  )}
                </Box>
              ))}
            </Box>
          )}
          
          {/* Tabs content */}
          <Box sx={{ width: '100%', mt: 4 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="drink details tabs"
              variant="fullWidth"
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                mb: 2
              }}
            >
              <Tab label="Description" {...a11yProps(0)} />
              <Tab label="Details" {...a11yProps(1)} />
            </Tabs>
            
            <TabPanel value={tabValue} index={0}>
              <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                {drink.description}
              </Typography>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Tasting Date
              </Typography>
              <Typography variant="body1" paragraph>
                {new Date(drink.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Rating
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={drink.stars} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({drink.stars} / 5)
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {drink.tags.map((tag, index) => (
                  <Chip 
                    key={index}
                    icon={<LabelIcon />}
                    label={tag}
                    variant="outlined"
                    size="medium"
                  />
                ))}
              </Box>
            </TabPanel>
          </Box>
        </Grid>
        
        {/* Sidebar */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {drink.title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating 
                value={drink.stars} 
                precision={0.5} 
                readOnly 
                size="large"
              />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {drink.stars.toFixed(1)}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {new Date(drink.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" paragraph>
              {drink.description}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom>
              Tags
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {drink.tags.map((tag, index) => (
                <Chip 
                  key={index}
                  label={tag}
                  variant="outlined"
                  size="medium"
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DrinkDetailPage; 