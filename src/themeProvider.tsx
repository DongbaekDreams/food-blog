import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

// Create a context for theme mode
type ThemeMode = 'light' | 'dark';
interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#66CDAA' : '#4CAF50', // Mint green / Darker green
            light: mode === 'light' ? '#B5EAD7' : '#81C784', // Light mint / Light green
            dark: mode === 'light' ? '#2E8B57' : '#388E3C', // Dark mint / Dark green
          },
          secondary: {
            main: mode === 'light' ? '#81BECE' : '#64B5F6', // Blue / Light blue
            light: mode === 'light' ? '#A7D8E4' : '#90CAF9', // Light blue / Lighter blue
            dark: mode === 'light' ? '#5A9CAD' : '#42A5F5', // Dark blue / Darker blue
          },
          background: {
            default: mode === 'light' ? '#F8F9FA' : '#121212',
            paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
          },
          text: {
            primary: mode === 'light' ? '#2C3E50' : '#E0E0E0',
            secondary: mode === 'light' ? '#7F8C8D' : '#B0BEC5',
          },
        },
        typography: {
          fontFamily: '"Playfair Display", "Roboto", "Arial", sans-serif',
          h1: {
            fontWeight: 700,
            letterSpacing: '-0.01em',
          },
          h3: {
            fontWeight: 700,
            letterSpacing: '0.02em',
          },
          h5: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 600,
          },
          button: {
            fontWeight: 600,
            letterSpacing: '0.05em',
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                fontWeight: 600,
              },
              containedPrimary: {
                color: '#FFFFFF',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                boxShadow: mode === 'light' 
                  ? '0 4px 20px rgba(0, 0, 0, 0.08)'
                  : '0 4px 20px rgba(0, 0, 0, 0.2)',
              },
            },
          },
          MuiRating: {
            styleOverrides: {
              root: {
                color: '#FFB400', // Keep gold color for ratings in both modes
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 