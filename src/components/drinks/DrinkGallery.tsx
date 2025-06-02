import { useState, useEffect } from 'react';
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
  InputAdornment,
  Paper,
  useTheme,
  Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { getDrinks } from '../../data/dataService';
import { Drink } from '../../data/types';
import { getImageUrl } from '../../utils/imageUtils';
import { useNavigate } from 'react-router-dom';

const DrinkGallery = () => {
  const theme = useTheme();
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [filteredDrinks, setFilteredDrinks] = useState<Drink[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const allDrinks = getDrinks();
    // Sort by most recent date
    allDrinks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setDrinks(allDrinks);
    setFilteredDrinks(allDrinks);
  }, []);

  useEffect(() => {
    let result = [...drinks];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(drink => 
        drink.title.toLowerCase().includes(query) || 
        drink.description.toLowerCase().includes(query) ||
        drink.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    setFilteredDrinks(result);
  }, [searchQuery, drinks]);

  const handleDrinkClick = (drinkId: string) => {
    navigate(`/drink/${drinkId}`);
  };

  return (
    <Box>
      {/* Filter Bar */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} > {/* Adjusted to md={6} to make space if other filters are added */}
            <TextField
              fullWidth
              label="Search Drinks"
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
          {/* Future filter options can go here */}
        </Grid>
      </Paper>

      {/* Results count */}
      <Typography variant="subtitle1" sx={{ mb: 2, color: theme.palette.text.primary }}>
        {filteredDrinks.length} {filteredDrinks.length === 1 ? 'drink' : 'drinks'} found
      </Typography>

      {/* Drink cards */}
      <Grid container spacing={3}>
        {filteredDrinks.map((drink) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={drink.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[6],
                  cursor: 'pointer',
                },
                boxShadow: theme.shadows[2],
                borderRadius: 2,
                overflow: 'hidden'
              }}
              onClick={() => handleDrinkClick(drink.id)}
            >
              <Box sx={{ position: 'relative' }}>
                {/* Render CardMedia only if drink.mainImage is a non-empty string */}
                {drink.mainImage && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={getImageUrl(drink.mainImage)}
                    alt={drink.title}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                {!drink.mainImage && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={getImageUrl('images/placeholder.png')}
                    alt="Placeholder"
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <Box 
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                >
                  <Tooltip title="View Details">
                    <Typography variant="h6" component="div" sx={{ color: 'white' }}>
                      {drink.title}
                    </Typography>
                  </Tooltip>
                </Box>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {drink.title}
                </Typography>
                <Rating value={drink.stars} readOnly size="small" sx={{ mb: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mb: 1 }}>
                  <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="caption">
                    {new Date(drink.date).toLocaleDateString()}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, height: '60px', overflow: 'hidden', textOverflow: 'ellipsis'}} title={drink.description}>
                  {drink.description} 
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                  {drink.tags?.map((tag) => (
                    <Chip key={tag} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5, backgroundColor: theme.palette.action.hover }} />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DrinkGallery; 