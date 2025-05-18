import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { Box, Paper, Typography, useTheme, Button, Divider, Dialog, DialogContent, DialogTitle, IconButton, Grid, Rating } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import 'leaflet/dist/leaflet.css';
import { getCountriesData } from '../../data/dataService';
import { Dish, CountryData } from '../../data/types';

// Country data type with dishes
interface CountryDataWithUI extends CountryData {
  flagEmoji?: string;
}

const GlobalCookingMap = () => {
  const navigate = useNavigate();
  const [geoData, setGeoData] = useState<any>(null);
  const [countryData, setCountryData] = useState<Record<string, CountryDataWithUI>>({});
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

    // Get real data from dataService
    const data = getCountriesData();
    setCountryData(data);
  }, []);

  const getColor = (countryCode: string) => {
    const data = countryData[countryCode];
    if (!data) return '#E5E5E5'; // Light gray for countries with no data
    const count = data.dishCount;
    if (count === 0) return '#E5E5E5';
    if (count < 5) return theme.palette.secondary.light; // 1-4 dishes
    if (count < 10) return theme.palette.secondary.main; // 5-9 dishes
    return theme.palette.primary.main; // 10+ dishes
  };

  const onEachFeature = (feature: any, layer: any) => {
    const countryCode = feature.properties["ISO3166-1-Alpha-2"];
    console.log('GeoJSON country code:', countryCode, 'Data exists:', !!countryData[countryCode]);
    const data = countryData[countryCode];

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
        if (data && data.dishes.length > 0) {
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

  const handleDishClick = (dishId: string) => {
    navigate(`/dish/${dishId}`);
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
            {countryData[hoveredCountry]?.flagEmoji || ''} {getCountryName(hoveredCountry)}
          </Typography>
          <Typography variant="body2">
            Dishes cooked: <strong>{countryData[hoveredCountry]?.dishCount || 0}</strong>
          </Typography>
          {countryData[hoveredCountry]?.dishes.length > 0 && (
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
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Dishes Cooked:</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Box sx={{ width: 16, height: 16, backgroundColor: theme.palette.primary.main, borderRadius: '3px' }} />
          <Typography variant="caption" sx={{ fontWeight: 500 }}>10+ dishes</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Box sx={{ width: 16, height: 16, backgroundColor: theme.palette.secondary.main, borderRadius: '3px' }} />
          <Typography variant="caption" sx={{ fontWeight: 500 }}>5-9 dishes</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 16, height: 16, backgroundColor: theme.palette.secondary.light, borderRadius: '3px' }} />
          <Typography variant="caption" sx={{ fontWeight: 500 }}>1-4 dishes</Typography>
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
              {countryData[selectedCountry]?.flagEmoji || ''} {getCountryName(selectedCountry)} Cuisine
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
                Dishes we've cooked from {getCountryName(selectedCountry)}:
              </Typography>
              
              {countryData[selectedCountry]?.dishes.map((dish) => (
                <Paper 
                  key={dish.id} 
                  elevation={1} 
                  sx={{ 
                    mb: 3, 
                    overflow: 'hidden',
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: 3,
                    }
                  }}
                  onClick={() => handleDishClick(dish.id)}
                >
                  <Grid container>
                    <Grid item xs={12} md={4}>
                      <Box 
                        sx={{ 
                          height: '100%',
                          minHeight: 250,
                          backgroundImage: `url(${import.meta.env.BASE_URL}${dish.mainImage.startsWith('/') ? dish.mainImage.substring(1) : dish.mainImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          position: 'relative'
                        }}
                      >
                        {/* Rating overlay in top-right */}
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
                          <Rating 
                            value={dish.rating} 
                            precision={0.5} 
                            readOnly 
                            size="small"
                            sx={{ color: '#FFB400' }} 
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Box sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                          {dish.name}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                            Cooked on {formatDate(dish.dateCooked)}
                          </Typography>
                          <Typography variant="body2" sx={{ 
                            backgroundColor: 
                              dish.difficulty === 'Easy' ? theme.palette.success.light :
                              dish.difficulty === 'Medium' ? theme.palette.primary.light :
                              theme.palette.error.light,
                            color:
                              dish.difficulty === 'Easy' ? theme.palette.success.dark :
                              dish.difficulty === 'Medium' ? theme.palette.primary.dark :
                              theme.palette.error.dark,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 10,
                            fontSize: '0.75rem',
                            fontWeight: 500
                          }}>
                            {dish.difficulty}
                          </Typography>
                        </Box>
                        
                        <Typography variant="body1" sx={{ mb: 2 }}>
                          {dish.recipeDetails}
                        </Typography>
                        
                        {dish.tags && dish.tags.length > 0 && (
                          <>
                            <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                              Tags:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                              {dish.tags.map((tag, idx) => (
                                <Typography 
                                  key={idx} 
                                  variant="body2" 
                                  sx={{ 
                                    backgroundColor: theme.palette.primary.light,
                                    color: theme.palette.primary.dark,
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 10,
                                    fontSize: '0.75rem',
                                    fontWeight: 500
                                  }}
                                >
                                  {tag}
                                </Typography>
                              ))}
                            </Box>
                          </>
                        )}
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