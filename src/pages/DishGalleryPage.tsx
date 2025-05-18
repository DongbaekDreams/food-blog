import { Container, Typography, Box, Breadcrumbs, Link, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DishGallery from '../components/dishes/DishGallery';

const DishGalleryPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link color="inherit" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Home
          </Link>
          <Typography color="text.primary">Dishes</Typography>
        </Breadcrumbs>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Our Dish Collection
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<RestaurantIcon />}
            onClick={() => navigate('/')}
          >
            View Cooking Map
          </Button>
        </Box>
        
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Browse all our cooking adventures, filter by country or ingredients, and discover new recipes!
        </Typography>
      </Box>

      <DishGallery />
    </Container>
  );
};

export default DishGalleryPage; 