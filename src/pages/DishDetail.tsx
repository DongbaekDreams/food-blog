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
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PublicIcon from '@mui/icons-material/Public';
import LinkIcon from '@mui/icons-material/Link';

// Mock data - replace with real data fetching later
const mockDishData: Record<string, any> = {
  'us1': {
    id: 'us1',
    name: 'Hamburger',
    country: 'US',
    countryName: 'United States',
    dateCooked: '2024-01-12',
    rating: 4.5,
    recipeDetails: 'Classic American hamburger with beef patty, lettuce, tomato, onion, and special sauce.',
    sourceUrl: 'https://example.com/hamburger-recipe',
    photos: [
      'https://via.placeholder.com/800x400?text=Hamburger+Main',
      'https://via.placeholder.com/400x300?text=Hamburger+Process',
      'https://via.placeholder.com/400x300?text=Hamburger+Plated',
    ]
  },
  'it1': {
    id: 'it1',
    name: 'Pizza Margherita',
    country: 'IT',
    countryName: 'Italy',
    dateCooked: '2024-02-05',
    rating: 4.8,
    recipeDetails: 'Traditional Italian Pizza Margherita with tomato sauce, mozzarella, fresh basil, and olive oil.',
    sourceUrl: 'https://example.com/pizza-recipe',
    photos: [
      'https://via.placeholder.com/800x400?text=Pizza+Main',
      'https://via.placeholder.com/400x300?text=Pizza+Process',
    ]
  },
  'jp1': {
    id: 'jp1',
    name: 'Sushi',
    country: 'JP',
    countryName: 'Japan',
    dateCooked: '2024-03-18',
    rating: 4.9,
    recipeDetails: 'Homemade sushi rolls with fresh salmon, avocado, cucumber, and seasoned rice.',
    sourceUrl: 'https://example.com/sushi-recipe',
    photos: [
      'https://via.placeholder.com/800x400?text=Sushi+Main',
    ]
  }
};

const DishDetail = () => {
  const { dishId } = useParams<{ dishId: string }>();
  const navigate = useNavigate();
  const [dish, setDish] = useState<any | null>(null);

  useEffect(() => {
    if (dishId && mockDishData[dishId]) {
      // In a real app, this would be an API call
      setDish(mockDishData[dishId]);
    }
  }, [dishId]);

  const handleBackToCountry = () => {
    if (dish && dish.country) {
      navigate(`/country/${dish.country}`);
    } else {
      navigate('/');
    }
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
        {/* Main photo */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ overflow: 'hidden' }}>
            <img 
              src={dish.photos[0]} 
              alt={dish.name} 
              style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover' }}
            />
          </Paper>
        </Grid>

        {/* Dish info */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            {dish.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={dish.rating} precision={0.5} readOnly size="large" />
            <Typography variant="h6" sx={{ ml: 1 }}>
              {dish.rating.toFixed(1)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip 
              icon={<PublicIcon />} 
              label={dish.countryName} 
              variant="outlined" 
              onClick={() => navigate(`/country/${dish.country}`)}
            />
            <Chip 
              icon={<CalendarTodayIcon />} 
              label={`Cooked on ${new Date(dish.dateCooked).toLocaleDateString()}`} 
              variant="outlined" 
            />
            {dish.sourceUrl && (
              <Chip 
                icon={<LinkIcon />} 
                label="Recipe Source" 
                variant="outlined" 
                component="a" 
                href={dish.sourceUrl}
                target="_blank"
                clickable
              />
            )}
          </Box>

          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="h6" gutterBottom>Recipe Details</Typography>
          <Typography variant="body1" paragraph>
            {dish.recipeDetails}
          </Typography>
        </Grid>

        {/* Additional photos */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>More Photos</Typography>
          <Grid container spacing={2}>
            {dish.photos.slice(1).map((photo: string, index: number) => (
              <Grid item xs={12} key={index}>
                <Paper elevation={1} sx={{ overflow: 'hidden' }}>
                  <img 
                    src={photo} 
                    alt={`${dish.name} ${index + 2}`} 
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Paper>
              </Grid>
            ))}
            {dish.photos.length === 1 && (
              <Typography variant="body2" color="text.secondary">
                No additional photos available
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DishDetail; 