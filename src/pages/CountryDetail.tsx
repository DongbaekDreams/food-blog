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
  Link
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Mock data - replace with real data fetching
const mockDishes = {
  'US': [
    { id: 'us1', name: 'Hamburger', rating: 4.5, photoUrl: 'https://via.placeholder.com/300x200?text=Hamburger' },
    { id: 'us2', name: 'Hot Dog', rating: 4.0, photoUrl: 'https://via.placeholder.com/300x200?text=Hot+Dog' },
    { id: 'us3', name: 'Apple Pie', rating: 4.7, photoUrl: 'https://via.placeholder.com/300x200?text=Apple+Pie' },
  ],
  'IT': [
    { id: 'it1', name: 'Pizza Margherita', rating: 4.8, photoUrl: 'https://via.placeholder.com/300x200?text=Pizza+Margherita' },
    { id: 'it2', name: 'Pasta Carbonara', rating: 4.6, photoUrl: 'https://via.placeholder.com/300x200?text=Pasta+Carbonara' },
  ],
  'JP': [
    { id: 'jp1', name: 'Sushi', rating: 4.9, photoUrl: 'https://via.placeholder.com/300x200?text=Sushi' },
  ],
  'FR': [
    { id: 'fr1', name: 'Croissant', rating: 4.5, photoUrl: 'https://via.placeholder.com/300x200?text=Croissant' },
    { id: 'fr2', name: 'Coq au Vin', rating: 4.7, photoUrl: 'https://via.placeholder.com/300x200?text=Coq+au+Vin' },
  ],
  'IN': [
    { id: 'in1', name: 'Butter Chicken', rating: 4.6, photoUrl: 'https://via.placeholder.com/300x200?text=Butter+Chicken' },
    { id: 'in2', name: 'Samosa', rating: 4.3, photoUrl: 'https://via.placeholder.com/300x200?text=Samosa' },
  ],
};

// Country name mapping
const countryNames: Record<string, string> = {
  'US': 'United States',
  'IT': 'Italy',
  'JP': 'Japan',
  'FR': 'France',
  'IN': 'India',
};

const CountryDetail = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const navigate = useNavigate();
  const [dishes, setDishes] = useState<any[]>([]);
  const [countryName, setCountryName] = useState<string>('');

  useEffect(() => {
    if (countryId) {
      // In a real app, fetch data from API
      setDishes(mockDishes[countryId as keyof typeof mockDishes] || []);
      setCountryName(countryNames[countryId as keyof typeof countryNames] || countryId);
    }
  }, [countryId]);

  const handleDishClick = (dishId: string) => {
    navigate(`/dish/${dishId}`);
  };

  const handleBackClick = () => {
    navigate('/');
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
              }}
              onClick={() => handleDishClick(dish.id)}
            >
              <CardMedia
                component="img"
                height="200"
                image={dish.photoUrl}
                alt={dish.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {dish.name}
                </Typography>
                <Rating value={dish.rating} precision={0.5} readOnly />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CountryDetail; 