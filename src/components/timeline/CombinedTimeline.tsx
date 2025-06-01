import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, Stack as MuiStack } from '@mui/material';
import { Timeline, DataSet } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import { getTimelineEvents } from '../../data/dataService';
import { TimelineEvent as AppTimelineEvent } from '../../data/types';
import { format } from 'date-fns';
import { useTheme } from '@mui/material/styles';

const CombinedTimeline = () => {
  const navigate = useNavigate();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineInstance, setTimelineInstance] = useState<Timeline | null>(null);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  // Inject custom CSS to override vis-timeline styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    const isDarkMode = theme.palette.mode === 'dark';
    const axisTextColor = isDarkMode ? 'rgba(255, 255, 255, 0.7)' : '#666';
    const minorGridColor = isDarkMode ? 'rgba(255, 255, 255, 0.2)' : '#eaeaea';
    const majorGridColor = isDarkMode ? 'rgba(255, 255, 255, 0.3)' : '#d0d0d0';
    const timelineBackgroundColor = isDarkMode ? '#333' : '#f8f8f8';
    const itemTextColor = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'white';
    
    styleElement.textContent = `
      .vis-timeline {
        border: none !important;
        font-family: 'Poppins', sans-serif !important;
        background-color: ${timelineBackgroundColor} !important;
        border-radius: 8px !important;
        padding: 20px 0 !important;
      }

      .vis-item {
        border-radius: 12px !important;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
        border-width: 0 !important;
        padding: 0 !important;
        font-size: 12px !important;
        font-family: 'Poppins', sans-serif !important;
        color: ${itemTextColor} !important;
      }
      
      .vis-item.dish-event {
        background-color: rgba(76, 175, 80, 0.8) !important;
        border-color: #4CAF50 !important;
        color: white !important;
      }
      
      .vis-item.restaurant-event {
        background-color: rgba(33, 150, 243, 0.8) !important;
        border-color: #2196F3 !important;
        color: white !important;
      }
      
      .vis-item .vis-item-content {
        padding: 6px 10px !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }

      .vis-time-axis .vis-text {
        color: ${axisTextColor} !important;
        font-size: 11px !important;
        font-weight: 500 !important;
      }

      .vis-time-axis .vis-grid.vis-minor {
        border-color: ${minorGridColor} !important;
      }

      .vis-time-axis .vis-grid.vis-major {
        border-color: ${majorGridColor} !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      styleElement.remove();
    };
  }, [theme]);

  useEffect(() => {
    if (timelineRef.current) {
      try {
        const actualEvents = getTimelineEvents();
        if (actualEvents.length === 0) {
          setError('No timeline events found. Add some dishes or restaurant visits!');
          return;
        }

        console.log("Events data:", actualEvents);
        
        // Create simpler items that rely on direct className styling
        const items = new DataSet(
          actualEvents.map(event => ({
            id: event.id,
            content: event.content,
            start: event.start,
            className: event.type === 'dish' ? 'dish-event' : 'restaurant-event',
            title: `${event.content} - ${format(new Date(event.start), 'MMM d, yyyy')}${event.type === 'dish' && event.country ? ` - ${event.country}` : ''}${event.type === 'restaurant' && event.location ? ` - ${event.location}` : ''}`,
          }))
        );
        
        const options = {
          height: '500px',
          minHeight: '400px',
          maxHeight: '600px',
          zoomable: true,
          moveable: true,
          orientation: 'top',
          showCurrentTime: false,
          zoomKey: 'ctrlKey' as 'ctrlKey',
          stack: true,
          stackSubgroups: true,
          zoomMin: 1000 * 60 * 60 * 24 * 7, 
          zoomMax: 1000 * 60 * 60 * 24 * 365 * 5,
          margin: { item: { horizontal: 5, vertical: 8 }, axis: 20 },
          selectable: true,
          verticalScroll: true,
          horizontalScroll: true,
          tooltip: {
            followMouse: true,
            overflowMethod: 'cap' as 'cap'
          }
        };
        
        const newTimeline = new Timeline(timelineRef.current, items, options);
        setTimelineInstance(newTimeline);

        // Auto-zoom to fit all events with some padding
        try {
          // Find min and max dates from all events
          const dates = actualEvents.map(event => new Date(event.start).getTime());
          if (dates.length > 0) {
            const minDate = new Date(Math.min(...dates));
            const maxDate = new Date(Math.max(...dates));
            
            // Add 2 months padding before and after
            const startDate = new Date(minDate);
            startDate.setMonth(startDate.getMonth() - 2);
            
            const endDate = new Date(maxDate);
            endDate.setMonth(endDate.getMonth() + 2);
            
            // Set window to the range of dates with padding
            newTimeline.setWindow(startDate, endDate, { animation: true });
          }
        } catch (e) {
          console.error("Error auto-fitting timeline:", e);
          // Fallback to 2025 if auto-fit fails
          const start = new Date('2025-01-01');
          const end = new Date('2025-12-31');
          newTimeline.setWindow(start, end, { animation: true });
        }
        
        newTimeline.on('click', (properties: any) => {
          if (properties.item) {
            const clickedEvent = actualEvents.find(e => e.id === properties.item);
            if (clickedEvent && clickedEvent.itemUrl) {
              navigate(clickedEvent.itemUrl);
            }
          }
        });

        return () => {
          if (newTimeline) {
            newTimeline.destroy();
            setTimelineInstance(null);
          }
        };
      } catch (err) {
        console.error('Timeline initialization error:', err);
        setError('Failed to initialize timeline. Please try refreshing the page.');
      }
    }
  }, [navigate]);

  const handleZoomIn = () => timelineInstance?.zoomIn(0.2);
  const handleZoomOut = () => timelineInstance?.zoomOut(0.2);

  if (error) {
    return (
      <Box sx={{ width: '100%', p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6" gutterBottom sx={{mb: 0.5}}>
            Legend
          </Typography>
          <MuiStack direction="row" spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                width: 16, 
                height: 16, 
                backgroundColor: 'rgba(76, 175, 80, 0.8)', 
                borderRadius: '12px',
              }}/>
              <Typography variant="body2">Dishes Cooked</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                width: 16, 
                height: 16, 
                backgroundColor: 'rgba(33, 150, 243, 0.8)', 
                borderRadius: '12px',
              }}/>
              <Typography variant="body2">Restaurant Visits</Typography>
            </Box>
          </MuiStack>
        </Box>
        <MuiStack direction="row" spacing={1}>
          <Button variant="outlined" size="small" onClick={handleZoomOut}>Zoom Out</Button>
          <Button variant="outlined" size="small" onClick={handleZoomIn}>Zoom In</Button>
        </MuiStack>
      </Paper>
      <div ref={timelineRef} style={{ minHeight: '400px', height: '500px' }} />
    </Box>
  );
};

export default CombinedTimeline; 