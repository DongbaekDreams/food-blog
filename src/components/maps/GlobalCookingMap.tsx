import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { Box, Paper, Typography, useTheme, Button, Divider, Dialog, DialogContent, DialogTitle, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import 'leaflet/dist/leaflet.css';

// Dish type definition
interface Dish {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  dateCooked: string;
  rating: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
}

// Country data type with dishes
interface CountryData {
  dishCount: number;
  dishes: Dish[];
  flagEmoji?: string;
}

// Temporary mock data with dishes - replace with real data later
const mockData: Record<string, CountryData> = {
  'US': {
    dishCount: 1,
    flagEmoji: '🇺🇸',
    dishes: [
      {
        id: 'us-1',
        name: 'Cajun Pasta',
        description: 'A spicy pasta dish with Cajun-seasoned chicken, bell peppers, and a creamy sauce. The perfect blend of Southern and Italian flavors with a kick of heat.',
        imagePath: '/images/dishes/CajunPasta.jpg',
        dateCooked: '2024-03-15',
        rating: 4.8,
        difficulty: 'Medium',
        ingredients: [
          'Chicken breast',
          'Penne pasta',
          'Bell peppers',
          'Onions',
          'Garlic',
          'Cajun seasoning',
          'Heavy cream',
          'Parmesan cheese',
          'Green onions',
          'Olive oil',
          'Cayenne pepper'
        ]
      }
    ]
  },
  'IT': {
    dishCount: 1,
    flagEmoji: '🇮🇹',
    dishes: [
      {
        id: 'it-1',
        name: 'Garlic Bread',
        description: 'Crusty Italian bread slathered with garlic-infused butter and herbs, then toasted to golden perfection. A simple yet irresistible side that pairs perfectly with pasta dishes.',
        imagePath: '/images/dishes/GarlicBread.jpg',
        dateCooked: '2024-04-02',
        rating: 4.5,
        difficulty: 'Easy',
        ingredients: [
          'Italian bread',
          'Butter',
          'Fresh garlic',
          'Parsley',
          'Parmesan cheese',
          'Salt',
          'Oregano',
          'Olive oil',
          'Black pepper'
        ]
      }
    ]
  }
};

const GlobalCookingMap = () => {
  const navigate = useNavigate();
  const [geoData, setGeoData] = useState<any>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countryDetailsOpen, setCountryDetailsOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    // Fetch GeoJSON data for world countries
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then(response => response.json())
      .then(data => setGeoData(data))
      .catch(error => console.error('Error fetching GeoJSON data:', error));
  }, []);

  const getColor = (countryCode: string) => {
    const countryData = mockData[countryCode as keyof typeof mockData];
    if (!countryData) return '#E5E5E5'; // Light gray for countries with no data
    const count = countryData.dishCount;
    if (count === 0) return '#E5E5E5';
    if (count < 5) return '#FFF176'; // 1-4 dishes (light yellow)
    if (count < 10) return '#FFB300'; // 5-9 dishes (gold)
    return '#8D6E63'; // 10+ dishes (brown)
  };

  const onEachFeature = (feature: any, layer: any) => {
    const countryCode = feature.properties["ISO3166-1-Alpha-2"];
    console.log('GeoJSON country code:', countryCode, 'Mock data exists:', !!mockData[countryCode]);
    const countryData = mockData[countryCode as keyof typeof mockData];

    layer.on({
      mouseover: () => {
        setHoveredCountry(countryCode);
        layer.setStyle({
          weight: 2,
          fillOpacity: 0.9,
        });
      },
      mouseout: () => {
        setHoveredCountry(null);
        layer.setStyle({
          weight: 1,
          fillOpacity: 0.7,
        });
      },
      click: () => {
        if (countryData && countryData.dishes.length > 0) {
          setSelectedCountry(countryCode);
          setCountryDetailsOpen(true);
        } else {
          // Navigate to country detail page using React Router for countries without dishes
          navigate(`/country/${countryCode}`);
        }
      },
    });
  };

  const style = (feature: any) => {
    const countryCode = feature.properties["ISO3166-1-Alpha-2"];
    return {
      fillColor: getColor(countryCode),
      weight: 1,
      opacity: 1,
      color: '#FFFFFF',
      fillOpacity: 0.8,
    };
  };

  // Get the country name from the GeoJSON data
  const getCountryName = (countryCode: string) => {
    if (!geoData) return countryCode;
    const feature = geoData.features.find((f: any) => f.properties["ISO3166-1-Alpha-2"] === countryCode);
    return feature ? feature.properties.name : countryCode;
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCloseCountryDetails = () => {
    setCountryDetailsOpen(false);
  };

  return (
    <Box sx={{ height: '600px', width: '100%', position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%', background: '#F2F7F9' }}
        zoomControl={true}
        attributionControl={false}
        scrollWheelZoom={true}
      >
        {/* Simple light-colored base map */}
        <TileLayer
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {geoData && (
          <GeoJSON
            data={geoData}
            style={style}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
      
      {hoveredCountry && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            padding: 2,
            zIndex: 1000,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            borderRadius: 2,
            border: `1px solid ${theme.palette.secondary.light}`,
            minWidth: 180,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5, color: theme.palette.primary.main }}>
            {mockData[hoveredCountry as keyof typeof mockData]?.flagEmoji || ''} {getCountryName(hoveredCountry)}
          </Typography>
          <Typography variant="body2">
            Dishes cooked: <strong>{mockData[hoveredCountry as keyof typeof mockData]?.dishCount || 0}</strong>
          </Typography>
          {mockData[hoveredCountry as keyof typeof mockData]?.dishes.length > 0 && (
            <Button 
              size="small" 
              variant="outlined" 
              color="primary" 
              sx={{ mt: 1, fontSize: '0.75rem' }}
              onClick={() => {
                setSelectedCountry(hoveredCountry);
                setCountryDetailsOpen(true);
              }}
            >
              View Dishes
            </Button>
          )}
        </Paper>
      )}

      <Box sx={{ 
        position: 'absolute', 
        bottom: 20, 
        left: 20, 
        zIndex: 1000, 
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(4px)',
        p: 1.5,
        borderRadius: 1,
        border: `1px solid ${theme.palette.divider}`,
      }}>
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Dishes Cooked:</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Box sx={{ width: 12, height: 12, backgroundColor: theme.palette.primary.main, borderRadius: '2px' }} />
          <Typography variant="caption">10+ dishes</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Box sx={{ width: 12, height: 12, backgroundColor: theme.palette.secondary.main, borderRadius: '2px' }} />
          <Typography variant="caption">5-9 dishes</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 12, height: 12, backgroundColor: theme.palette.secondary.light, borderRadius: '2px' }} />
          <Typography variant="caption">1-4 dishes</Typography>
        </Box>
      </Box>

      {/* Country dishes dialog */}
      {selectedCountry && (
        <Dialog
          open={countryDetailsOpen}
          onClose={handleCloseCountryDetails}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              overflow: 'hidden',
            }
          }}
        >
          <DialogTitle sx={{ 
            backgroundColor: theme.palette.primary.main, 
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 3,
            py: 2
          }}>
            <Typography variant="h5" fontWeight="bold">
              {mockData[selectedCountry as keyof typeof mockData]?.flagEmoji || ''} {getCountryName(selectedCountry)} Cuisine
            </Typography>
            <IconButton 
              edge="end" 
              color="inherit" 
              onClick={handleCloseCountryDetails} 
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Dishes I've cooked from {getCountryName(selectedCountry)}:
              </Typography>
              
              {mockData[selectedCountry as keyof typeof mockData]?.dishes.map((dish, index) => (
                <Paper 
                  key={dish.id} 
                  elevation={1} 
                  sx={{ 
                    mb: 3, 
                    overflow: 'hidden',
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Grid container>
                    <Grid item xs={12} md={4}>
                      <Box 
                        sx={{ 
                          height: '100%',
                          minHeight: 250,
                          backgroundImage: `url(${dish.imagePath})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          display: 'flex',
                          alignItems: 'flex-end',
                          p: 2
                        }}
                      >
                        <Paper sx={{ 
                          p: 1.5, 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(4px)',
                          width: '100%',
                          borderRadius: 1
                        }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {dish.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Cooked on {formatDate(dish.dateCooked)}
                          </Typography>
                        </Paper>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Box sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ 
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 10,
                            fontSize: '0.75rem',
                            fontWeight: 500
                          }}>
                            Difficulty: {dish.difficulty}
                          </Typography>
                          <Typography variant="body2" sx={{ 
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.primary.dark,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 10,
                            fontSize: '0.75rem',
                            fontWeight: 500
                          }}>
                            Rating: {dish.rating}/5
                          </Typography>
                        </Box>
                        
                        <Typography variant="body1" sx={{ mb: 2 }}>
                          {dish.description}
                        </Typography>
                        
                        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                          Key Ingredients:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                          {dish.ingredients.map((ingredient, idx) => (
                            <Typography 
                              key={idx} 
                              variant="body2" 
                              sx={{ 
                                backgroundColor: theme.palette.grey[100],
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                fontSize: '0.75rem'
                              }}
                            >
                              {ingredient}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default GlobalCookingMap; 