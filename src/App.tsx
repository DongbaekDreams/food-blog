import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CookingMapPage from './pages/CookingMapPage';
import CountryPage from './pages/CountryPage';
import DishDetailPage from './pages/DishDetailPage';
import RestaurantMapPage from './pages/RestaurantMapPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import TimelinePage from './pages/TimelinePage';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const App: React.FC = () => (
  <>
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Food Blog
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/map/cooking">Cooking Map</Button>
        <Button color="inherit" component={Link} to="/map/restaurants">Restaurants</Button>
        <Button color="inherit" component={Link} to="/timeline">Timeline</Button>
      </Toolbar>
    </AppBar>
    <Container sx={{ mt: 4 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map/cooking" element={<CookingMapPage />} />
        <Route path="/map/cooking/:countryCode" element={<CountryPage />} />
        <Route path="/map/cooking/:countryCode/:dishId" element={<DishDetailPage />} />
        <Route path="/map/restaurants" element={<RestaurantMapPage />} />
        <Route path="/map/restaurants/:restaurantId" element={<RestaurantDetailPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
      </Routes>
    </Container>
  </>
);

export default App;
