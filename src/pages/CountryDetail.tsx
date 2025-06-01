import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Rating, 
  Button,
  Box,
  Breadcrumbs,
  Link,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import { getCountriesData } from '../data/dataService';
import { Dish } from '../data/types';

const CountryDetail = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const navigate = useNavigate();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [countryName, setCountryName] = useState<string>('');

  useEffect(() => {
    if (countryId) {
      const countriesData = getCountriesData();
      const countryData = countriesData[countryId];
      
      if (countryData) {
        setDishes(countryData.dishes);
        setCountryName(countryData.dishes[0]?.countryName || '');
      }
    }
  }, [countryId]);

  const handleDishClick = (dishId: string) => {
    navigate(`/dish/${dishId}`);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  // Helper to determine if a dish is coming soon
  const isComingSoon = (dish: Dish) => {
    return !!dish.comingSoon;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
          <Typography color="text.primary">{countryName}</Typography>
        </Breadcrumbs>
        
        <Typography variant="h4" component="h1" gutterBottom>
          Dishes from {countryName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {dishes.length} dishes cooked
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {dishes.map((dish) => (
          <Grid item xs={12} sm={6} md={4} key={dish.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  cursor: 'pointer',
                },
                boxShadow: 3,
                borderRadius: 2,
                overflow: 'hidden'
              }}
              onClick={() => handleDishClick(dish.id)}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={`${import.meta.env.BASE_URL}${dish.mainImage.startsWith('/') ? dish.mainImage.substring(1) : dish.mainImage}`}
                  alt={dish.name}
                  sx={{ objectFit: 'cover' }}
                />
                {isComingSoon(dish) && (
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      borderRadius: 1,
                      px: 2,
                      py: 1,
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      zIndex: 2
                    }}
                  >
                    Coming Soon
                  </Box>
                )}
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {dish.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={dish.rating} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {dish.rating.toFixed(1)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                  <Chip 
                    label={dish.difficulty} 
                    size="small" 
                    color={
                      dish.difficulty === 'Easy' ? 'success' : 
                      dish.difficulty === 'Medium' ? 'primary' : 'error'
                    }
                    variant="outlined"
                  />
                  {dish.prepTime && (
                    <Chip 
                      icon={<AccessTimeIcon fontSize="small" />}
                      label={dish.prepTime}
                      size="small"
                      variant="outlined"
                    />
                  )}
                  {!isComingSoon(dish) && dish.dateCooked && (
                    <Chip 
                      icon={<CalendarTodayIcon fontSize="small" />}
                      label={new Date(dish.dateCooked).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CountryDetail; 