import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../themeProvider';

export const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();
  const icon = mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />;

  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        sx={{
          backgroundColor: 'background.paper',
          boxShadow: 3,
          borderRadius: '50%',
          p: 1.2,
          transition: 'background 0.2s, box-shadow 0.2s',
          '&:hover': {
            backgroundColor: 'action.hover',
            boxShadow: 6,
          },
        }}
        aria-label="Toggle light/dark mode"
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}; 