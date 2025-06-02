import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

// Pages
import Home from './pages/Home';
import DishDetailPage from './pages/DishDetailPage';
import DishGalleryPage from './pages/DishGalleryPage';
import CountryDetail from './pages/CountryDetail';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import RestaurantsListPage from './pages/RestaurantsListPage';
import EstablishmentGalleryPage from './pages/EstablishmentGalleryPage';
import DrinksGalleryPage from './pages/DrinksGalleryPage';
import DrinkDetailPage from './pages/DrinkDetailPage';

// Theme
import { ThemeProvider } from './themeProvider';
import { Header } from './components/Header';

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Box sx={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dishes" element={<DishGalleryPage />} />
          <Route path="/country/:countryId" element={<CountryDetail />} />
          <Route path="/dish/:dishId" element={<DishDetailPage />} />
          <Route path="/restaurant/:restaurantId" element={<RestaurantDetailPage />} />
          <Route path="/restaurants" element={<RestaurantsListPage />} />
          <Route path="/establishments" element={<EstablishmentGalleryPage />} />
          <Route path="/drinks" element={<DrinksGalleryPage />} />
          <Route path="/drink/:drinkId" element={<DrinkDetailPage />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
