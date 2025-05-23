import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Rating,
  Chip
} from '@mui/material';
import { getRestaurants } from '../data/dataService';
import { Restaurant } from '../data/types';

const RestaurantsListPage = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const data = getRestaurants();
    // Sort by rating descending
    setRestaurants([...data].sort((a, b) => b.rating - a.rating));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link color="inherit" href="/" onClick={e => { e.preventDefault(); navigate('/'); }}>
            Home
          </Link>
          <Typography color="text.primary">Restaurants</Typography>
        </Breadcrumbs>
        <Typography variant="h4" component="h1" gutterBottom>
          All Restaurants
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Ranked by rating
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Thumbnail</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Cuisine</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((r, idx) => (
              <TableRow key={r.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`/restaurant/${r.id}`)}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={r.mainImage ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${r.mainImage}` : undefined}
                    alt={r.name}
                  />
                </TableCell>
                <TableCell>
                  <Link
                    color="primary"
                    underline="hover"
                    onClick={e => { e.preventDefault(); navigate(`/restaurant/${r.id}`); }}
                    sx={{ fontWeight: 600 }}
                  >
                    {r.name}
                  </Link>
                </TableCell>
                <TableCell>{r.location.city}</TableCell>
                <TableCell>
                  <Chip label={r.cuisine} size="small" />
                </TableCell>
                <TableCell>
                  <Rating value={r.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="caption" sx={{ ml: 1 }}>{r.rating.toFixed(1)}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RestaurantsListPage; 