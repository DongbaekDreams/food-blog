import { Container, Typography, Box, Breadcrumbs, Link, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MapIcon from '@mui/icons-material/Map';
import EstablishmentGallery from '../components/restaurants/EstablishmentGallery';

const EstablishmentGalleryPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link color="inherit" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Home
          </Link>
          <Typography color="text.primary">Establishments</Typography>
        </Breadcrumbs>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Our Dining Collection
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<MapIcon />}
            onClick={() => navigate('/')}
          >
            View Dining Map
          </Button>
        </Box>
        
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Browse all our dining experiences, filter by city or cuisine, and discover new places to try!
        </Typography>
      </Box>

      <EstablishmentGallery />
    </Container>
  );
};

export default EstablishmentGalleryPage; 