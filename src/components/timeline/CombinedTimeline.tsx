import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import { Timeline, DataSet } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';

// Temporary mock data - replace with real data later
const mockEvents = [
  {
    id: '1',
    type: 'dish',
    content: 'Homemade Pizza',
    start: '2024-03-01',
    country: 'Italy',
    rating: 4.5,
  },
  {
    id: '2',
    type: 'restaurant',
    content: 'Le Petit Bistro',
    start: '2024-02-15',
    location: 'Paris, France',
    rating: 4.8,
  },
  {
    id: '3',
    type: 'dish',
    content: 'Sushi Roll',
    start: '2024-01-20',
    country: 'Japan',
    rating: 4.2,
  },
];

const CombinedTimeline = () => {
  const navigate = useNavigate();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineInstance, setTimelineInstance] = useState<Timeline | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (timelineRef.current) {
      try {
        // Create items data set
        const items = new DataSet(
          mockEvents.map(event => ({
            id: event.id,
            content: event.content,
            start: event.start,
            className: event.type === 'dish' ? 'dish-event' : 'restaurant-event',
          }))
        );

        // Timeline options
        const options = {
          height: '400px',
          zoomable: true,
          moveable: true,
          orientation: 'top',
          showCurrentTime: false,
          zoomMin: 1000 * 60 * 60 * 24 * 7, // 1 week
          zoomMax: 1000 * 60 * 60 * 24 * 365, // 1 year
        };

        // Create new timeline instance
        const timeline = new Timeline(timelineRef.current, items, options);
        setTimelineInstance(timeline);

        // Add click handler
        timeline.on('click', (properties: any) => {
          if (properties.item) {
            const event = mockEvents.find(e => e.id === properties.item);
            if (event) {
              if (event.type === 'dish') {
                navigate(`/dish/${event.id}`);
              } else {
                navigate(`/restaurant/${event.id}`);
              }
            }
          }
        });

        // Clean up function
        return () => {
          if (timeline) {
            timeline.destroy();
          }
        };
      } catch (err) {
        console.error('Timeline initialization error:', err);
        setError('Failed to initialize timeline. Please try refreshing the page.');
      }
    }
  }, [navigate]);

  if (error) {
    return (
      <Box sx={{ width: '100%', p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Legend
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 20,
                height: 20,
                backgroundColor: '#4CAF50',
                borderRadius: 1,
              }}
            />
            <Typography variant="body2">Dishes Cooked</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 20,
                height: 20,
                backgroundColor: '#2196F3',
                borderRadius: 1,
              }}
            />
            <Typography variant="body2">Restaurant Visits</Typography>
          </Box>
        </Box>
      </Paper>

      <div ref={timelineRef} style={{ height: '400px' }} />
    </Box>
  );
};

export default CombinedTimeline; 