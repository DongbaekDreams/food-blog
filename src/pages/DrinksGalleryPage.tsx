import { Container, Typography, Box, Breadcrumbs, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DrinkGallery from '../components/drinks/DrinkGallery'; // Import the actual DrinkGallery

const DrinksGalleryPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link color="inherit" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Home
          </Link>
          <Typography color="text.primary">Liqueurs & Liquors</Typography>
        </Breadcrumbs>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Our Drink Collection
          </Typography>
          {/* Optional: Add a button here if needed, e.g., for filtering or other actions */}
        </Box>
        
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Browse all our purchased and tasted liqueurs and liquors. Discover new favorites!
        </Typography>
      </Box>

      <DrinkGallery /> {/* Use the actual DrinkGallery component */}
    </Container>
  );
};

export default DrinksGalleryPage; 