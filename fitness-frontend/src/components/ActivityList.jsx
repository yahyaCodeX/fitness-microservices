import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Chip, 
  CardActionArea, 
  Skeleton, 
  Container 
} from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import StraightenIcon from '@mui/icons-material/Straighten';
import { getActivities } from '../services/api';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getActivities()
      .then(res => {
        setActivities(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3].map((n) => (
          <Grid key={n} size={{ xs: 12, sm: 6, md: 4 }}>
            <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 4, bgcolor: '#16161a' }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {activities.map((activity) => (
        <Grid key={activity.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: 4, 
              overflow: 'hidden',
              background: 'linear-gradient(145deg, #16161a 0%, #0a0a0c 100%)', // Dark gradient
              border: '1px solid rgba(0, 242, 255, 0.1)', // Subtle neon border
              transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)', 
              '&:hover': { 
                transform: 'translateY(-8px)', 
                borderColor: '#00f2ff', // Neon Cyan glow on hover
                boxShadow: '0 0 20px rgba(0, 242, 255, 0.2)', // Neon glow effect
              }
            }}
          >
            <CardActionArea 
              onClick={() => navigate(`/activities/${activity.id}`)} 
              sx={{ p: 3 }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#00f2ff', letterSpacing: 1 }}>
                  {activity.type}
                </Typography>
                <Chip 
                  label="GOAL" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(188, 254, 47, 0.1)', 
                    color: '#bcfe2f', // Neon Lime accent
                    fontWeight: 'bold', 
                    border: '1px solid #bcfe2f',
                    fontSize: '0.65rem'
                  }} 
                />
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#e2e8f0' }}>
                  <TimerIcon sx={{ fontSize: 18, color: '#00f2ff' }} />
                  <Typography variant="body2">{activity.duration} min</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#e2e8f0' }}>
                  <LocalFireDepartmentIcon sx={{ fontSize: 18, color: '#ef4444' }} />
                  <Typography variant="body2">{activity.caloriesBurned} kcal</Typography>
                </Box>

                {activity.additionalMetrics?.distance && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#e2e8f0' }}>
                    <StraightenIcon sx={{ fontSize: 18, color: '#bcfe2f' }} />
                    <Typography variant="body2">{activity.additionalMetrics.distance} km</Typography>
                  </Box>
                )}
              </Box>

              <Typography 
                variant="caption" 
                sx={{ display: 'block', mt: 2, color: 'rgba(255,255,255,0.3)', textAlign: 'right' }}
              >
                View Details →
              </Typography>
            </CardActionArea>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActivityList;