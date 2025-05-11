import { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Tabs, 
  Tab, 
  Box, 
  Typography,
  Paper,
  alpha,
  CircularProgress,
  useTheme,
  Divider,
  Button,
  Grid
} from '@mui/material';
import GlobalCookingMap from '../components/maps/GlobalCookingMap';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
// Use lazy loading for the components that might have issues
const RestaurantVisitsMap = lazy(() => 
  import('../components/maps/RestaurantVisitsMap').catch(() => ({
    default: () => <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography>Restaurant Map couldn't be loaded.</Typography>
    </Box>
  }))
);
import CombinedTimeline from '../components/timeline/CombinedTimeline';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Home() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: 'background.default',
      pt: 6,
      pb: 8
    }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 5 }}>
          <Paper 
            elevation={0} 
            sx={{ 
              position: 'relative',
              overflow: 'hidden',
              py: 4,
              background: 'linear-gradient(135deg, #F8F3E7 0%, #FFFFFF 100%)',
              borderRadius: 3,
              borderTop: `4px solid ${theme.palette.secondary.main}`,
            }}
          >
            {/* Decorative elements */}
            <Box 
              sx={{ 
                position: 'absolute',
                top: 0,
                right: 0,
                width: 150,
                height: 150,
                background: alpha(theme.palette.secondary.main, 0.15),
                borderBottomLeftRadius: '100%',
              }}
            />
            <Box 
              sx={{ 
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: 100,
                height: 100,
                background: alpha(theme.palette.primary.main, 0.07),
                borderTopRightRadius: '100%',
              }}
            />
            
            <Typography 
              variant="h3" 
              component="h1" 
              align="center" 
              sx={{ 
                color: 'primary.main',
                fontWeight: 700,
                fontSize: { xs: '2.2rem', md: '3.2rem' },
                mb: 0.5,
                position: 'relative',
              }}
            >
              Gourmet and Gormand
            </Typography>
            
            {/* Korean subtitle */}
            <Typography 
              variant="subtitle1" 
              align="center" 
              className="korean-text"
              sx={{ 
                mb: 2,
                fontWeight: 500,
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: alpha(theme.palette.primary.dark, 0.8)
              }}
            >
              맛의 세상, 미식가와 먹보가 함께해요
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Divider sx={{ 
                width: '60px', 
                borderColor: theme.palette.secondary.main,
                borderWidth: 2,
                borderRadius: 1,
              }} />
            </Box>

            <Typography
              variant="subtitle1"
              align="center"
              sx={{
                color: alpha('#000000', 0.7),
                maxWidth: '650px',
                mx: 'auto',
                px: 3,
                fontSize: { xs: '1rem', md: '1.1rem' },
                mb: 3
              }}
            >
              A curated journey through global cuisines and culinary adventures
            </Typography>

            {/* Navigation buttons */}
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<RestaurantMenuIcon />}
                  onClick={() => navigate('/dishes')}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1.5,
                    fontWeight: 600
                  }}
                >
                  Browse All Dishes
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  startIcon={<MenuBookIcon />}
                  onClick={() => {
                    // When we implement a recipe page, navigate there
                    navigate('/dishes');
                  }}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1.5,
                    fontWeight: 600
                  }}
                >
                  View Recipes
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        
        <Paper 
          elevation={1} 
          sx={{ 
            borderRadius: 2, 
            overflow: 'hidden',
            backgroundColor: 'background.paper',
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 2 }}>
            <Tabs 
              value={value} 
              onChange={handleChange} 
              centered
              textColor="primary"
              indicatorColor="primary"
              sx={{ 
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0',
                },
                '& .Mui-selected': {
                  fontWeight: 600,
                }
              }}
            >
              <Tab 
                label="Global Cooking Map" 
                sx={{ 
                  py: 2.5,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    borderRadius: '8px 8px 0 0',
                  }
                }} 
              />
              <Tab 
                label="Restaurant Visits" 
                sx={{ 
                  py: 2.5,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    borderRadius: '8px 8px 0 0',
                  }
                }} 
              />
              <Tab 
                label="Timeline" 
                sx={{ 
                  py: 2.5,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    borderRadius: '8px 8px 0 0',
                  }
                }} 
              />
            </Tabs>
          </Box>

          <Box sx={{ py: 3, px: { xs: 2, md: 4 } }}>
            <TabPanel value={value} index={0}>
              <GlobalCookingMap />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Suspense fallback={
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                  <CircularProgress color="primary" />
                </Box>
              }>
                <RestaurantVisitsMap />
              </Suspense>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <CombinedTimeline />
            </TabPanel>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Home;
