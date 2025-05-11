import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Container, CircularProgress } from '@mui/material';

// This component is now deprecated and redirects to the new DishDetailPage
const DishDetail = () => {
  const { dishId } = useParams<{ dishId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new page path
    if (dishId) {
      navigate(`/dish/${dishId}`, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [dishId, navigate]);

  return (
    <Container sx={{ textAlign: 'center', py: 4 }}>
      <CircularProgress size={40} />
      <Typography variant="body1" sx={{ mt: 2 }}>
        Redirecting...
      </Typography>
    </Container>
  );
};

export default DishDetail; 