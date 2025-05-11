import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Typography, Container, Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Pages
import Home from './pages/Home';
import DishDetailPage from './pages/DishDetailPage';
import DishGalleryPage from './pages/DishGalleryPage';
import CountryDetail from './pages/CountryDetail';

// Placeholder components until real ones are created
const PlaceholderPage = ({ title }: { title: string }) => (
  <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
    <Typography variant="h3" component="h1" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body1" paragraph>
      This page is under construction. Check back soon!
    </Typography>
    <Button variant="contained" color="primary" href="/">
      Return Home
    </Button>
  </Container>
);

const RestaurantDetail = () => <PlaceholderPage title="Restaurant Details" />;

const theme = createTheme({
  palette: {
    primary: {
      main: '#7A5D3C', // Rich brown for food theme
    },
    secondary: {
      main: '#D4AF37', // Gold accent color
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    button: {
      fontWeight: 500,
      letterSpacing: '0.05em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '1rem',
          textTransform: 'none',
          padding: '12px 24px',
          minWidth: 120,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dishes" element={<DishGalleryPage />} />
        <Route path="/country/:countryId" element={<CountryDetail />} />
        <Route path="/dish/:dishId" element={<DishDetailPage />} />
        <Route path="/restaurant/:restaurantId" element={<RestaurantDetail />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
