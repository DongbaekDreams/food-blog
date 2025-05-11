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
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LinkIcon from '@mui/icons-material/Link';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';

import { getDishById } from '../data/dataService';
import { Dish } from '../data/types';

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
      id={`dish-tabpanel-${index}`}
      aria-labelledby={`dish-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const DishDetailPage = () => {
  const { dishId } = useParams<{ dishId: string }>();
  const navigate = useNavigate();
  const [dish, setDish] = useState<Dish | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (dishId) {
      const foundDish = getDishById(dishId);
      if (foundDish) {
        setDish(foundDish);
      }
    }
  }, [dishId]);

  const handleBackToCountry = () => {
    if (dish && dish.country) {
      navigate(`/country/${dish.country}`);
    } else {
      navigate('/');
    }
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
    if (!dish) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? dish.photos.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    if (!dish) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === dish.photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!dish) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5">Dish not found</Typography>
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
              src={dish.photos[currentImageIndex]} 
              alt={`${dish.name} ${currentImageIndex + 1}`} 
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
            {currentImageIndex + 1} / {dish.photos.length}
          </Typography>
        </Box>
      )}

      <Box sx={{ mb: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={handleBackToCountry}
          sx={{ mb: 2 }}
        >
          Back to {dish.countryName}
        </Button>
        
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link color="inherit" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Home
          </Link>
          <Link 
            color="inherit" 
            href={`/country/${dish.country}`} 
            onClick={(e) => { 
              e.preventDefault(); 
              navigate(`/country/${dish.country}`); 
            }}
          >
            {dish.countryName}
          </Link>
          <Typography color="text.primary">{dish.name}</Typography>
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
              src={dish.photos[currentImageIndex]} 
              alt={dish.name} 
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
          {dish.photos.length > 1 && (
            <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1, mb: 3 }}>
              {dish.photos.map((photo, index) => (
                <Paper 
                  key={index} 
                  elevation={currentImageIndex === index ? 4 : 1}
                  sx={{ 
                    width: 80, 
                    height: 80,
                    flexShrink: 0,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: currentImageIndex === index ? '2px solid #1976d2' : 'none',
                  }}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img 
                    src={photo} 
                    alt={`Thumbnail ${index + 1}`} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                </Paper>
              ))}
            </Box>
          )}

          {/* Tabs for different content */}
          <Box sx={{ width: '100%', mt: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                aria-label="dish details tabs"
                variant="fullWidth"
              >
                <Tab label="Overview" id="dish-tab-0" />
                <Tab label="Recipe" id="dish-tab-1" />
                {dish.videoUrl && <Tab label="Video" id="dish-tab-2" />}
              </Tabs>
            </Box>
            
            {/* Overview Tab */}
            <TabPanel value={tabValue} index={0}>
              <Typography variant="h5" component="h2" gutterBottom>
                {dish.name}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={dish.rating} precision={0.5} readOnly />
                <Typography variant="subtitle1" sx={{ ml: 1 }}>
                  {dish.rating.toFixed(1)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                <Chip 
                  label={dish.countryName} 
                  variant="outlined" 
                  size="small"
                />
                <Chip 
                  icon={<CalendarTodayIcon />} 
                  label={new Date(dish.dateCooked).toLocaleDateString()} 
                  variant="outlined"
                  size="small"
                />
                <Chip 
                  label={dish.difficulty} 
                  variant="outlined"
                  size="small"
                  color={
                    dish.difficulty === 'Easy' ? 'success' : 
                    dish.difficulty === 'Medium' ? 'primary' : 'error'
                  }
                />
                {dish.prepTime && (
                  <Chip 
                    icon={<AccessTimeIcon />} 
                    label={`Prep: ${dish.prepTime}`} 
                    variant="outlined"
                    size="small"
                  />
                )}
                {dish.cookTime && (
                  <Chip 
                    icon={<AccessTimeIcon />} 
                    label={`Cook: ${dish.cookTime}`} 
                    variant="outlined"
                    size="small"
                  />
                )}
                {dish.servings && (
                  <Chip 
                    icon={<RestaurantIcon />} 
                    label={`Serves ${dish.servings}`} 
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>

              <Typography variant="body1" paragraph>
                {dish.recipeDetails}
              </Typography>
              
              {dish.notes && (
                <>
                  <Typography variant="h6" sx={{ mt: 3 }}>Notes</Typography>
                  <Typography variant="body2" paragraph>
                    {dish.notes}
                  </Typography>
                </>
              )}
              
              {/* Tags */}
              {dish.tags && dish.tags.length > 0 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle2" gutterBottom>Tags</Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {dish.tags.map((tag, index) => (
                      <Chip 
                        key={index}
                        label={tag}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </TabPanel>
            
            {/* Recipe Tab */}
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h5" gutterBottom>Recipe</Typography>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>Ingredients</Typography>
                <List>
                  {dish.ingredients.map((ingredient, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemText primary={ingredient} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              
              {dish.recipe ? (
                <Box>
                  <Typography variant="h6" gutterBottom>Instructions</Typography>
                  <Typography variant="body1" component="div">
                    {dish.recipe.split('\n').map((paragraph, index) => (
                      <Typography key={index} paragraph>
                        {paragraph}
                      </Typography>
                    ))}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Detailed recipe instructions not available. Please see the overview tab for a general description.
                </Typography>
              )}
              
              {dish.sourceUrl && (
                <Button 
                  variant="outlined" 
                  startIcon={<LinkIcon />}
                  href={dish.sourceUrl}
                  target="_blank"
                  sx={{ mt: 3 }}
                >
                  View Original Recipe
                </Button>
              )}
              
              {dish.googleSearchUrl && (
                <Button 
                  variant="outlined" 
                  startIcon={<LinkIcon />}
                  href={dish.googleSearchUrl}
                  target="_blank"
                  sx={{ mt: 3, ml: 2 }}
                >
                  Find Similar Recipes
                </Button>
              )}
            </TabPanel>
            
            {/* Video Tab */}
            {dish.videoUrl && (
              <TabPanel value={tabValue} index={2}>
                <Typography variant="h5" gutterBottom>Video Demonstration</Typography>
                
                <Paper sx={{ position: 'relative', pb: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', mb: 3 }}>
                  <iframe 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                    src={dish.videoUrl.includes('youtube.com') ? 
                      dish.videoUrl.replace('watch?v=', 'embed/') : 
                      dish.videoUrl}
                    title={`${dish.name} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Paper>
                
                <Button 
                  variant="outlined" 
                  startIcon={<YouTubeIcon />}
                  href={dish.videoUrl}
                  target="_blank"
                >
                  Open Video in New Tab
                </Button>
              </TabPanel>
            )}
          </Box>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={5}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>At a Glance</Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Difficulty</Typography>
                  <Typography variant="body1">{dish.difficulty}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Total Time</Typography>
                  <Typography variant="body1">{dish.totalTime || 'Not specified'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Preparation</Typography>
                  <Typography variant="body1">{dish.prepTime || 'Not specified'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Cooking</Typography>
                  <Typography variant="body1">{dish.cookTime || 'Not specified'}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Servings</Typography>
                  <Typography variant="body1">{dish.servings || 'Not specified'}</Typography>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" gutterBottom>Ingredients</Typography>
              <List dense>
                {dish.ingredients.slice(0, 7).map((ingredient, index) => (
                  <ListItem key={index} sx={{ py: 0.25 }}>
                    <ListItemText primary={ingredient} />
                  </ListItem>
                ))}
                {dish.ingredients.length > 7 && (
                  <ListItem sx={{ py: 0.25 }}>
                    <ListItemText 
                      primary={`+${dish.ingredients.length - 7} more ingredients`}
                      primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                    />
                  </ListItem>
                )}
              </List>
              
              {tabValue !== 1 && (
                <Button 
                  variant="outlined" 
                  fullWidth 
                  onClick={() => setTabValue(1)}
                  sx={{ mt: 2 }}
                >
                  View Full Recipe
                </Button>
              )}
              
              {dish.sourceUrl && (
                <Button 
                  variant="text" 
                  startIcon={<LinkIcon />}
                  href={dish.sourceUrl}
                  target="_blank"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Original Recipe Source
                </Button>
              )}
            </CardContent>
          </Card>
          
          {/* Similar Dishes Card (could be implemented later) */}
          {/* <Card elevation={2} sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>You Might Also Like</Typography>
              <Typography variant="body2" color="text.secondary">
                Similar dish recommendations would appear here
              </Typography>
            </CardContent>
          </Card> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DishDetailPage;
