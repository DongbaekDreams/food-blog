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
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

const RestaurantsListPage = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: string | null }>({ key: 'rating', direction: 'descending' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [availableCuisines, setAvailableCuisines] = useState<string[]>([]);
  const [allCities, setAllCities] = useState<string[]>([]);

  useEffect(() => {
    const data = getRestaurants();

    // Extract all unique cuisines and cities
    const cuisines = new Set<string>();
    const cities = new Set<string>();
    data.forEach(r => {
      if (r.cuisine) cuisines.add(r.cuisine);
      if (r.location.city) cities.add(r.location.city);
    });
    setAvailableCuisines(Array.from(cuisines).sort());
    setAllCities(Array.from(cities).sort());

    const sortedRestaurants = [...data].sort((a, b) => {
      if (!sortConfig.key) return 0;

      const aValue = sortConfig.key === 'rating' 
        ? (a[sortConfig.key as keyof Restaurant] as number | undefined) ?? 0
        : a[sortConfig.key as keyof Restaurant] ?? 0;
      const bValue = sortConfig.key === 'rating'
        ? (b[sortConfig.key as keyof Restaurant] as number | undefined) ?? 0
        : b[sortConfig.key as keyof Restaurant] ?? 0;

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

  // Filtered restaurants
  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.review?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity ? r.location.city === selectedCity : true;
    const matchesCuisine = selectedCuisines.length > 0 ? selectedCuisines.includes(r.cuisine) : true;
    return matchesSearch && matchesCity && matchesCuisine;
  });

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
        {/* Filters */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3, mb: 2 }}>
          <TextField
            label="Search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ minWidth: 200 }}
          />
          <FormControl variant="outlined" size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="city-select-label">City</InputLabel>
            <Select
              labelId="city-select-label"
              value={selectedCity}
              onChange={(e: SelectChangeEvent) => setSelectedCity(e.target.value)}
              label="City"
            >
              <MenuItem value=""><em>All Cities</em></MenuItem>
              {allCities.map(city => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="cuisines-select-label">Cuisines</InputLabel>
            <Select
              labelId="cuisines-select-label"
              multiple
              value={selectedCuisines}
              onChange={(e: SelectChangeEvent<typeof selectedCuisines>) => {
                const value = e.target.value;
                setSelectedCuisines(typeof value === 'string' ? value.split(',') : value);
              }}
              input={<OutlinedInput label="Cuisines" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {availableCuisines.map(cuisine => (
                <MenuItem key={cuisine} value={cuisine}>
                  <Checkbox checked={selectedCuisines.indexOf(cuisine) > -1} />
                  <ListItemText primary={cuisine} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
              <TableCell
                key="rating"
                onClick={() => handleSort('rating')}
                sx={{ cursor: 'pointer' }}
              >
                Food Rating {sortConfig.key === 'rating' && (sortConfig.direction === 'ascending' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
              </TableCell>
              <TableCell
                key="drinkRating"
                onClick={() => handleSort('drinkRating')}
                sx={{ cursor: 'pointer' }}
              >
                Drink Rating {sortConfig.key === 'drinkRating' && (sortConfig.direction === 'ascending' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
              </TableCell>
              <TableCell>City</TableCell>
              <TableCell>Cuisine</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRestaurants.map((r, idx) => (
              <TableRow key={r.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`/restaurant/${r.id}`)}>
                <TableCell>{sortConfig.direction === 'ascending' ? filteredRestaurants.length - idx : idx + 1}</TableCell>
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
                <TableCell>
                  {typeof r.rating === 'number' && (
                    <>
                      <Rating value={r.rating} precision={0.1} readOnly size="small" />
                      <Typography variant="caption" sx={{ ml: 1 }}>{r.rating.toFixed(1)}</Typography>
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {typeof r.drinkRating === 'number' && (
                    <>
                      <Rating value={r.drinkRating} precision={0.1} readOnly size="small" />
                      <Typography variant="caption" sx={{ ml: 1 }}>{r.drinkRating.toFixed(1)}</Typography>
                    </>
                  )}
                </TableCell>
                <TableCell>{r.location.city}</TableCell>
                <TableCell>
                  <Chip label={r.cuisine} size="small" />
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