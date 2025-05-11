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
      main: '#66CDAA', // Mint green as the main color
      light: '#B5EAD7', // Light mint
      dark: '#2E8B57', // Dark mint
    },
    secondary: {
      main: '#81BECE', // Lighter blue to match mint
      light: '#A7D8E4', // Very light blue
      dark: '#5A9CAD', // Darker but still soft blue
    },
    info: {
      main: '#A0C4FF', // Pastel blue
      light: '#BDE0FE', // Light pastel blue
      dark: '#6A8EF0', // Dark pastel blue
    },
    success: {
      main: '#9BE8A8', // Pastel green
      light: '#C7F9CC', // Light pastel green
      dark: '#6BC77C', // Dark pastel green
    },
    error: {
      main: '#FF9AA2', // Pastel red
      light: '#FFC2CD', // Light pastel red
      dark: '#E57373', // Dark pastel red
    },
    background: {
      default: '#F8F9FA',
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
      fontWeight: 700, // Bolded for more emphasis
      letterSpacing: '0.02em',
    },
    h5: {
      fontWeight: 600, // Adding weight to section headers
    },
    h6: {
      fontWeight: 600, // Adding weight to section headers
    },
    button: {
      fontWeight: 600, // Increased from 500 to 600 for more boldness
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
          fontWeight: 600, // Increased from 500 to 600
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
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600, // Making buttons bolder
        },
        containedPrimary: {
          color: '#FFFFFF', // Making text white on mint buttons
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: '#FFB400', // Gold color for rating stars
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
