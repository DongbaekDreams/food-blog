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
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { getDishes, getCountriesData } from '../../data/dataService';
import { Dish } from '../../data/types';

const DishGallery = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [countries, setCountries] = useState<{ code: string; name: string; flagEmoji?: string }[]>([]);

  useEffect(() => {
    // Load all dishes
    const allDishes = getDishes();
    setDishes(allDishes);
    setFilteredDishes(allDishes);

    // Extract all unique tags
    const tags = new Set<string>();
    allDishes.forEach(dish => {
      dish.tags?.forEach(tag => tags.add(tag));
    });
    setAvailableTags(Array.from(tags).sort());

    // Get countries data
    const countriesData = getCountriesData();
    const countryList = Object.keys(countriesData).map(code => ({
      code,
      name: allDishes.find(dish => dish.country === code)?.countryName || code,
      flagEmoji: countriesData[code].flagEmoji
    }));
    setCountries(countryList.sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  useEffect(() => {
    // Apply filters whenever any filter changes
    let result = [...dishes];

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(dish => 
        dish.name.toLowerCase().includes(query) || 
        dish.recipeDetails.toLowerCase().includes(query) ||
        dish.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply country filter
    if (selectedCountry) {
      result = result.filter(dish => dish.country === selectedCountry);
    }

    // Apply tags filter
    if (selectedTags.length > 0) {
      result = result.filter(dish => 
        selectedTags.every(tag => dish.tags?.includes(tag))
      );
    }

    setFilteredDishes(result);
  }, [searchQuery, selectedCountry, selectedTags, dishes]);

  const handleCountryChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value);
  };

  const handleTagsChange = (event: SelectChangeEvent<typeof selectedTags>) => {
    const value = event.target.value;
    setSelectedTags(typeof value === 'string' ? value.split(',') : value);
  };

  const handleDishClick = (dishId: string) => {
    navigate(`/dish/${dishId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'success';
      case 'Medium':
        return 'primary';
      case 'Hard':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      {/* Filters */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search Dishes"
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
              <InputLabel id="country-select-label">Country</InputLabel>
              <Select
                labelId="country-select-label"
                id="country-select"
                value={selectedCountry}
                onChange={handleCountryChange}
                label="Country"
              >
                <MenuItem value="">
                  <em>All Countries</em>
                </MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.flagEmoji} {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="tags-select-label">Tags</InputLabel>
              <Select
                labelId="tags-select-label"
                id="tags-select"
                multiple
                value={selectedTags}
                onChange={handleTagsChange}
                input={<OutlinedInput label="Tags" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {availableTags.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    <Checkbox checked={selectedTags.indexOf(tag) > -1} />
                    <ListItemText primary={tag} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Results count */}
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {filteredDishes.length} {filteredDishes.length === 1 ? 'dish' : 'dishes'} found
      </Typography>

      {/* Dish cards */}
      <Grid container spacing={3}>
        {filteredDishes.map((dish) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={dish.id}>
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
              onClick={() => handleDishClick(dish.id)}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={dish.mainImage}
                  alt={dish.name}
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
                    alignItems: 'center'
                  }}
                >
                  <Rating value={dish.rating} precision={0.5} readOnly size="small" 
                    sx={{ color: '#FFB400' }} 
                  />
                </Box>
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 10, 
                    left: 10, 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  {countries.find(c => c.code === dish.country)?.flagEmoji} {dish.countryName}
                </Box>
              </Box>
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography variant="h6" component="div" gutterBottom noWrap>
                  {dish.name}
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
                  <Chip 
                    label={dish.difficulty} 
                    size="small" 
                    color={getDifficultyColor(dish.difficulty) as any}
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
                  {dish.recipeDetails}
                </Typography>
                
                <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip 
                    icon={<CalendarTodayIcon fontSize="small" />}
                    label={new Date(dish.dateCooked).toLocaleDateString('en-US', { 
                      month: 'short',
                      year: 'numeric'
                    })}
                    size="small"
                    variant="outlined"
                  />
                  {dish.photos.length > 1 && (
                    <Typography variant="caption" color="text.secondary">
                      {dish.photos.length} photos
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredDishes.length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8, 
          px: 2, 
          backgroundColor: 'rgba(0, 0, 0, 0.03)', 
          borderRadius: 2 
        }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No dishes found matching your filters
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters to see more results
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DishGallery; 