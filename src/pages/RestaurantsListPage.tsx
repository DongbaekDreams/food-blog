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
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const RestaurantsListPage = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: string | null }>({ key: 'foodRating', direction: 'descending' });

  useEffect(() => {
    const data = getRestaurants();

    const sortedRestaurants = [...data].sort((a, b) => {
      if (!sortConfig.key) return 0;

      const aValue = a[sortConfig.key as keyof Restaurant] ?? 0;
      const bValue = b[sortConfig.key as keyof Restaurant] ?? 0;

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setRestaurants(sortedRestaurants);
  }, [sortConfig]);

  // Function to handle sorting
  const handleSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
        direction = 'ascending'; // Or you could set key to null to remove sort
    }
    setSortConfig({ key, direction });
  };

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
              <TableCell
                key="name"
                onClick={() => handleSort('name')}
                sx={{ cursor: 'pointer' }}
              >
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
              </TableCell>
              <TableCell>City</TableCell>
              <TableCell>Cuisine</TableCell>
              <TableCell
                key="foodRating"
                onClick={() => handleSort('foodRating')}
                sx={{ cursor: 'pointer' }}
              >
                Food Rating {sortConfig.key === 'foodRating' && (sortConfig.direction === 'ascending' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
              </TableCell>
              <TableCell
                key="drinkRating"
                onClick={() => handleSort('drinkRating')}
                sx={{ cursor: 'pointer' }}
              >
                Drink Rating {sortConfig.key === 'drinkRating' && (sortConfig.direction === 'ascending' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
              </TableCell>
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
                  <Rating value={r.foodRating ?? r.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="caption" sx={{ ml: 1 }}>{(r.foodRating ?? r.rating).toFixed(1)}</Typography>
                </TableCell>
                <TableCell>
                  {r.drinkRating !== undefined && (
                    <>
                      <Rating value={r.drinkRating} precision={0.1} readOnly size="small" />
                      <Typography variant="caption" sx={{ ml: 1 }}>{r.drinkRating.toFixed(1)}</Typography>
                    </>
                  )}
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