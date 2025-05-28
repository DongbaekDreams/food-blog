import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
  TextField,
  MenuItem,
  InputAdornment,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
  Paper,
  Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import GoogleIcon from '@mui/icons-material/Google';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { getRestaurants } from '../../data/dataService';
import { Restaurant } from '../../data/types';

const EstablishmentGallery = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [availableCuisines, setAvailableCuisines] = useState<string[]>([]);

  useEffect(() => {
    // Load all restaurants
    const allRestaurants = getRestaurants();
    setRestaurants(allRestaurants);
    setFilteredRestaurants(allRestaurants);

    // Extract all unique cuisines
    const cuisines = new Set<string>();
    allRestaurants.forEach(restaurant => {
      if (restaurant.cuisine) {
        cuisines.add(restaurant.cuisine);
      }
    });
    setAvailableCuisines(Array.from(cuisines).sort());
  }, []);

  useEffect(() => {
    // Apply filters whenever any filter changes
    let result = [...restaurants];

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query) || 
        restaurant.review?.toLowerCase().includes(query) ||
        restaurant.cuisine?.toLowerCase().includes(query)
      );
    }

    // Apply city filter
    if (selectedCity) {
      result = result.filter(restaurant => restaurant.location.city === selectedCity);
    }

    // Apply cuisine filter
    if (selectedCuisines.length > 0) {
      result = result.filter(restaurant => 
        restaurant.cuisine && selectedCuisines.includes(restaurant.cuisine)
      );
    }

    setFilteredRestaurants(result);
  }, [searchQuery, selectedCity, selectedCuisines, restaurants]);

  const handleCityChange = (event: SelectChangeEvent) => {
    setSelectedCity(event.target.value);
  };

  const handleCuisinesChange = (event: SelectChangeEvent<typeof selectedCuisines>) => {
    const value = event.target.value;
    setSelectedCuisines(typeof value === 'string' ? value.split(',') : value);
  };

  const handleRestaurantClick = (restaurantId: string) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  const getRatingColor = (restaurant: Restaurant) => {
    const ratingToUse = restaurant.foodRating ?? restaurant.rating;
    if (ratingToUse >= 4.5) return theme.palette.secondary.main;
    if (ratingToUse >= 4.0) return theme.palette.primary.main;
    return theme.palette.primary.light;
  };

  const allCities = Array.from(new Set(restaurants.map(r => r.location.city))).sort();

  return (
    <Box>
      {/* Filters */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search Establishments"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="city-select-label">City</InputLabel>
              <Select
                labelId="city-select-label"
                id="city-select"
                value={selectedCity}
                onChange={handleCityChange}
                label="City"
              >
                <MenuItem value="">
                  <em>All Cities</em>
                </MenuItem>
                {allCities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="cuisines-select-label">Cuisines</InputLabel>
              <Select
                labelId="cuisines-select-label"
                id="cuisines-select"
                multiple
                value={selectedCuisines}
                onChange={handleCuisinesChange}
                input={<OutlinedInput label="Cuisines" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {availableCuisines.map((cuisine) => (
                  <MenuItem key={cuisine} value={cuisine}>
                    <Checkbox checked={selectedCuisines.indexOf(cuisine) > -1} />
                    <ListItemText primary={cuisine} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Results count */}
      <Typography variant="subtitle1" sx={{ mb: 2, color: theme => theme.palette.text.primary }}>
        {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'establishment' : 'establishments'} found
      </Typography>

      {/* Restaurant cards */}
      <Grid container spacing={3}>
        {filteredRestaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                  cursor: 'pointer',
                },
                boxShadow: 2,
                borderRadius: 2,
                overflow: 'hidden'
              }}
              onClick={() => handleRestaurantClick(restaurant.id)}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`${import.meta.env.BASE_URL}${restaurant.photos[0].startsWith('/') ? restaurant.photos[0].substring(1) : restaurant.photos[0]}`}
                  alt={restaurant.name}
                  sx={{ objectFit: 'cover' }}
                />
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 10, 
                    right: 10, 
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5
                  }}
                >
                  {typeof restaurant.foodRating === 'number' && (
                    <Tooltip title="Food Rating" placement="left">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocalDiningIcon sx={{ fontSize: '1rem' }} />
                        <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 500 }}>
                          {restaurant.foodRating.toFixed(1)}
                        </Typography>
                      </Box>
                    </Tooltip>
                  )}
                  {typeof restaurant.drinkRating === 'number' && (
                    <Tooltip title="Drink Rating" placement="left">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocalBarIcon sx={{ fontSize: '1rem' }} />
                        <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 500 }}>
                          {restaurant.drinkRating.toFixed(1)}
                        </Typography>
                      </Box>
                    </Tooltip>
                  )}
                  {typeof restaurant.googleRating === 'number' && (
                    <Tooltip title="Google Rating" placement="left">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <GoogleIcon sx={{ fontSize: '1rem' }} />
                        <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 500 }}>
                          {restaurant.googleRating.toFixed(1)}
                        </Typography>
                      </Box>
                    </Tooltip>
                  )}
                </Box>
              </Box>
              
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography variant="h6" component="div" gutterBottom noWrap>
                  {restaurant.name}
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
                  {restaurant.cuisine && (
                    <Chip 
                      label={restaurant.cuisine} 
                      size="small" 
                      variant="outlined"
                    />
                  )}
                  {restaurant.priceRange && (
                    <Chip 
                      label={restaurant.priceRange} 
                      size="small" 
                      variant="outlined"
                    />
                  )}
                  <Chip 
                    label={restaurant.location.city} 
                    size="small" 
                    variant="outlined"
                  />
                </Box>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: 1.5
                  }}
                >
                  {restaurant.review}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    icon={<CalendarTodayIcon fontSize="small" />}
                    label={restaurant.visitDates && restaurant.visitDates[0]
                      ? new Date(restaurant.visitDates[0]).toLocaleDateString('en-US', { 
                          month: 'short',
                          year: 'numeric'
                        })
                      : 'Date Unknown'
                    }
                    size="small"
                    variant="outlined"
                  />
                  {restaurant.photos.length > 1 && (
                    <Typography variant="caption" color="text.secondary">
                      {restaurant.photos.length} photos
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredRestaurants.length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8, 
          px: 2, 
          backgroundColor: 'rgba(0, 0, 0, 0.03)', 
          borderRadius: 2 
        }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No establishments found matching your filters
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters to see more results
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default EstablishmentGallery; 